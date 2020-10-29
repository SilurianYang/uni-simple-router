import {RoutesRule, Router, routesMapRule, totalNextRoute, hookToggle, navtoRule} from '../options/base';
import {H5Config} from '../options/config';
import {warn} from '../helpers/warn'
import {getDataType, getRoutePath} from '../helpers/utils'
import { onTriggerEachHook } from '../public/hooks';

export function buildVueRoutes(router: Router, vueRouteMap:RoutesRule):RoutesRule {
    const {pathMap, finallyPathList} = (router.routesMap as routesMapRule);
    const vueRoutePathList:Array<string> = Object.keys(vueRouteMap);
    for (let i = 0; i < vueRoutePathList.length; i++) {
        const path = vueRoutePathList[i];
        const myRoute:RoutesRule = pathMap[path];
        const vueRoute:RoutesRule = vueRouteMap[path];
        if (!myRoute) {
            warn(`${path} 路由地址在路由表中未找到，确定是否传递漏啦`, router, true);
        } else {
            const {finallyPath} = getRoutePath(myRoute, router);
            if (finallyPath instanceof Array) {
                throw new Error(`非 vueRouterDev 模式下，alias、aliasPath、path 无法提供数组类型！ ${JSON.stringify(myRoute)}`);
            }
            if (myRoute.name != null) {
                vueRoute.name = myRoute.name;
            }
            const vuePath = vueRoute['path'];
            const vueAlias = vueRoute['alias'];
            delete vueRoute['alias'];
            vueRoute['path'] = (finallyPath as string);
            if (vuePath === '/' && vueAlias != null) {
                vueRoute['alias'] = vueAlias;
                vueRoute['path'] = vuePath;
            }
            const beforeEnter = myRoute.beforeEnter;
            if (beforeEnter) {
                vueRoute['beforeEnter'] = function(
                    to:totalNextRoute,
                    from: totalNextRoute,
                    next:(rule?: navtoRule|false)=>void,
                ):void{
                    onTriggerEachHook(to, from, router, hookToggle['enterHooks'], next)
                };
            }
        }
    }
    if (finallyPathList.includes('*')) {
        vueRouteMap['*'] = pathMap['*']
    }
    return vueRouteMap
}

export function buildVueRouter(router:Router, vueRouter:any, vueRouteMap:RoutesRule|RoutesRule[]) :void |never {
    let routes:RoutesRule[] = [];
    if (getDataType<RoutesRule|RoutesRule[]>(vueRouteMap) === '[object Array]') {
        routes = (vueRouteMap as RoutesRule[]);
    } else {
        routes = Object.values(vueRouteMap);
    }
    const {scrollBehavior, fallback} = router.options.h5 as H5Config;
    const oldScrollBehavior = vueRouter.options.scrollBehavior;
    vueRouter.options.scrollBehavior = function proxyScrollBehavior(
        to:totalNextRoute,
        from:totalNextRoute,
        savedPosition:any
    ) {
        oldScrollBehavior && oldScrollBehavior(to, from, savedPosition);
        return (scrollBehavior as Function)(to, from, savedPosition)
    }
    vueRouter.fallback = fallback;
    // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
    const newVueRouter:any = new vueRouter.constructor({
        ...router.options.h5,
        base: vueRouter.options.base,
        mode: vueRouter.options.mode,
        routes
    });
    vueRouter.matcher = newVueRouter.matcher;
}
