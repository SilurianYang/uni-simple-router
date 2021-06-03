import {
    uniNavApiRule,
    reNavMethodRule,
    reNotNavMethodRule,
    Router,
    rewriteMethodToggle,
    uniBackRule,
    uniBackApiRule,
    navtoRule,
    totalNextRoute,
    originMixins,
    objectAny
} from '../options/base'

import {
    routesForMapRoute,
    getRoutePath,
    getDataType,
    notDeepClearNull,
    resolveAbsolutePath,
    getUniCachePage,
    timeOut
} from '../helpers/utils'

import {
    warn
} from '../helpers/warn'

import {uniOriginJump} from './uniOrigin'

const rewrite: Array<reNavMethodRule|reNotNavMethodRule> = [
    'navigateTo',
    'redirectTo',
    'reLaunch',
    'switchTab',
    'navigateBack'
];

export function rewriteMethod(
    router:Router
): void {
    if (router.options.keepUniOriginNav === false) {
        rewrite.forEach(name => {
            const oldMethod: Function = uni[name];
            uni[name] = function(
                params:originMixins|{from:string}|navtoRule,
                originCall:boolean = false,
                callOkCb?:Function,
                forceNav?:boolean
            ):void {
                if (originCall) {
                    uniOriginJump(router, oldMethod, name, params as originMixins, callOkCb, forceNav)
                } else {
                    if (router.options.platform === 'app-plus') {
                        if (Object.keys(router.appMain).length === 0) {
                            router.appMain = {
                                NAVTYPE: name,
                                path: (params as uniNavApiRule).url
                            }
                        }
                    }
                    callRouterMethod(params as uniNavApiRule, name, router);
                }
            };
        })
    }
}
function callRouterMethod(
    option: uniNavApiRule|uniBackRule|uniBackApiRule,
    funName:reNavMethodRule|reNotNavMethodRule,
    router:Router
): void {
    if (router.options.platform === 'app-plus') {
        let openType = null;
        if (option) {
            openType = (option as uniNavApiRule).openType;
        }
        if (openType != null && openType === 'appLaunch') {
            funName = 'reLaunch'
        }
    }
    if (funName === 'reLaunch' && JSON.stringify(option) === '{"url":"/"}') {
        warn(
            `uni-app 原生方法：reLaunch({url:'/'}) 默认被重写啦！你可以使用 this.$Router.replaceAll() 或者 uni.reLaunch({url:'/?xxx=xxx'})`,
            router,
            true
        );
        funName = 'navigateBack';
        option = {
            from: 'backbutton'
        }
    }
    if (funName === 'navigateBack') {
        let level:number = 1;
        if (option == null) {
            option = {delta: 1};
        }
        if (getDataType<number|undefined>((option as uniBackApiRule).delta) === '[object Number]') {
            level = ((option as uniBackApiRule).delta as number);
        }
        router.back(level, (option as uniBackRule|uniBackApiRule));
    } else {
        const routerMethodName = rewriteMethodToggle[(funName as reNavMethodRule)]
        let path = (option as uniNavApiRule).url;
        if (!path.startsWith('/')) {
            const absolutePath = resolveAbsolutePath(path, router);
            path = absolutePath;
            (option as uniNavApiRule).url = absolutePath;
        }
        if (funName === 'switchTab') {
            const route = routesForMapRoute(router, path, ['pathMap', 'finallyPathList'])
            const {finallyPath} = getRoutePath(route, router);
            if (getDataType<string | string[]>(finallyPath) === '[object Array]') {
                warn(
                    `uni-app 原生方法跳转路径为：${path}。此路为是tab页面时，不允许设置 alias 为数组的情况，并且不能为动态路由！当然你可以通过通配符*解决！`,
                    router,
                    true
                );
            }
            if ((finallyPath as string) === '*') {
                warn(
                    `uni-app 原生方法跳转路径为：${path}。在路由表中找不到相关路由表！当然你可以通过通配符*解决！`,
                    router,
                    true
                );
            }
            // Fixe h5 端无法触发 onTabItemTap hook  2021年6月3日17:26:47
            if (router.options.platform === 'h5') {
                const {success: userSuccess} = option as uniNavApiRule;
                (option as uniNavApiRule).success = (...args:Array<any>) => {
                    userSuccess?.apply(null, args);
                    timeOut(150).then(() => {
                        const cbArgs = (option as uniNavApiRule).detail || {};
                        if (Object.keys(cbArgs).length > 0 && Reflect.has(cbArgs, 'index')) {
                            const cachePage = getUniCachePage(0);
                            if (Object.keys(cachePage).length === 0) {
                                return false
                            }
                            const page = cachePage as objectAny;
                            const hooks = page.$options.onTabItemTap;
                            if (hooks) {
                                for (let j = 0; j < hooks.length; j++) {
                                    hooks[j].call(page, cbArgs)
                                }
                            }
                        }
                    });
                }
            }
            path = (finallyPath as string);
        }
        const {events, success, fail, complete, animationType, animationDuration} = option as uniNavApiRule;
        const jumpOptions:totalNextRoute = {path, events, success, fail, complete, animationDuration, animationType};
        router[routerMethodName](
            notDeepClearNull<totalNextRoute>(jumpOptions)
        )
    }
}
