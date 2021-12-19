import {H5Config, InstantiateConfig} from '../options/config';
import {RoutesRule, routesMapRule, routesMapKeysRule, Router, totalNextRoute, objectAny, navErrorRule, NAVTYPE, navRoute, uniBackApiRule, uniBackRule} from '../options/base';
import {baseConfig} from '../helpers/config';
import {ERRORHOOK} from '../public/hooks'
import {warnLock} from '../helpers/warn'
import { createRoute, navjump } from '../public/methods';
const Regexp = require('path-to-regexp');

export function voidFun(...args:any):void{}

export function def(
    defObject:objectAny,
    key:string,
    getValue:Function
) {
    Object.defineProperty(defObject, key, {
        get() {
            return getValue();
        }
    })
}

export function timeOut(time:number):Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, time)
    })
}

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

export function notDeepClearNull<T>(object:T):T {
    for (const key in object) {
        if (object[key] == null) {
            delete object[key];
        }
    }
    return object;
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

export function getWildcardRule(
    router:Router,
    msg?:navErrorRule
):RoutesRule|never {
    const routesMap = (router.routesMap as routesMapRule);
    const route = routesMap.finallyPathMap['*'];
    if (route) { // 有写通配符
        return route
    }
    if (msg) {
        ERRORHOOK[0](msg, router);
    }
    throw new Error(`当前路由表匹配规则已全部匹配完成，未找到满足的匹配规则。你可以使用 '*' 通配符捕捉最后的异常`);
}

export function notRouteTo404(
    router:Router,
    toRoute:RoutesRule|{
        redirect:any;
        path:string
    },
    parseToRule:totalNextRoute,
    navType:NAVTYPE
):RoutesRule|totalNextRoute|never {
    if (toRoute.path !== '*') { // 不是通配符  正常匹配成功
        return (toRoute as RoutesRule);
    }

    const redirect = toRoute.redirect;

    if (typeof redirect === 'undefined') {
        throw new Error(` *  通配符必须配合 redirect 使用。redirect: string | Location | Function`);
    }

    let newRoute = redirect;
    if (typeof newRoute === 'function') {
        newRoute = newRoute(parseToRule) as totalNextRoute;
    }
    const redirectRule = navjump(newRoute as totalNextRoute, router, navType, undefined, undefined, undefined, false);
    return (redirectRule as totalNextRoute);
}

export function routesForMapRoute(
    router: Router,
    path: string,
    mapArrayKey:Array<routesMapKeysRule>,
    deepFind:boolean|undefined = false
):RoutesRule|never {
    if (router.options.h5?.vueRouterDev) {
        return {path}
    }
    // 【Fixe】 https://github.com/SilurianYang/uni-simple-router/issues/252
    const startPath = path.split('?')[0];
    let wildcard = '';
    const routesMap = (router.routesMap as routesMapRule);
    for (let i = 0; i < mapArrayKey.length; i++) {
        const mapKey = mapArrayKey[i];
        const mapList = routesMap[mapKey];
        for (const [key, value] of Object.entries(mapList)) {
            if (key === '*') {
                if (wildcard === '') {
                    wildcard = '*'
                }
                continue;
            }
            const route:string|RoutesRule = value;
            let rule:string = key;
            if (getDataType<Array<string>|objectAny>(mapList) === '[object Array]') {
                rule = (route as string);
            }
            const pathRule:RegExp = Regexp(rule);
            const result = pathRule.exec(startPath);
            if (result != null) {
                if (getDataType<string|RoutesRule>(route) === '[object String]') {
                    return routesMap.finallyPathMap[(route as string)];
                }
                return (route as RoutesRule);
            }
        }
    }
    // 【Fixe】 https://github.com/SilurianYang/uni-simple-router/issues/302    2021-8-4 16:38:44
    if (deepFind) {
        return ({} as RoutesRule);
    }
    if (routesMap['aliasPathMap']) {
        const results = routesForMapRoute(router, path, ['aliasPathMap'], true);
        if (Object.keys(results).length > 0) {
            return results;
        }
    }
    if (wildcard !== '') {
        return getWildcardRule(router);
    }
    throw new Error(`${path} 路径无法在路由表中找到！检查跳转路径及路由表`);
}

export function getDataType<T>(data:T):string {
    return Object.prototype.toString.call(data)
}

export function copyData<T>(object:T): T {
    return JSON.parse(JSON.stringify(object))
}

export function removeSimpleValue(
    array:Array<string|number>,
    value:string
):Boolean {
    for (let i = 0; i < array.length; i++) {
        const it = array[i];
        if (it === value) {
            array.splice(i, 1);
            return true
        }
    }
    return false
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
            let route = (router.routesMap as routesMapRule).nameMap[name];
            if (route == null) {
                route = getWildcardRule(router, { type: 2, msg: `命名路由为：${name} 的路由，无法在路由表中找到！`, toRule});
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
):Array<any>|objectAny|null {
    // 【Fixe】 https://github.com/SilurianYang/uni-simple-router/issues/292
    // 小程序会将null解析为字符串 undefined 建议不要在参数中传递 null
    if (source == null) {
        target = source;
    } else {
        for (const key of Object.keys(source)) {
            const dyKey = key as T[K];
            if (source[key] === source) continue
            if (typeof source[key] === 'object') {
                target[dyKey] = getDataType<T>(source[key]) === '[object Array]' ? ([] as Array<any>) : ({} as objectAny)
                target[dyKey] = baseClone(source[key], target[dyKey])
            } else {
                target[dyKey] = source[key]
            }
        }
    }
    return target;
}

export function deepClone<T>(source:T):T {
    const __ob__ = getDataType<T>(source) === '[object Array]' ? ([] as Array<any>) : ({} as objectAny);
    baseClone(source, __ob__)
    return __ob__ as T
}

export function lockDetectWarn(
    router:Router,
    to:string|number|totalNextRoute|navRoute,
    navType:NAVTYPE,
    next:Function,
    uniActualData:uniBackApiRule|uniBackRule|undefined = {},
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
                msg: '当前页面正在处于跳转状态，请稍后再进行跳转....',
                NAVTYPE: navType,
                uniActualData
            }, router);
        } else {
            next();
        }
    }
}

