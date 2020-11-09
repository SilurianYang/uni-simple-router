import {appVueHookConfig, H5Config, indexVueHookConfig, InstantiateConfig} from '../options/config';
import {RoutesRule, routesMapRule, routesMapKeysRule, Router, totalNextRoute, objectAny, navErrorRule, hookObjectRule, notCallProxyHookRule, NAVTYPE} from '../options/base';
import {baseConfig, notCallProxyHook, proxyVueSortHookName} from '../helpers/config';
import {ERRORHOOK} from '../public/hooks'
import {warnLock} from '../helpers/warn'
import { createRoute } from '../public/methods';
const Regexp = require('path-to-regexp');

export function voidFun():void{}

export function mergeConfig<T extends InstantiateConfig>(baseConfig: T, userConfig: T): T {
    const config: {[key: string]: any} = Object.create(null);
    const baseConfigKeys: Array<string> = Object.keys(baseConfig).concat(['resolveQuery', 'parseQuery']);
    for (let i = 0; i < baseConfigKeys.length; i += 1) {
        const key = baseConfigKeys[i];
        if (userConfig[key] != null) {
            if (userConfig[key].constructor === Object) {
                config[key] = {
                    ...baseConfig[key],
                    ...userConfig[key]
                };
            } else if (key === 'routes') {
                config[key] = [
                    ...baseConfig[key],
                    ...userConfig[key]
                ];
            } else {
                config[key] = userConfig[key];
            }
        } else {
            config[key] = baseConfig[key];
        }
    }
    return config as T;
}

export function getRoutePath(route: RoutesRule, router:Router): {
    finallyPath: string | string[];
    aliasPath: string;
    path: string;
    alias: string | string[] | undefined;
} {
    let finallyPath = route.aliasPath || route.alias || route.path;
    if (router.options.platform !== 'h5') {
        finallyPath = route.path
    }
    return {
        finallyPath,
        aliasPath: route.aliasPath || route.path,
        path: route.path,
        alias: route.alias
    }
}

export function assertNewOptions<T extends InstantiateConfig>(
    options: T
): T | never {
    const {platform, routes} = options;
    if (platform == null) {
        throw new Error(`你在实例化路由时必须传递 'platform'`);
    }
    if (routes == null || routes.length === 0) {
        throw new Error(`你在实例化路由时必须传递 routes 为空，这是无意义的。`);
    }
    if (options.platform === 'h5') {
        if (options.h5?.vueRouterDev) {
            baseConfig.routes = [];
        }
    }
    const mergeOptions = mergeConfig<T>(baseConfig as T, options);
    return mergeOptions;
}

export function routesForMapRoute(
    router: Router,
    path: string,
    mapArrayKey:Array<routesMapKeysRule>
):RoutesRule|never {
    if (router.options.h5?.vueRouterDev) {
        return {path}
    }
    const routesMap = (router.routesMap as routesMapRule);
    for (let i = 0; i < mapArrayKey.length; i++) {
        const mapKey = mapArrayKey[i];
        const mapList = routesMap[mapKey];
        for (const [key, value] of Object.entries(mapList)) {
            const route:string|RoutesRule = value;
            let rule:string = key;
            if (getDataType<Array<string>|objectAny>(mapList) === '[object Array]') {
                rule = (route as string);
            }
            const pathRule:RegExp = Regexp(rule);
            const result = pathRule.exec(path);
            if (result != null) {
                if (getDataType<string|RoutesRule>(route) === '[object String]') {
                    return routesMap.finallyPathMap[(route as string)];
                }
                return (route as RoutesRule);
            }
        }
    }
    throw new Error(`${path} 路径无法在路由表中找到！检查跳转路径及路由表`);
}

export function getDataType<T>(data:T):string {
    return Object.prototype.toString.call(data)
}

export function copyData<T>(object:T): T {
    return JSON.parse(JSON.stringify(object))
}

export function getUniCachePage<T extends objectAny>(pageIndex?:number):T|[] {
    const pages:T = getCurrentPages();
    if (pageIndex == null) {
        return pages
    }
    if (pages.length === 0) {
        return pages;
    }
    const page = pages.reverse()[pageIndex];
    if (page == null) {
        return []
    }
    return page;
}

export function urlToJson(url :string):{
    path:string;
    query:objectAny
} {
    const query:objectAny = {};
    const [path, params] = url.split('?');
    if (params != null) {
        const parr = params.split('&');
        for (const i of parr) {
            const arr = i.split('=');
            query[arr[0]] = arr[1];
        }
    }
    return {
        path,
        query
    }
}

export function forMatNextToFrom<T extends totalNextRoute>(
    router:Router,
    to:T,
    from:T
):{
    matTo:T;
    matFrom: T;
} {
    let [matTo, matFrom] = [to, from];
    if (router.options.platform === 'h5') {
        const {vueNext, vueRouterDev} = (router.options.h5 as H5Config);
        if (!vueNext && !vueRouterDev) {
            matTo = createRoute(router, undefined, matTo) as T;
            matFrom = createRoute(router, undefined, matFrom) as T;
        }
    } else {
        matTo = createRoute(router, undefined, deepClone<T>(matTo)) as T;
        matFrom = createRoute(router, undefined, deepClone<T>(matFrom)) as T;
    }
    return {
        matTo: matTo,
        matFrom: matFrom
    }
}

