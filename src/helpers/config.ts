import {err} from './warn'
import {appVueHookConfig, InstantiateConfig, LifeCycleConfig} from '../options/config'

export const mpPlatformReg = /(^mp-weixin$)|(^mp-baidu$)|(^mp-alipay$)|(^mp-toutiao$)|(^mp-qq$)|(^mp-360$)/g;

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
        animation: { animationType: 'pop-in', animationDuration: 300 }
    },
    platform: 'h5',
    keepUniOriginNav: false,
    debugger: false,
    routerBeforeEach: (to, from, next) => { next() },
    routerAfterEach: (to, from) => {},
    routerErrorEach: (error, router) => { err(error, router, true) },
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

export const appProxyHook:appVueHookConfig = {
    onLaunch: [],
    onShow: [],
    onHide: []
}
