import {
    NAVTYPE,
    Router,
    totalNextRoute,
    objectAny,
    routeRule,
    reNavMethodRule,
    rewriteMethodToggle,
    navtypeToggle,
    navErrorRule
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
    routesForMapRoute,
    copyData,
    lockDetectWarn
} from '../helpers/utils'
import { transitionTo } from './hooks';
import {createFullPath, createToFrom} from '../public/page'
import {HOOKLIST} from './hooks'

export function lockNavjump(
    to:string|totalNextRoute,
    router:Router,
    navType:NAVTYPE,
):void{
    lockDetectWarn(router, () => {
        if (router.options.platform !== 'h5') {
            router.$lockStatus = true;
        }
        navjump(to, router, navType);
    });
}

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
    let parseToRule = resolveQuery(toRule as totalNextRoute, router);
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
        let from:totalNextRoute = {path: ''};
        if (nextCall == null) {
            const toRoute = routesForMapRoute(router, parseToRule.path, ['finallyPathMap', 'pathMap']);
            parseToRule = { ...toRoute, ...{params: {}}, ...parseToRule }
            from = createToFrom(parseToRule, router);
        } else {
            from = nextCall.from;
        }
        createFullPath(parseToRule, from);
        transitionTo(router, parseToRule, from, navType, HOOKLIST, function(
            callOkCb:Function
        ):void{
            uni[navtypeToggle[navType]](parseToRule, true, callOkCb);
        })
    }
}

export function navBack(
    router:Router,
    level:number,
    navType:NAVTYPE,
):void{
    lockDetectWarn(router, () => {
        if (router.options.platform === 'h5') {
            (router.$route as any).go(-level);
        } else {
            router.$lockStatus = true;
            const toRule = createRoute(router, level);
            navjump({
                path: toRule.path,
                query: toRule.query
            }, router, navType);
        }
    })
}

export function createRoute(
    router:Router,
    level:number|undefined = 0,
    orignRule?:totalNextRoute,
):routeRule|never {
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
    case 'h5': {
        let vueRoute:totalNextRoute = {path: ''};
        if (orignRule != null) {
            const matRouteParams = copyData(orignRule.params as objectAny);
            delete matRouteParams.__id__;
            const toQuery = parseQuery({...matRouteParams, ...copyData(orignRule.query as objectAny)}, router);
            vueRoute = {...(orignRule as totalNextRoute), query: toQuery}
        } else {
            vueRoute = (router.$route as objectAny).currentRoute;
        }
        route.path = vueRoute.path;
        route.fullPath = vueRoute.fullPath || '';
        route.query = vueRoute.query || {};
        route.NAVTYPE = rewriteMethodToggle[vueRoute.type as reNavMethodRule || 'reLaunch'];
        break;
    }
    case 'app-plus': {
        let appPage:objectAny = {};
        if (orignRule != null) {
            appPage = {...orignRule, openType: orignRule.type};
        } else {
            const page = getUniCachePage<objectAny>(level);
            if (Object.keys(page).length === 0) {
                (router.options.routerErrorEach as (error: navErrorRule, router:Router) => void)({
                    type: 3,
                    msg: `不存在的页面栈，请确保有足够的页面可用，当前 level:${level}`
                }, router);
                throw new Error(`不存在的页面栈，请确保有足够的页面可用，当前 level:${level}`)
            }
            appPage = {
                ...(page as objectAny).$page,
                query: (page as objectAny).options,
                fullPath: decodeURIComponent((page as objectAny).$page.fullPath)
            }
        }
        const openType:reNavMethodRule = appPage.openType;
        route.query = appPage.query;
        route.path = appPage.path;
        route.fullPath = appPage.fullPath;
        route.NAVTYPE = rewriteMethodToggle[openType || 'reLaunch']
        break
    }
    default:
        break;
    }
    const tableRoute = routesForMapRoute(router, route.path, ['finallyPathMap', 'pathMap'])
    const perfectRoute = { ...route, ...tableRoute};
    perfectRoute.query = parseQuery(perfectRoute.query, router);
    return perfectRoute;
}
