import { isH5, formatConfig, appPlatform } from './helpers/util';
import navjump from './helpers/navJump';
import { H5GetPageRoute } from './vueRouter/util';
import { APPGetPageRoute } from './appRouter/util';
import { AppletsPageRoute } from './appletsRouter/util';
import { lifeCycle, Global } from './helpers/config';
import { warn, err } from './helpers/warn';
import { registerRouterHooks, registerHook } from './lifeCycle/hooks';
import { vueMount } from './vueRouter/base';
import { appletsMount } from './patch/applets-patch';
import appMount from './patch/app-patch';
import initMixins from './helpers/mixins';
// #ifdef H5
import H5 from './patch/h5-patch';
// #endif

let H5PATCH = null;
// #ifdef H5
H5PATCH = new H5(isH5());
// #endif

Global.H5RouterReady = new Promise((resolve) => Global.RouterReadyPromise = resolve);

class Router {
    constructor(arg) {
        Router.$root = this;
        Global.Router = this; // 全局缓存一个对象，不必使用时都传递
        this.CONFIG = formatConfig(arg);
        this.lifeCycle = lifeCycle;
        registerRouterHooks.call(this);	// 注册全局Router生命钩子
        if (appPlatform() === 'H5') {
            H5PATCH.setLoadingStatus(this.CONFIG.h5);
        }
    }

    get $Route() {
        return this.getPageRoute();
    }

    /**
	 * app 获取底部tabbar拦截实例
	 */
    // eslint-disable-next-line
    get $holdTab() {
        return Global.$holdTab;
    }

    /** 动态的导航到一个新 URL 保留浏览历史
	 * navigateTo
	 * @param {Object} rule
	 */
    push(rule) {
        navjump.call(this, rule, 'push');
    }

    /** 动态的导航到一个新 URL 关闭当前页面，跳转到的某个页面。
	 * redirectTo
	 * @param {Object} rule
	 */
    replace(rule) {
        navjump.call(this, rule, 'replace');
    }

    /** 动态的导航到一个新 URL 关闭所有页面，打开到应用内的某个页面
	 * 	reLaunch
	 * @param {Object} rule
	 */
    replaceAll(rule) {
        navjump.call(this, rule, 'replaceAll');
    }

    /** 动态的导航到一个新 url 关闭所有页面，打开到应用内的某个tab
	 * @param {Object} rule
	 */
    pushTab(rule) {
        navjump.call(this, rule, 'pushTab');
    }

    /**
	 * 返回到指定层级页面上
	 */
    back(backLayer = 1, delta) {
        if (backLayer.constructor != Number) {
            return err(
                `返回层级参数必须是一个Number类型且必须大于1：${backLayer}`,
            );
        }
        navjump.call(this, { backLayer, delta, H5PATCH }, 'back', true);
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
            return H5GetPageRoute.call(this, pages, Vim);
        case 'APP':
            return APPGetPageRoute(pages, Vim);
        case 'APPLETS':
            return AppletsPageRoute(pages, Vim);
        default:
            break;
        }
    }

    beforeEach(fn) {
        return registerHook(this.lifeCycle.beforeHooks, fn);
    }

    afterEach(fn) {
        return registerHook(this.lifeCycle.afterHooks, fn);
    }
}

Router.install = function (Vue) {
    initMixins(Vue, Router);
    Object.defineProperty(Vue.prototype, '$Router', {
        get() {
            return Router.$root;
        },
    });
    Object.defineProperty(Vue.prototype, '$Route', {
        get() {
            return Router.$root.getPageRoute(this);
        },
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
        break;
    case 'H5':
        vueMount.push({ Vim, el });
        break;
    default:
        warn('糟糕！！！还有其他的执行环境？？？没听说过啊。一脸懵逼？？？加QQ群问问：769241495');
        break;
    }
};
