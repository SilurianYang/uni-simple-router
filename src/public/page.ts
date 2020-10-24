import { Router, routesMapRule, RoutesRule, totalNextRoute } from '../options/base';
import {getDataType, urlToJson, routesForMapRoute} from '../helpers/utils'
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
            route = routesForMapRoute((router.routesMap as routesMapRule), path, 'finallyPathList')
            query = {...newQuery, ...((toRule as totalNextRoute).query || {})};
        } else if (objNavRule.name != null) {
            route = (router.routesMap as routesMapRule).nameMap[objNavRule.name];
            if (route == null) {
                ERRORHOOK[0]({ type: 2, msg: `命名路由为：${objNavRule.name} 的路由，无法在路由表中找到！`, toRule}, router)
            } else {
                query = (toRule as totalNextRoute).params || {};
            }
        } else {
            ERRORHOOK[0]({ type: 2, msg: `${toRule} 解析失败，请检测当前路由表下是否有包含。`, toRule}, router)
        }
    } else {
        const {path, query: newQuery} = urlToJson((toRule as string));
        route = routesForMapRoute((router.routesMap as routesMapRule), path, 'finallyPathList')
        query = newQuery;
    }
    if (router.options.platform === 'h5') {
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

