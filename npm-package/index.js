import {
	isH5,
	formatConfig,
	queryMp,
	resolveRule,
	appPlatform,
	formatURLQuery,
	parseQuery
} from "./helpers/util.js";
import {
	getRouterNextInfo,
	formatUserRule,
	strPathToObjPath
} from './vueRouter/util.js'
import * as compile from './helpers/compile.js'
import {
	methods,
	lifeCycle,
	Global
} from "./helpers/config.js";

import {
	warn, err
} from './helpers/warn.js'

import * as lifeMothods from "./lifeCycle/hooks.js";
import {
	vueMount
} from './vueRouter/base.js'

import event from './helpers/event.js'
const Event = new event();

import {
	queryInfo,
	appletsMount,
} from "./patch/applets-patch.js";

import {
	completeVim,
	appMount
} from "./patch/app-patch.js";

// #ifdef H5
import H5 from "./patch/h5-patch.js";
const H5PATCH = new H5(isH5());
// #endif


Global.H5RouterReady=new Promise(resolve=>Global.RouterReadyPromise=resolve);	

class Router {
	constructor(arg) {
		Router.$root = this;
		Global.Router = this; //全局缓存一个对象，不必使用时都传递
		this.CONFIG = formatConfig(arg);
		this.loadded = false;
		this.methods = methods;
		this.lifeCycle = lifeCycle;
		this.lastVim = null;
		this.HooksFinish = true; //内部生命周期是否走完
		this.depEvent = [];

		if(appPlatform()==='H5'){
			H5PATCH.setLoadingStatus(this.CONFIG.h5)
		}
		
		lifeMothods.registerHook(this.lifeCycle.routerbeforeHooks, function (fnType) {
			return new Promise(async resolve => {
				this.CONFIG.routerBeforeEach();	//触发暴露给开发者的生命钩子
				if(appPlatform()==='H5'){
					H5PATCH.on('toogle', 'startLodding');
					return resolve(true);
				}
				await Router.onLaunched;
				await Router.onshowed;
				if (fnType !== 'Router' && Reflect.get(this.lastVim, '_uid') == null) { //验证当前是开发者直接通过api进行跳转的情况，比如vue还没有编译模板完成的情况
					return resolve(false)
				}
				return resolve(true);
			})
		});
		lifeMothods.registerHook(this.lifeCycle.routerAfterHooks, function (res) {
			this.CONFIG.routerAfterEach();	//触发暴露给开发者的生命钩子
			if(appPlatform()==='H5'){
				H5PATCH.on('toogle', 'stopLodding');
				return false;
			}
			const index = this.depEvent.indexOf(res.showId);
			if (index == -1 && !isH5) {
				Event.notify('show', res);
			} else {
				this.depEvent.splice(index, 1)
			}
			this.lastVim = BUILTIN.currentVim;
			this.HooksFinish = true;
		});
	}
	/**
	 * 用户非h5端外 核心跳转方法
	 * @param {customRule} param 最终格式化后的跳转路径
	 */
	_pushTo({
		toRule,
		ags
	}) {
		return new Promise(resolve => {
			//这里是为兼容APP,非APP端是在切换动画完成后响应(https://github.com/SilurianYang/uni-simple-router/issues/16)
			compile.APP(() => {
				this.loadded = true;
			})
			const URLQuery = formatURLQuery(`?${toRule.query}`);
			let url = `${toRule.url}${URLQuery}`;
			uni[this.methods[ags.rule.NAVTYPE]]({
				url,
				complete: () => {
					this.loadded = true;
					resolve({
						status: true,
						showId: Router.showId,
						complete: true
					});
				}
			});
		})
	}
	/**
	 * @param {Object} replace vue-router的跳转方式
	 * @param {Object} rule	需要跳转到的路由匹配规则
	 * @param {Object} type	对应的官方跳转模式
	 */
	_H5PushTo(replace,rule,type){
		if(this.$route==null){
			return err(`h5端路由为就绪，请检查调用代码`);
		}
		rule=formatUserRule(rule,this.selfRoutes,this.CONFIG);
		const objPath=strPathToObjPath(rule);
		objPath.type=type
		this.$route[replace](objPath);
	}
	/**动态的导航到一个新 URL 保留浏览历史
	 * navigateTo
	 * @param {Object} rule
	 */
	push(rule) {
		if(appPlatform() === 'H5'){
			return this._H5PushTo('push',rule,'navigateTo');
		}
		lifeMothods.resolveParams(this, rule, "push", function (customRule) {
			return new Promise(async resolve => {
				resolve(await this._pushTo(customRule));
			})
		});
	}
	/**动态的导航到一个新 URL 关闭当前页面，跳转到的某个页面。
	 * redirectTo
	 * @param {Object} rule
	 */
	replace(rule) {
		if(appPlatform() === 'H5'){
			return this._H5PushTo('replace',rule,'redirectTo');
		}
		lifeMothods.resolveParams(this, rule, "replace", function (customRule) {
			return new Promise(async resolve => {
				resolve(await this._pushTo(customRule));
			})
		});
	}
	/**动态的导航到一个新 URL 关闭所有页面，打开到应用内的某个页面
	 * 	reLaunch
	 * @param {Object} rule
	 */
	replaceAll(rule) {
		if(appPlatform() === 'H5'){
			return this._H5PushTo('replace',rule,'reLaunch');
		}
		lifeMothods.resolveParams(this, rule, "replaceAll", function (customRule) {
			return new Promise(async resolve => {
				resolve(await this._pushTo(customRule));
			})
		});
	}
	/**动态的导航到一个新 url 关闭所有页面，打开到应用内的某个tab
	 * @param {Object} rule
	 */
	pushTab(rule) {
		if(appPlatform() === 'H5'){
			return this._H5PushTo('replace',rule,'switchTab');
		}
		lifeMothods.resolveParams(this, rule, "pushTab", function (customRule) {
			return new Promise(async resolve => {
				resolve(await this._pushTo(customRule));
			})
		});
	}
	/**
	 * 返回到指定层级页面上
	 */
	back(delta = 1) {
		if (delta.constructor != Number) {
			return err(
				"返回层级参数必须是一个Number类型且必须大于1：" + delta
			);
		}
		compile.H5(() => {
			H5PATCH.on('historyBack', -delta)
		})
		compile.notH5(()=>{
			uni.navigateBack({
				delta
			});
		})
	}
	// TODO 目前来不及做啊 有很多事情 版本也很久没更新了
	// async addRoutes(routes){
	// 	if(appPlatform() === 'H5'){
	// 		await Global.H5RouterReady;
	// 		this.CONFIG.routes=this.CONFIG.routes.concat(routes);
	// 		const formatRts= fromatRoutes(routes, true, this.CONFIG.h5);
	// 		this.selfRoutes={...this.selfRoutes||{},...formatRts};
	// 		const Routes= diffRouter(this,Global.vueRouter , this.CONFIG.h5.useUniConfig,Object.values(formatRts));
	// 		console.log(Routes)
	// 		await timeout(20);
	// 		Global.vueRouter.addRoutes(Routes);
	// 	}else{
	// 		warn(`非H5端没有此api ‘addRoutes’ `)
	// 	}
	// }
	/**
	 * @param {Object} Vim
	 * 
	 */
	getQuery(Vim) {
		if (appPlatform() === 'H5') {
			const pages = getCurrentPages();
			if (pages.length > 0) {
				const currentRoute = pages[pages.length - 1].$route;
				return getRouterNextInfo(currentRoute, currentRoute, this).toRoute;
			} else if (Vim && Vim.$route) {
				return getRouterNextInfo(Vim.$route, Vim.$route, this).toRoute;
			} else {
				return {};
			}
		} else {
			Vim = queryMp(Vim);
			const {
				route,
				query,
				ruleKey
			} = queryInfo(Vim);
			return resolveRule(this, route, query, ruleKey);
		}
	}
	beforeEach(fn) {
		return lifeMothods.registerHook(this.lifeCycle.beforeHooks, fn);
	}
	afterEach(fn) {
		return lifeMothods.registerHook(this.lifeCycle.afterHooks, fn);
	}
}

