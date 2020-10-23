import { Router, routesMapRule, RoutesRule, totalNextRoute } from '../options/base';
import {getDataType, getRoutePath} from '../helpers/utils'
import {ERRORHOOK} from './hooks'

export function queryPageToMap(toPath:string|totalNextRoute, router:Router) {
    let path = toPath;
    if (getDataType<string|totalNextRoute>(toPath) === '[object Object]') {
        const objNavRule = (toPath as totalNextRoute);
        if (objNavRule.path != null) {
            path = objNavRule.path;
        } else if (objNavRule.name != null) {
            const route:RoutesRule|undefined|null = (router.routesMap as routesMapRule).nameMap[objNavRule.name];
            if (route == null) {
                ERRORHOOK[0]({ type: 2, msg: `命名路由为：${objNavRule.name} 的路由，无法在路由表中找到！`, toPath}, router)
            } else {
                path = (getRoutePath(route).finallyPath as string);
            }
        } else {
            ERRORHOOK[0]({ type: 2, msg: `${toPath} 解析失败，请检测当前路由表下是否有包含。`, toPath}, router)
        }
    }
    console.log(path)
}
