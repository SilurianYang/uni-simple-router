import {
    NAVTYPE,
    Router,
    uniBackApiRule,
    totalNextRoute,
    uniBackRule,
    objectAny,
    routeRule,
    reNavMethodRule,
    rewriteMethodToggle,
    navtypeToggle
} from '../options/base'
import {
    queryPageToMap,
    resolveQuery,
    parseQuery
} from './query'
import {
    voidFun,
    paramsToQuery,
    getUniCachePage,
    routesForMapRoute
} from '../helpers/utils'

export function navjump(
    to:string|totalNextRoute,
    router:Router,
    navType:NAVTYPE,
    nextCall?:{
        from:totalNextRoute;
        next:Function;
    }
) :void{
    const {rule} = queryPageToMap(to, router);
    rule.type = navtypeToggle[navType];
    const toRule = paramsToQuery(router, rule);
    const parseToRule = resolveQuery(toRule as totalNextRoute, router);
    if (router.options.platform === 'h5') {
        if (navType !== 'push') {
            navType = 'replace';
        }
        if (nextCall != null) { // next 管道函数拦截时 直接next即可
            nextCall.next({
                replace: navType !== 'push',
                ...parseToRule
            })
        } else {
            (router.$route as any)[navType](parseToRule, (parseToRule as totalNextRoute).success || voidFun, (parseToRule as totalNextRoute).fail || voidFun)
        }
    } else {
        // transitionTo(router, toRule, from, navType, HOOKLIST, function() {
        //     console.log('跳转完成')
        // })
        console.log('非h5端跳转TODO')
    }
}

export function navBack(
    router:Router,
    level:number,
    origin?:uniBackRule|uniBackApiRule
):void{
    if (router.options.platform === 'h5') {
        (router.$route as any).go(-level)
    } else {
        console.log('非h5端返回TODO')
    }
}

export function createRoute(
    router:Router,
):routeRule {
    const route:routeRule = {
        name: '',
        meta: {},
        path: '',
        fullPath: '',
        NAVTYPE: '',
        query: {},
        params: {}
    };
    switch (router.options.platform) {
    case 'h5':
        // eslint-disable-next-line no-case-declarations
        const vueRoute = (router.$route as objectAny).currentRoute;
        route.path = vueRoute.path;
        route.fullPath = vueRoute.fullPath;
        route.query = vueRoute.query;
        route.NAVTYPE = rewriteMethodToggle[vueRoute.type as reNavMethodRule || 'reLaunch'];
        break;
    case 'app-plus':
        // eslint-disable-next-line no-case-declarations
        const page = getUniCachePage<objectAny>(0);
        // eslint-disable-next-line no-case-declarations
        const openType:reNavMethodRule = page.$page.openType;
        route.query = page.options;
        route.path = page.$page.path;
        route.fullPath = page.$page.fullPath;
        route.NAVTYPE = rewriteMethodToggle[openType || 'reLaunch']
        break
    default:
        break;
    }
    const tableRoute = routesForMapRoute(router, route.path, ['finallyPathMap', 'pathMap'])
    const perfectRoute = { ...route, ...tableRoute};
    perfectRoute.query = parseQuery(perfectRoute.query, router);
    return perfectRoute;
}
