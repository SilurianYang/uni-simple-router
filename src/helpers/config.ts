import {err} from './warn'
import {appletsVueHookConfig, appVueHookConfig, pageVueHookConfig, InstantiateConfig, LifeCycleConfig} from '../options/config'
import { copyData} from './utils';
import { appVueSortHookRule, pageVueSortHookRule, notCallProxyHookRule, comVueSortHookRule } from '../options/base';

export const mpPlatformReg = /(^mp-weixin$)|(^mp-baidu$)|(^mp-alipay$)|(^mp-toutiao$)|(^mp-qq$)|(^mp-360$)/g;
export const keyword = ['query'];

export const baseConfig:InstantiateConfig = {
    h5: {
        paramsToQuery: false,
        vueRouterDev: false,
        vueNext: false,
        mode: 'hash',
        base: '/',
        linkActiveClass: 'router-link-active',
        linkExactActiveClass: 'router-link-exact-active',
        scrollBehavior: (to:any, from:any, savedPostion:Function) => ({ x: 0, y: 0 }),
        fallback: true
    },
    APP: {
        loddingPageStyle: () => JSON.parse('{"backgroundColor":"#FFF"}'),
        loddingPageHook: (view:any) => { view.show(); },
        launchedHook: () => { plus.navigator.closeSplashscreen(); },
        animation: {}
    },
    platform: 'h5',
    keepUniOriginNav: false,
    debugger: false,
    routerBeforeEach: (to, from, next) => { next() },
    routerAfterEach: (to, from) => {},
    routerErrorEach: (error, router) => { router.$lockStatus = false; err(error, router, true); },
    detectBeforeLock: (router, to, navType) => {},
    routes: [
        {
            path: '/choose-location'
        },
        {
            path: '/open-location'
        },
        {
            path: '/preview-image'
        }
    ]
}

export const lifeCycle:LifeCycleConfig = {
    beforeHooks: [],
    afterHooks: [],
    routerBeforeHooks: [],
    routerAfterHooks: [],
    routerErrorHooks: []
};

export const appProxyHook:{
    app:appVueHookConfig
} = {
    app: {
        created: [],
        beforeMount: [],
        mounted: [],
        onLaunch: [],
        onShow: [],
        onHide: [],
        beforeDestroy: [],
        destroyed: []
    }
}
export const indexProxyHook:appletsVueHookConfig = {
    app: appProxyHook.app,
    page: (function(
        appHooks:appVueHookConfig
    ) :pageVueHookConfig {
        // eslint-disable-next-line no-unused-vars
        const {onLaunch, ...otherHooks} = appHooks;
        return {
            ...otherHooks,
            onLoad: [],
            onReady: [],
            onUnload: [],
            onResize: []
        };
    })(copyData<appVueHookConfig>(appProxyHook.app)),
    component: []
}

export const proxyVueSortHookName:{
    app:Array<appVueSortHookRule>,
    page:Array<pageVueSortHookRule>,
    component:Array<comVueSortHookRule>
} = {
    app: ['created', 'beforeMount', 'mounted', 'onLaunch', 'onShow', 'onHide', 'beforeDestroy', 'destroyed'],
    page: ['created', 'beforeMount', 'mounted', 'onLoad', 'onReady', 'onShow', 'onResize', 'onHide', 'beforeDestroy', 'destroyed', 'onUnload'],
    component: ['created', 'beforeMount', 'mounted', 'beforeDestroy', 'destroyed']
}
export const notCallProxyHook:Array<notCallProxyHookRule> = [
    'onHide', 'beforeDestroy', 'destroyed', 'destroyed', 'onUnload', 'onResize'
];
