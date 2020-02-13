import {isH5,formatConfig,appPlatform,formatURLQuery} from "./helpers/util";
import {formatUserRule,strPathToObjPath,H5GetPageRoute} from './vueRouter/util'
import {APPGetPageRoute} from './appRouter/util'
import {AppletsPageRoute} from './appletsRouter/util'
import * as compile from './helpers/compile'
import {methods,lifeCycle,Global} from "./helpers/config";
import {warn,err} from './helpers/warn'
import * as lifeMothods from "./lifeCycle/hooks";
import {transitionTo} from './appRouter/hooks'
import {uniPushTo} from './appRouter/uniNav'
import {vueMount} from './vueRouter/base'
import {appletsMount} from "./patch/applets-patch";
import {appMount} from "./patch/app-patch";
import initMixins from './helpers/mixins'

// #ifdef H5
import H5 from "./patch/h5-patch";
const H5PATCH = new H5(isH5());
// #endif


Global.H5RouterReady = new Promise(resolve => Global.RouterReadyPromise = resolve);

class Router {
	constructor(arg) {
		Router.$root = this;
		Global.Router = this; //全局缓存一个对象，不必使用时都传递
		this.CONFIG = formatConfig(arg);
		this.loadded = false;
		this.methods = methods;
		this.lifeCycle = lifeCycle;
		this.registerRouterHooks();
		if (appPlatform() === 'H5') {
			H5PATCH.setLoadingStatus(this.CONFIG.h5)
		}
	}
	get $Route(){
		return this.getPageRoute();
	}
	/**
	 * app 获取底部tabbar拦截实例
	 */
	get $holdTab(){
		return Global.$holdTab;
	}
	/**
	 * 注册全局Router生命钩子
	 */
	registerRouterHooks(){
		lifeMothods.registerHook(this.lifeCycle.routerbeforeHooks, function(fnType) {
			return new Promise(async resolve => {
				this.CONFIG.routerBeforeEach(); //触发暴露给开发者的生命钩子
				if(appPlatform(true)==='H5'){
					H5PATCH.on('toogle', 'startLodding');
				}
				return resolve(true);
			})
		});
		lifeMothods.registerHook(this.lifeCycle.routerAfterHooks, function(res = {}) {
			if (res.H5Intercept !== true) {
				this.CONFIG.routerAfterEach(); //触发暴露给开发者的生命钩子
			}
			if(appPlatform(true)==='H5'){
				H5PATCH.on('toogle', 'stopLodding');
			}
			return true;
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
	_H5PushTo(replace, rule, type) {
		if (this.$route == null) {
			return err(`h5端路由为就绪，请检查调用代码`);
		}
		rule = formatUserRule(rule, this.selfRoutes, this.CONFIG);
		const objPath = strPathToObjPath(rule);
		objPath.type = type
		this.$route[replace](objPath);
	}
	/**动态的导航到一个新 URL 保留浏览历史
	 * navigateTo
	 * @param {Object} rule
	 */
	push(rule) {
		if (appPlatform() === 'H5') {
			return this._H5PushTo('push', rule, 'navigateTo');
		}
		if(appPlatform() === 'APP'){
			return transitionTo.call(this,rule,'push', uniPushTo);
		}
	}
	/**动态的导航到一个新 URL 关闭当前页面，跳转到的某个页面。
	 * redirectTo
	 * @param {Object} rule
	 */
	replace(rule) {
		if (appPlatform() === 'H5') {
			return this._H5PushTo('replace', rule, 'redirectTo');
		}
		if(appPlatform() === 'APP'){
			return transitionTo.call(this,rule,'replace', uniPushTo);
		}
	}
	/**动态的导航到一个新 URL 关闭所有页面，打开到应用内的某个页面
	 * 	reLaunch
	 * @param {Object} rule
	 */
	replaceAll(rule) {
		if (appPlatform() === 'H5') {
			return this._H5PushTo('replace', rule, 'reLaunch');
		}
		if(appPlatform() === 'APP'){
			return transitionTo.call(this,rule,'replaceAll', uniPushTo);
		}
	}
	/**动态的导航到一个新 url 关闭所有页面，打开到应用内的某个tab
	 * @param {Object} rule
	 */
	pushTab(rule) {
		if (appPlatform() === 'H5') {
			return this._H5PushTo('replace', rule, 'switchTab');
		}
		if(appPlatform() === 'APP'){
			return transitionTo.call(this,rule,'pushTab', uniPushTo);
		}
	}
	/**
	 * 返回到指定层级页面上
	 */
	back(backLayer=1,delta) {
		if (backLayer.constructor != Number) {
			return err(
				"返回层级参数必须是一个Number类型且必须大于1：" + backLayer
			);
		}
		compile.H5(() => {
			H5PATCH.on('historyBack', {
				backLayer,
				delta
			})
		})
		compile.notH5(() => {
			Global.backLayerC=backLayer;	//告诉路由需要返回几层
			uni.navigateBack({
				delta:backLayer
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
	 * 获取当前页面下的 Route 信息
	 * 
	 * @param {Object} Vim 当前开发者可以传递一个 vue 组件对象 来获取当前下的 Route 信息
	 */
	getPageRoute(Vim) {
		const pages = getCurrentPages();
		switch (appPlatform(true)) {
			case 'H5':
				return H5GetPageRoute.call(this,pages,Vim);
			case 'APP':
				return APPGetPageRoute(pages,Vim);
			case 'APPLETS':
				return AppletsPageRoute(pages,Vim)
		}
	}
	beforeEach(fn) {
		return lifeMothods.registerHook(this.lifeCycle.beforeHooks, fn);
	}
	afterEach(fn) {
		return lifeMothods.registerHook(this.lifeCycle.afterHooks, fn);
	}
}

Router.install = function(Vue) {
	initMixins(Vue,Router);
	Object.defineProperty(Vue.prototype, "$Router", {
		get: function() {
			return Router.$root;
		}
	});
	Object.defineProperty(Vue.prototype, "$Route", {
		get: function() {
			return Router.$root.getPageRoute(this);
		}
	});
};
export default Router;
/**
 * 
 * @param {VueComponent } Vim vue实例对象
 * @param {dom} el	dom节点选择器 
 */
export const RouterMount = function(Vim, el) {
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
