import {plus} from '../types';
import {InstantiateConfig} from '../options/config'

export const baseConfig:InstantiateConfig = {
    platform: '',
    h5: {
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
    routerBeforeEach: () => {},
    routerAfterEach: () => {},
    routerErrorEach: () => {},
    routes: []
}
