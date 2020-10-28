import {H5Config, InstantiateConfig} from '../options/config';
import {RoutesRule, routesMapRule, routesMapKeysRule, Router, totalNextRoute, objectAny} from '../options/base';
import {baseConfig} from '../helpers/config';
import {ERRORHOOK} from '../public/hooks'
import {warnLock} from '../helpers/warn'
import {parseQuery} from '../public/query'
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

export function getRoutePath(route: RoutesRule): {
    finallyPath: string | string[];
    aliasPath: string;
    path: string;
    alias: string | string[] | undefined;
} {
    const finallyPath = route.aliasPath || route.alias || route.path;
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

export function copyData(object:objectAny): objectAny {
    return JSON.parse(JSON.stringify(object))
}

export function getUniCachePage<T extends objectAny>(pageIndex?:number):T {
    const pages:T = getCurrentPages();
    if (pageIndex == null) {
        return pages
    }
    return pages.reverse()[pageIndex];
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
            const toRoute = routesForMapRoute(router, matTo.path, ['finallyPathMap', 'pathMap']);
            const fromRoute = routesForMapRoute(router, matFrom.path, ['finallyPathMap', 'pathMap']);
            const matToParams = copyData(matTo.params as objectAny);
            const matFromParams = copyData(matFrom.params as objectAny);

            delete matToParams.__id__;
            delete matFromParams.__id__;

            const toQuery = parseQuery({...matToParams, ...copyData(matTo.query as objectAny)}, router);
            const fromQuery = parseQuery({...matFromParams, ...copyData(matFrom.query as objectAny)}, router);
            matTo = ({
                ...toRoute,
                fullPath: matTo.fullPath,
                params: {},
                query: toQuery
            } as T);
            matFrom = ({
                ...fromRoute,
                fullPath: matFrom.fullPath,
                params: {},
                query: fromQuery
            }as T)
        }
    } else {
        matTo = copyData(matTo) as T;
        matFrom = copyData(matFrom) as T;
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
    if (router.options.platform !== 'h5') {
        return toRule;
    }
    if (!(router.options.h5 as H5Config).paramsToQuery) {
        return toRule
    }
    if (getDataType<totalNextRoute|string>(toRule) === '[object Object]') {
        const {name, params} = (toRule as totalNextRoute);
        if (name != null && params != null) {
            const route = (router.routesMap as routesMapRule).nameMap[name];
            if (route == null) {
                ERRORHOOK[0]({ type: 2, msg: `命名路由为：${name} 的路由，无法在路由表中找到！`, toRule}, router)
            }
            const {finallyPath} = getRoutePath(route);
            if (finallyPath.includes(':')) { // 动态路由无法使用 paramsToQuery
                ERRORHOOK[0]({ type: 2, msg: `动态路由：${finallyPath} 无法使用 paramsToQuery！`, toRule}, router);
            } else {
                return {
                    path: finallyPath as string,
                    query: params
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
