import {
    NAVTYPE,
    Router,
    totalNextRoute,
    objectAny,
    routeRule,
    reNavMethodRule,
    rewriteMethodToggle,
    navtypeToggle,
    navErrorRule,
    uniBackApiRule,
    uniBackRule
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
    lockDetectWarn,
    getDataType
} from '../helpers/utils'
import { transitionTo } from './hooks';
import {createFullPath, createToFrom} from '../public/page'
import {HOOKLIST} from './hooks'

export function lockNavjump(
    to:string|totalNextRoute,
    router:Router,
    navType:NAVTYPE,
    forceNav?:boolean
):void{
    lockDetectWarn(router, to, navType, () => {
        if (router.options.platform !== 'h5') {
            router.$lockStatus = true;
        }
        navjump(to, router, navType, undefined, forceNav);
    });
}

export function navjump(
    to:string|totalNextRoute,
    router:Router,
    navType:NAVTYPE,
    nextCall?:{
        from:totalNextRoute;
        next:Function;
    },
    forceNav?:boolean
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
        ):void {
            uni[navtypeToggle[navType]](parseToRule, true, callOkCb, forceNav);
        })
    }
}

export function navBack(
    router:Router,
    level:number,
    navType:NAVTYPE,
    animation?:uniBackApiRule|uniBackRule,
):void{
    lockDetectWarn(router, level, navType, () => {
        if (router.options.platform === 'h5') {
            (router.$route as any).go(-level);
        } else {
            router.$lockStatus = true;
            const toRule = createRoute(router, level);
            const navjumpRule:totalNextRoute = {
                path: toRule.path,
                query: toRule.query
            }
            if (getDataType<any>(animation) === '[object Object]') {
                const {animationDuration, animationType} = (animation as uniBackApiRule)
                if (animationDuration != null) {
                    navjumpRule.animationDuration = animationDuration;
                }
                if (animationType != null) {
                    navjumpRule.animationType = animationType;
                }
            }
            navjump(navjumpRule, router, navType);
        }
    })
}

export function forceGuardEach(
    router:Router,
    navType:NAVTYPE|undefined = 'replaceAll',
    forceNav:undefined|boolean = false
):void|never {
    if (router.options.platform === 'h5') {
        throw new Error(`在h5端上使用：forceGuardEach 是无意义的，目前 forceGuardEach 仅支持在非h5端上使用`);
    }
    const page = getUniCachePage<objectAny>(0);
    if (Object.keys(page).length === 0) {
        (router.options.routerErrorEach as (error: navErrorRule, router:Router) => void)({
            type: 3,
            msg: `不存在的页面栈，请确保有足够的页面可用，当前 level:0`
        }, router);
    }
    const {route, options} = page as objectAny;
    lockNavjump({
        path: `/${route}`,
        query: options
    }, router, navType, forceNav);
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
    if (level === 19970806) { // 首次构建响应式 页面不存在 直接返回
        return route
    }
    if (router.options.platform === 'h5') {
        let vueRoute:totalNextRoute = {path: ''};
        if (orignRule != null) {
            vueRoute = orignRule;
        } else {
            vueRoute = (router.$route as objectAny).currentRoute;
        }
        const matRouteParams = copyData(vueRoute.params as objectAny);
        delete matRouteParams.__id__;
        const toQuery = parseQuery({...matRouteParams, ...copyData(vueRoute.query as objectAny)}, router);
        vueRoute = {...vueRoute, query: toQuery}
        route.path = vueRoute.path;
        route.fullPath = vueRoute.fullPath || '';
        route.query = vueRoute.query || {};
        route.NAVTYPE = rewriteMethodToggle[vueRoute.type as reNavMethodRule || 'reLaunch'];
    } else {
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
            if (router.options.platform !== 'app-plus') {
                appPage.path = `/${(page as objectAny).route}`
            }
        }
        const openType:reNavMethodRule = appPage.openType;
        route.query = appPage.query;
        route.path = appPage.path;
        route.fullPath = appPage.fullPath;
        route.NAVTYPE = rewriteMethodToggle[openType || 'reLaunch'];
    }
    const tableRoute = routesForMapRoute(router, route.path, ['finallyPathMap', 'pathMap'])
    const perfectRoute = { ...route, ...tableRoute};
    perfectRoute.query = parseQuery(perfectRoute.query, router);
    return perfectRoute;
}
