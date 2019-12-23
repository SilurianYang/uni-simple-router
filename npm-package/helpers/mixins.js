import {uniAppHook} from './config'
import {init} from '../vueRouter/init'
import {appInit,removeBackPressEvent,pageIsHeadBack} from '../appRouter/init'
import {appPlatform} from "../helpers/util";
import {getPages} from '../appRouter/util'
import {proxyIndexHook} from '../appRouter/hooks'
import {resolveParams} from "../lifeCycle/hooks";
import {completeVim} from "../patch/app-patch";


/**
 * 获取一些需要在各个平台混入的事件
 * @param {Object} Vue	当前原始VUE 对象
 * @param {Object} Router 当前原始路由对象
 * @param {Object} depPromise 一些需要集中的promise
 * @param {Object} BUILTIN  代理属性缓存上个操作的page对象
 * @param {Object} Event 自定义事件对象 
 */
const getMixins = function(Vue,Router,depPromise,BUILTIN,Event) {
	return {
		H5: {
			beforeCreate: function() {
				if (this.$options.router) {
					init(Router.$root, this.$options.router, this);
				}
			}
		},
		APP:{
			onLaunch: function() {
				appInit.call(this,Router.$root);
			},
			onLoad:function(){
				//第一个页面 拦截所有生命周期
				if(__uniConfig.appLaunchInfo.path==this.__route__&&uniAppHook.pageReady===false){		
					proxyIndexHook.call(this,Router.$root);
				}
				removeBackPressEvent(this.$mp.page,this.$options);
			},
			onBackPress:function hhyangRouterBack(){
				return pageIsHeadBack.call(Router.$root,this.$mp.page,this.$options);
			}
		},
		APPLETS:{
			onLaunch: function() {
				Router.onLaunched = depPromise[0]();
			},
			onLoad: function() {
				BUILTIN.currentVim = this;
			},
			onShow: function() {
				Event.one('show', async (res) => {
					await Router.onLaunched;
					if (!res.status) {
						if (this.constructor === Vue) {
							return false;
						}
						Router.$root.HooksFinish = false;
						if (Router.$root.lastVim == null) {
							Router.$root.lastVim = this;
						}
						Router.$root.depEvent.push(res.showId);
						const navtoInfo = Router.$root.getPageRoute(this);
			
			
						if (res.showId == 1) {
							Router.onshowed = depPromise[1]();
						}
			
						resolveParams(Router.$root, {
							path: navtoInfo.path,
							query: navtoInfo.query
						}, "Router", function(customRule) {
							return new Promise(async resolve => {
								if (customRule.ags.rule.NAVTYPE !== 'Router') {
									const result = await this._pushTo(customRule);
									resolve({
										status: result.status,
										showId: result.showId
									});
								} else {
									resolve({
										status: false,
										showId: res.showId
									});
								}
							})
						});
					} else {
						Router.depShowCount.push(res.showId)
					}
			
				})
			
				if (Router.showId > 0) {
					if (Router.doRouter) {
						Router.doRouter = false;
						Router.$root.lastVim = this;
					}
					// APP 有原生webview 层时会触发onLaunch(https://github.com/SilurianYang/uni-simple-router/issues/18)
					completeVim(this, BUILTIN);
					if (Router.$root.loadded === false && Router.$root.HooksFinish === true) {
						Event.notify('show', {
							status: false,
							showId: Router.showId
						})
					} else {
						Router.$root.loadded = false;
					}
				}
			
				Router.showId++
			
			},
		}
	}
}

const initMixins = function(Vue, Router,depPromise,BUILTIN,Event) {
	Vue.mixin({
		...getMixins(Vue,Router,depPromise,BUILTIN,Event)[appPlatform(true)],
	})
}

export default initMixins;