export function paramsToQuery(
    router:Router,
    toRule:totalNextRoute|string
):totalNextRoute|string {
    if (router.options.platform === 'h5' && !router.options.h5?.paramsToQuery) {
        return toRule;
    }
    if (getDataType<totalNextRoute|string>(toRule) === '[object Object]') {
        const {name, params, ...moreToRule} = (toRule as totalNextRoute);
        let paramsQuery = params;
        if (router.options.platform !== 'h5' && paramsQuery == null) {
            paramsQuery = {};
        }
        if (name != null && paramsQuery != null) {
            const route = (router.routesMap as routesMapRule).nameMap[name];
            if (route == null) {
                ERRORHOOK[0]({ type: 2, msg: `命名路由为：${name} 的路由，无法在路由表中找到！`, toRule}, router)
            }
            const {finallyPath} = getRoutePath(route, router);
            if (finallyPath.includes(':')) { // 动态路由无法使用 paramsToQuery
                ERRORHOOK[0]({ type: 2, msg: `动态路由：${finallyPath} 无法使用 paramsToQuery！`, toRule}, router);
            } else {
                return {
                    ...moreToRule,
                    path: finallyPath as string,
                    query: paramsQuery
                }
            }
        }
    }
    return toRule
}

export function assertDeepObject(object:objectAny):boolean {
    let arrMark = null;
    try {
        arrMark = JSON.stringify(object).match(/\{|\[|\}|\]/g);
    } catch (error) {
        warnLock(`传递的参数解析对象失败。` + error)
    }
    if (arrMark == null) {
        return false
    }
    if (arrMark.length > 3) {
        return true;
    }
    return false
}

export function baseClone<
T extends {
    [key:string]:any
}, K extends keyof T
>(
    source:T,
    target:Array<any>|objectAny
):void {
    for (const key of Object.keys(source)) {
        const dyKey = key as T[K];
        if (source[key] === source) continue
        if (typeof source[key] === 'object') {
            target[dyKey] = getDataType<T>(source[key]) === '[object Array]' ? ([] as Array<any>) : ({} as objectAny)
            baseClone(source[key], target[dyKey])
        } else {
            target[dyKey] = source[key]
        }
    }
}

export function deepClone<T>(source:T):T {
    const __ob__ = getDataType<T>(source) === '[object Array]' ? ([] as Array<any>) : ({} as objectAny);
    baseClone(source, __ob__)
    return __ob__ as T
}

export function lockDetectWarn(
    router:Router,
    to:string|number|totalNextRoute,
    navType:NAVTYPE,
    next:Function,
    passiveType?:'beforeHooks'| 'afterHooks'
):void{
    if (passiveType === 'afterHooks') {
        next();
    } else {
        const {detectBeforeLock} = router.options;
        detectBeforeLock && detectBeforeLock(router, to, navType);
        if (router.$lockStatus) {
            (router.options.routerErrorEach as (error: navErrorRule, router:Router) => void)({
                type: 2,
                msg: '当前页面正在处于跳转状态，请稍后再进行跳转....'
            }, router);
        } else {
            next();
        }
    }
}

export function replaceHook(
    router:Router,
    vueVim:any,
    proxyHookKey:'appProxyHook'|'appletsProxyHook',
    pageType:'app'|'index'
):void{
    const vueOptions:appVueHookConfig|indexVueHookConfig = vueVim.$options;
    const proxyHook = router[proxyHookKey][(pageType as 'app')];
    if (proxyHook != null) {
        const proxyName = proxyVueSortHookName[pageType];
        for (let i = 0; i < proxyName.length; i++) {
            const name = proxyName[i];
            const originHook = vueOptions[name] as Array<Function>|undefined;
            if (getDataType<Array<Function>|undefined>(originHook) === '[object Array]') {
                const proxyInfo:hookObjectRule = {
                    options: [],
                    hook: Function
                };
                const hook = (originHook as Array<Function>).splice((originHook as Array<Function>).length - 1, 1, (...options:Array<any>) => (proxyInfo.options = options))[0]
                proxyInfo.hook = function resetHook() {
                    (originHook as Array<Function>).splice((originHook as Array<Function>).length - 1, 1, hook);
                    if (!notCallProxyHook.includes(name as notCallProxyHookRule)) {
                        hook.apply(vueVim, proxyInfo.options)
                    }
                }
                proxyHook[name] = [proxyInfo]
            }
        }
    }
}

export function restPageHook(
    router:Router
):void{
    let proxyHookKey:'appProxyHook'|'appletsProxyHook' = 'appletsProxyHook';
    if (router.options.platform === 'app-plus') {
        proxyHookKey = 'appProxyHook';
    }
    for (const [, value] of Object.entries(router[proxyHookKey])) {
        for (const [, [origin]] of Object.entries(value as objectAny)) {
            if (origin) {
                origin.hook && origin.hook();
            }
        }
    }
}