const BUILTIN = {}; //代理属性缓存上个操作的page对象
const depPromise = [];

Router.$root = null;
Router.onLaunched = new Promise((resolve) => {
	depPromise.push(resolve)
});
Router.onshowed = new Promise((resolve) => {
	depPromise.push(resolve)
});
Router.showId = 0;
Router.lastVim = {};
Router.depShowCount = [0];
Router.doRouter = false; //用户主动触发router事件

Object.defineProperty(BUILTIN, 'currentVim', {
	configurable: true,
	enumerable: false,
	set: function (val) {
		BUILTIN._currentVim = val;
		if (Router.showId === Router.depShowCount[Router.depShowCount.length - 1]) {
			Router.$root.lastVim = val;
			Router.depShowCount.pop();
		}
	},
	get: function () {
		return BUILTIN._currentVim;
	},

})

Router.install = function (Vue) {
	Vue.mixin({
		onLaunch: function () {
			Router.onLaunched = depPromise[0]();
		},
		onLoad: function () {
			BUILTIN.currentVim = this;
		},
		// #ifdef H5
		beforeCreate: function () {
			if (this.$options.router) {
				H5PATCH.registerHook(Router.$root, this.$options.router, this);
				Router.onshowed = depPromise[1]();
			}
		},
		// #endif

		// #ifndef H5
		onShow: function () {
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
					const navtoInfo = Router.$root.getQuery(this);


					if (res.showId == 1) {
						Router.onshowed = depPromise[1]();
					}

					lifeMothods.resolveParams(Router.$root, {
						path: navtoInfo.path,
						query: navtoInfo.query
					}, "Router", function (customRule) {
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
		// #endif
	})
	Object.defineProperty(Vue.prototype, "$Router", {
		get: function () {
			Router.doRouter = this;
			Router.$root.lastVim = this;
			return Router.$root;
		}
	});
	Object.defineProperty(Vue.prototype, "$Route", {
		get: function () {
			return Router.$root.getQuery(this);
		}
	});
};
export default Router;
/**
 * 
 * @param {VueComponent } Vim vue实例对象
 * @param {dom} el	dom节点选择器 
 */
export const RouterMount = function (Vim, el) {
	switch (appPlatform(true)) {
		case 'APP':
			appMount(Vim, el);
			break;
		case 'APPLETS':
			appletsMount(Vim, el);
			break
		case 'H5':
			vueMount.push({
				Vim,
				el
			})
			break
		default:
			warn(`糟糕！！！还有其他的执行环境？？？没听说过啊。一脸懵逼？？？加QQ群问问：769241495`)
			break;
	}
}