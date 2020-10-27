import {
    objectAny,
    Router,
    routesMapRule,
    RoutesRule,
    totalNextRoute
} from '../options/base';
import {
    getDataType,
    urlToJson,
    routesForMapRoute,
    getRoutePath,
    assertDeepObject
} from '../helpers/utils'
import {ERRORHOOK} from './hooks'

export function queryPageToMap(
    toRule:string|totalNextRoute,
    router:Router
) :{
    rule:string|totalNextRoute;
    route:RoutesRule,
    query:{[propName:string]:any}
} {
    let query:{[propName:string]:any} = {};
    let route:RoutesRule|string = '';
    let successCb = (toRule as totalNextRoute).success;
    let failCb = (toRule as totalNextRoute).fail;
    if (getDataType<string|totalNextRoute>(toRule) === '[object Object]') {
        const objNavRule = (toRule as totalNextRoute);
        if (objNavRule.path != null) {
            const {path, query: newQuery} = urlToJson(objNavRule.path);
            route = routesForMapRoute((router.routesMap as routesMapRule), path, ['finallyPathList', 'pathMap']);
            query = {...newQuery, ...((toRule as totalNextRoute).query || {})};
            delete (toRule as totalNextRoute).params;
        } else if (objNavRule.name != null) {
            route = (router.routesMap as routesMapRule).nameMap[objNavRule.name];
            if (route == null) {
                ERRORHOOK[0]({ type: 2, msg: `命名路由为：${objNavRule.name} 的路由，无法在路由表中找到！`, toRule}, router)
            } else {
                query = (toRule as totalNextRoute).params || {};
                delete (toRule as totalNextRoute).query;
            }
        } else {
            ERRORHOOK[0]({ type: 2, msg: `${toRule} 解析失败，请检测当前路由表下是否有包含。`, toRule}, router)
        }
    } else {
        toRule = urlToJson((toRule as string)) as totalNextRoute;
        route = routesForMapRoute((router.routesMap as routesMapRule), toRule.path, ['finallyPathList', 'pathMap'])
        query = toRule.query as objectAny;
    }
    if (router.options.platform === 'h5') {
        const {finallyPath} = getRoutePath(route as RoutesRule);
        if (finallyPath.includes(':') && (toRule as totalNextRoute).name == null) {
            ERRORHOOK[0]({ type: 2, msg: `当有设置 alias或者aliasPath 为动态路由时，不允许使用 path 跳转。请使用 name 跳转！`, route}, router)
        }
        const completeCb = (toRule as totalNextRoute).complete;
        const cacheSuccess = (toRule as totalNextRoute).success;
        const cacheFail = (toRule as totalNextRoute).fail;
        if (getDataType<Function|undefined>(completeCb) === '[object Function]') {
            const publicCb = function(this:any, args:Array<any>, callHook:Function|undefined):void {
                if (getDataType<Function|undefined>(callHook) === '[object Function]') {
                    (callHook as Function).apply(this, args);
                }
                (completeCb as Function).apply(this, args);
            }
            successCb = function(this:any, ...args:any):void{
                publicCb.call(this, args, cacheSuccess);
            };
            failCb = function(this:any, ...args:any):void{
                publicCb.call(this, args, cacheFail);
            };
        }
    } else {
        console.log('这是非h端 需要做的 TODO')
    }
    const rule = (toRule as totalNextRoute);
    if (getDataType<Function|undefined>(rule.success) === '[object Function]') {
        rule.success = successCb;
    }
    if (getDataType<Function|undefined>(rule.fail) === '[object Function]') {
        rule.fail = failCb;
    }
    return {
        rule,
        route: (route as RoutesRule),
        query
    }
}

export function resolveQuery(toRule:totalNextRoute):totalNextRoute {
    let queryKey:'params'|'query'|'' = '';
    if (toRule.params as objectAny != null) {
        queryKey = 'params';
    }
    if (toRule.query as objectAny != null) {
        queryKey = 'query';
    }
    if (queryKey === '') {
        return toRule;
    }
    const deepObj = assertDeepObject(toRule[queryKey] as objectAny);
    if (!deepObj) {
        return toRule;
    }
    const encode = encodeURIComponent(JSON.stringify(toRule[queryKey]));
    toRule[queryKey] = {
        query: encode
    }
    return toRule
}

// export function decode(str: string) {
//     try {
//         return decodeURIComponent(str)
//     } catch (err) {
//         if (process.env.NODE_ENV !== 'production') {
//             warn(false, `Error decoding "${str}". Leaving it intact.`)
//         }
//     }
//     return str
// }
