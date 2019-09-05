import * as util from "./helpers/util.js";
import {
	methods,
	route,
	lifeCycle
} from "./helpers/config.js";

import * as lifeMothods from "./lifeCycle/hooks.js";

import event from './helpers/event.js'
const Event = new event();

import H5 from "./patch/h5-patch.js";
const H5PATCH = new H5(util.isH5());

import {
	queryInfo
} from "./patch/applets-patch.js";

import {completeVim} from "./patch/app-patch.js"; 

class Router {
	constructor(arg) {
		if (arg && arg.constructor !== Object) {
			return console.error(`Routing configuration must be an Object`);
		}
		Router.$root = this;
		this.loadded = false;
		this.routers = arg;
		this.methods = methods;
		this.lifeCycle = lifeCycle;
		this.lastVim = null;
		this.HooksFinish = true; //内部生命周期是否走完
		this.depEvent = [];

		H5PATCH.setLoadingStatus(arg.loading)

		lifeMothods.registerHook(this.lifeCycle.routerbeforeHooks,  function(fnType) {
			return new Promise(async resolve => {
				await Router.onLaunched;
				await Router.onshowed;
				if (fnType !== 'Router' && Reflect.get(this.lastVim, '_uid') == null) { //验证当前是开发者直接通过api进行跳转的情况，比如vue还没有编译模板完成的情况
					return resolve(false)
				}
				H5PATCH.on('toogle', 'startLodding');
				return resolve(true);
			})
		});
		lifeMothods.registerHook(this.lifeCycle.routerAfterHooks, async function(customRule, res) {
			H5PATCH.on('toogle', 'stopLodding')
			const index = this.depEvent.indexOf(res.showId);
			if (index == -1) {
				Event.notify('show', res);
			} else {
				this.depEvent.splice(index, 1)
			}
			this.lastVim = BUILTIN.currentVim;
			this.HooksFinish = true;
		});
	}
	_pushTo({
		toRule,
		ags
	}) {
		return new Promise(resolve => {
			//这里是为兼容APP,非APP端是在切换动画完成后响应(https://github.com/SilurianYang/uni-simple-router/issues/16)
			
			// #ifdef APP-PLUS
			this.loadded = true;
			// #endif
			
			let url = `${toRule.url}?${toRule.query}`;
			if (toRule.query === 'query={}') {
				url = toRule.url;
			}
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
	/**动态的导航到一个新 URL 保留浏览历史
	 * navigateTo
	 * @param {Object} rule
	 */
	push(rule) {
		lifeMothods.resolveParams(this, rule, "push", function(customRule) {
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
		lifeMothods.resolveParams(this, rule, "replace", function(customRule) {
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
		lifeMothods.resolveParams(this, rule, "replaceAll", function(customRule) {
			return new Promise(async resolve => {
				resolve(await this._pushTo(customRule));
			})
		});
	}
	/**动态的导航到一个新 url 关闭所有页面，打开到应用内的某个tab
	 * @param {Object} rule
	 */
	pushTab(rule) {
		this.replaceAll(rule);
	}
	/**
	 * 返回到指定层级页面上
	 */
	back(delta = 1) {
		if (delta.constructor != Number) {
			return console.error(
				"返回层级参数必须是一个Number类型且必须大于1：" + delta
			);
		}
		H5PATCH.on('historyBack', -delta, () => {
			uni.navigateBack({
				delta
			});
		})
	}
	/**
	 * 
	 * @param {Object} Vim
	 */
	getQuery(Vim) {
		Vim = util.queryMp(Vim);

		const routeInfo = queryInfo(Vim);

		return util.resolveRule(this, routeInfo.route, routeInfo.query);
	}
	beforeEach(fn) {
		return lifeMothods.registerHook(this.lifeCycle.beforeHooks, fn);
	}
	afterEach(fn) {
		return lifeMothods.registerHook(this.lifeCycle.afterHooks, fn);
	}
}

const BUILTIN = {}; //代理属性缓存上个操作的page对象
const depPromise=[];	

Router.$root = null;
Router.onLaunched = new Promise((resolve) => {depPromise.push(resolve)});
Router.onshowed = new Promise((resolve) => {depPromise.push(resolve)});
Router.showId = 0;
Router.lastVim = {};
Router.depShowCount = [0];
Router.doRouter = false; //用户主动触发router事件

Object.defineProperty(BUILTIN, 'currentVim', {
	configurable: true,
	enumerable: false,
	set: function(val) {
		BUILTIN._currentVim = val;
		if (Router.showId === Router.depShowCount[Router.depShowCount.length - 1]) {
			Router.$root.lastVim = val;
			Router.depShowCount.pop();
		}
	},
	get: function() {
		return BUILTIN._currentVim;
	},

})

Router.install = function(Vue) {
	Vue.mixin({
		onLaunch: function() {
			Router.onLaunched = depPromise[0]();
		},
		onLoad: function() {
			BUILTIN.currentVim = this;
		},
		onShow: function() {
			// #ifdef H5
			if (H5PATCH.previewImagePatch(this)) {
				return true;
			}
			// #endif

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
						Router.onshowed =depPromise[1]();
					}

					lifeMothods.resolveParams(Router.$root, {
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
				completeVim(this,BUILTIN);
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
	})
	Object.defineProperty(Vue.prototype, "$Router", {
		get: function() {
			Router.doRouter = this;
			Router.$root.lastVim = this;
			return Router.$root;
		}
	});
	Object.defineProperty(Vue.prototype, "$Route", {
		get: function() {
			return Router.$root.getQuery(this);
		}
	});
};

export default Router;
