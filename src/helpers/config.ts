import {err} from './warn'
import { InstantiateConfig, LifeCycleConfig} from '../options/config'
import { vueHookNameRule, proxyDepsRule } from '../options/base';
import { parseQuery } from '../public/query';

export const mpPlatformReg = '(^mp-weixin$)|(^mp-baidu$)|(^mp-alipay$)|(^mp-toutiao$)|(^mp-qq$)|(^mp-360$)' // 小程序下不能直接导出正则 需要重新组装成正则 不然bug一推 诡异

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
        registerLoadingPage: true,
        loadingPageStyle: () => JSON.parse('{"backgroundColor":"#FFF"}'),
        loadingPageHook: (view:any) => { view.show(); },
        launchedHook: () => { plus.navigator.closeSplashscreen(); },
        animation: {}
    },
    applet: {
        animationDuration: 300
    },
    beforeProxyHooks: {
        onLoad: ([options], next, router) => {
            next([parseQuery({query: options}, router)])
        }
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

export const proxyHookDeps:proxyDepsRule = {
    resetIndex: [], // 还原时执行的生命周期的索引
    hooks: {},
    options: {}
}

export const proxyHookName:Array<vueHookNameRule> = [
    'onLaunch',
    'onShow',
    'onHide',
    'onError',
    'onInit',
    'onLoad',
    'onReady',
    'onUnload',
    'onResize',
    'created',
    'beforeMount',
    'mounted',
    'beforeDestroy',
    'destroyed'
]
