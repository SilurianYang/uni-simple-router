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
    uniBackRule,
    navRoute
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
    getDataType,
    notRouteTo404,
    deepDecodeQuery
} from '../helpers/utils'
import { transitionTo } from './hooks';
import {createFullPath, createToFrom} from '../public/page'
import {HOOKLIST} from './hooks'

export function lockNavjump(
    to:string|totalNextRoute|navRoute,
    router:Router,
    navType:NAVTYPE,
    forceNav?:boolean,
    animation?:uniBackApiRule|uniBackRule
):void{
    lockDetectWarn(router, to, navType, () => {
        if (router.options.platform !== 'h5') {
            router.$lockStatus = true;
        }
        navjump(to as totalNextRoute, router, navType, undefined, forceNav, animation);
    }, animation);
}
export function navjump(
    to:string|totalNextRoute,
    router:Router,
    navType:NAVTYPE,
    nextCall?:{
        from:totalNextRoute;
        next:Function;
    },
    forceNav?:boolean,
    animation?:uniBackApiRule|uniBackRule,
    callHook:boolean|undefined = true
) :void|never|totalNextRoute {
    if (navType === 'back') {
        let level:number = 1;
        if (typeof to === 'string') {
            level = +to;
        } else {
            level = to.delta || 1;
            // 主要剥离事件函数
            animation = {
                ...animation || {},
                ...(to as uniBackApiRule)
            }
        }
        if (router.options.platform === 'h5') {
            (router.$route as any).go(-level);

            // Fixe  https://github.com/SilurianYang/uni-simple-router/issues/266   2021年6月3日11:14:38
            // @ts-ignore
            const success = (animation || {success: voidFun}).success || voidFun;
            // @ts-ignore
            const complete = (animation || {complete: voidFun}).complete || voidFun;
            success({errMsg: 'navigateBack:ok'});
            complete({errMsg: 'navigateBack:ok'});
            return;
        } else {
            to = backOptionsBuild(router, level, animation);
        }
    }
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
            // Fixe  https://github.com/SilurianYang/uni-simple-router/issues/240   2021年3月7日14:45:36
            if (navType === 'push' && Reflect.has(parseToRule, 'events')) {
                if (Reflect.has(parseToRule, 'name')) {
                    throw new Error(`在h5端上使用 'push'、'navigateTo' 跳转时，如果包含 events 不允许使用 name 跳转，因为 name 实现了动态路由。请更换为 path 或者 url 跳转！`);
                } else {
                    uni['navigateTo'](parseToRule, true, voidFun, forceNav);
                }
            } else {
                (router.$route as any)[navType](parseToRule, (parseToRule as totalNextRoute).success || voidFun, (parseToRule as totalNextRoute).fail || voidFun)
            }
        }
    } else {
        let from:totalNextRoute = {path: ''};
        if (nextCall == null) {
            let toRoute = routesForMapRoute(router, parseToRule.path, ['finallyPathMap', 'pathMap']);
            toRoute = notRouteTo404(router, toRoute, parseToRule, navType);
            parseToRule = { ...toRoute, ...{params: {}}, ...parseToRule, ...{path: toRoute.path} }
            from = createToFrom(parseToRule, router);
        } else {
            from = nextCall.from;
        }
        createFullPath(parseToRule, from);
        if (callHook === false) {
            return parseToRule;
        }
        transitionTo(router, parseToRule, from, navType, HOOKLIST, function(
            callOkCb:Function
        ):void {
            uni[navtypeToggle[navType]](parseToRule, true, callOkCb, forceNav);
        })
    }
}

export function backOptionsBuild(
    router:Router,
    level:number,
    animation:uniBackApiRule|uniBackRule|undefined = {},
):totalNextRoute {
    const toRule = createRoute(router, level, undefined, {NAVTYPE: 'back', ...animation});
    const navjumpRule:totalNextRoute = {
        ...animation,
        path: toRule.path,
        query: toRule.query,
        delta: level
    }
    if (getDataType<any>(animation) === '[object Object]') {
        const {animationDuration, animationType} = (animation as uniBackApiRule)
        if (animationDuration != null) {
            navjumpRule.animationDuration = animationDuration;
        }
        if (animationType != null) {
            navjumpRule.animationType = animationType;
        }

        const {from} = (animation as uniBackRule)
        if (from != null) {
            navjumpRule.BACKTYPE = from;
        }
    }
    return navjumpRule;
}

export function forceGuardEach(
    router:Router,
    navType:NAVTYPE|undefined = 'replaceAll',
    forceNav:undefined|boolean = false
):void|never {
    if (router.options.platform === 'h5') {
        throw new Error(`在h5端上使用：forceGuardEach 是无意义的，目前 forceGuardEach 仅支持在非h5端上使用`);
    }
    const currentPage = getUniCachePage<objectAny>(0);
    if (Object.keys(currentPage).length === 0) {
        (router.options.routerErrorEach as (error: navErrorRule, router:Router) => void)({
            type: 3,
            NAVTYPE: navType,
            uniActualData: {},
            level: 0,
            msg: `不存在的页面栈，请确保有足够的页面可用，当前 level:0`
        }, router);
    }
    const {route, options} = currentPage as objectAny;
    lockNavjump({
        path: `/${route}`,
        query: deepDecodeQuery(options || {})
    }, router, navType, forceNav);
}

export function createRoute(
    router:Router,
    level:number|undefined = 0,
    orignRule?:totalNextRoute,
    uniActualData:objectAny|undefined = {},
):routeRule|never {
    const route:routeRule = {
        name: '',
        meta: {},
        path: '',
        fullPath: '',
        NAVTYPE: '',
        query: {},
        params: {},
        BACKTYPE: (orignRule || {BACKTYPE: ''}).BACKTYPE || '' // v2.0.5 +
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
        route.query = deepDecodeQuery(vueRoute.query || {});
        route.NAVTYPE = rewriteMethodToggle[vueRoute.type as reNavMethodRule || 'reLaunch'];
    } else {
        let appPage:objectAny = {};
        if (orignRule != null) {
            appPage = {...orignRule, openType: orignRule.type};
        } else {
            const page = getUniCachePage<objectAny>(level);
            if (Object.keys(page).length === 0) {
                const {NAVTYPE: _NAVTYPE, ..._args} = uniActualData;
                const errorMsg:string = `不存在的页面栈，请确保有足够的页面可用，当前 level:${level}`;
                (router.options.routerErrorEach as (error: navErrorRule, router:Router) => void)({
                    type: 3,
                    msg: errorMsg,
                    NAVTYPE: _NAVTYPE,
                    level,
                    uniActualData: _args
                }, router);
                throw new Error(errorMsg);
            }
            // Fixes: https://github.com/SilurianYang/uni-simple-router/issues/196
            const pageOptions:objectAny = (page as objectAny).options || {};
            appPage = {
                ...(page as objectAny).$page || {},
                query: deepDecodeQuery(pageOptions),
                fullPath: decodeURIComponent(((page as objectAny).$page || {}).fullPath || '/' + (page as objectAny).route)
            }
            if (router.options.platform !== 'app-plus') {
                appPage.path = `/${(page as objectAny).route}`
            }
        }
        const openType:reNavMethodRule|'navigateBack' = appPage.openType;
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
