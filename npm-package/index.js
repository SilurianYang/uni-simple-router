import * as util from "./helpers/util.js";
import {
	methods,
	route,
	lifeCycle
} from "./helpers/config.js";

import * as lifeMothods from "./lifeCycle/hooks.js";

import H5 from "./patch/h5-patch.js";
const H5PATCH = new H5(util.isH5());

import {
	queryInfo
} from "./patch/applets-patch.js";

class Router {
	constructor(arg) {
		if (arg && arg.constructor !== Object) {
			return console.error(`Routing configuration must be an Object`);
		}
		Router.$root = this;
		this.RELOADING = false;
		this.routers = arg;
		this.methods = methods;
		this.lifeCycle = lifeCycle;
		this.lastVim = null;

		lifeMothods.registerHook(this.lifeCycle.routerbeforeHooks, function() {
			this.RELOADING = true;
		});
		lifeMothods.registerHook(this.lifeCycle.routerAfterHooks, function() {
			setTimeout(() => {
				this.RELOADING = false;
			})
		});
	}
	_pushTo({
		toRule,
		ags
	}) {
		uni[this.methods[ags.rule.NAVTYPE]]({
			url: `${toRule.url}?${toRule.query}`
		});
	}
	/**动态的导航到一个新 URL 保留浏览历史
	 * navigateTo
	 * @param {Object} rule
	 */
	push(rule) {
		lifeMothods.resolveParams(this, rule, "push", function(customRule) {
			this._pushTo(customRule);
		});
	}
	/**动态的导航到一个新 URL 关闭当前页面，跳转到的某个页面。
	 * redirectTo
	 * @param {Object} rule
	 */
	replace(rule) {
		lifeMothods.resolveParams(this, rule, "replace", function(customRule) {
			this._pushTo(customRule);
		});
	}
	/**动态的导航到一个新 URL 关闭所有页面，打开到应用内的某个页面
	 * 	reLaunch
	 * @param {Object} rule
	 */
	replaceAll(rule) {
		lifeMothods.resolveParams(this, rule, "replaceAll", function(customRule) {
			this._pushTo(customRule);
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
		H5PATCH.on('historyBack',-delta ,()=> {
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
		
		const routeInfo= queryInfo(Vim);
		
		return util.resolveRule(this, routeInfo.route,routeInfo.query);
	}
	beforeEach(fn) {
		return lifeMothods.registerHook(this.lifeCycle.beforeHooks, fn);
	}
	afterEach(fn) {
		return lifeMothods.registerHook(this.lifeCycle.afterHooks, fn);
	}
}
Router.$root = null;
Router.onLaunched = false;
Router.install = function(Vue) {
	Vue.mixin({
		onLaunch: function() {
			Router.onLaunched = true;
		},
		onLoad: function() {
			if (Router.onLaunched) {
				Router.onLaunched = false;
				
				const navtoInfo = Router.$root.getQuery(this);
				
				Router.$root.lastVim = this;
				
				lifeMothods.resolveParams(Router.$root, {
					path: navtoInfo.path,
					query: navtoInfo.query
				}, "Router", function(customRule) {
					if (customRule.ags.rule.NAVTYPE == 'Router') {
						return true;
					}
					this._pushTo(customRule);
				});
			}

		},
	})
	Object.defineProperty(Vue.prototype, "$Router", {
		get: function() {
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
