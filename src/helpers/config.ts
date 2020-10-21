import {plus} from '../types';
import {err} from './warn'
import {InstantiateConfig, LifeCycleConfig} from '../options/config'

export const baseConfig:InstantiateConfig = {
    platform: 'h5',
    h5: {
        aliasCoverPath: false,
        rewriteFun: true,
        paramsToQuery: false,
        loading: true,
        vueRouterDev: false,
        useUniConfig: true,
        keepUniIntercept: false,
        vueNext: false,
        replaceStyle: false,
        resetStyle: () => JSON.parse('{}'),
        mode: 'hash',
        base: '/',
        linkActiveClass: 'router-link-active',
        linkExactActiveClass: 'router-link-exact-active',
        scrollBehavior: (to:any, from:any, savedPostion:Function) => savedPostion,
        fallback: true
    },
    APP: {
        holdTabbar: true,
        loddingPageStyle: () => JSON.parse('{"backgroundColor":"#FFF"}'),
        loddingPageHook: (view:any) => { plus.navigator.closeSplashscreen(); view.show(); },
        animation: { animationType: 'pop-in', animationDuration: 300 }
    },
    debugger: false,
    encodeURI: true,
    routerBeforeEach: (to, from, next) => { next() },
    routerAfterEach: (to, from) => {},
    routerErrorEach: (error, router) => { err(JSON.stringify(error), router, true) },
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