export function assertParentChild(
    parentPath:string,
    vueVim:any,
):boolean {
    while (vueVim.$parent != null) {
        const mpPage = vueVim.$parent.$mp;
        if (mpPage.page && mpPage.page.is === parentPath) {
            return true;
        }
        vueVim = vueVim.$parent;
    }
    try {
        if (vueVim.$mp.page.is === parentPath || vueVim.$mp.page.route === parentPath) {
            return true
        }
    } catch (error) {
        return false
    }
    return false
}

export function resolveAbsolutePath(
    path:string,
    router:Router
):string|never {
    const reg = /^\/?([^\?\s]+)(\?.+)?$/;
    const trimPath = path.trim();
    if (!reg.test(trimPath)) {
        throw new Error(`【${path}】 路径错误，请提供完整的路径(10001)。`);
    }
    const paramsArray = trimPath.match(reg);
    if (paramsArray == null) {
        throw new Error(`【${path}】 路径错误，请提供完整的路径(10002)。`);
    }
    const query:string = paramsArray[2] || '';
    if (/^\.\/[^\.]+/.test(trimPath)) { // 当前路径下
        const navPath:string = (router as unknown as {currentRoute:{path:string}}).currentRoute.path + path;
        return navPath.replace(/[^\/]+\.\//, '');
    }
    const relative = paramsArray[1].replace(/\//g, `\\/`).replace(/\.\./g, `[^\\/]+`).replace(/\./g, '\\.');
    const relativeReg = new RegExp(`^\\/${relative}$`);
    const route = router.options.routes.filter(it => relativeReg.test(it.path));
    if (route.length !== 1) {
        throw new Error(`【${path}】 路径错误，尝试转成绝对路径失败，请手动转成绝对路径(10003)。`);
    }
    return route[0].path + query;
}

export function deepDecodeQuery(
    query:objectAny
):objectAny {
    const formatQuery:objectAny = getDataType<objectAny>(query) === '[object Array]' ? [] : {};
    const keys = Object.keys(query);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const it = query[key];
        if (typeof it === 'string') {
            try {
                let json = JSON.parse(decodeURIComponent(it));
                if (typeof json !== 'object') {
                    json = it;
                }
                formatQuery[key] = json;
            } catch (error) {
                try {
                    formatQuery[key] = decodeURIComponent(it)
                } catch (error) {
                    formatQuery[key] = it
                }
            }
        } else if (typeof it === 'object') {
            const childQuery = deepDecodeQuery(it);
            formatQuery[key] = childQuery
        } else {
            formatQuery[key] = it
        }
    }
    return formatQuery
}
