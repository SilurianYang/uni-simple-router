import { getDataType, getUniCachePage, deepClone, replaceHook} from '../helpers/utils';
import { objectAny, pageTypeRule, Router, totalNextRoute } from '../options/base';
import {createRoute} from './methods'
import { stringifyQuery } from './query';

export function createToFrom(
    to:totalNextRoute,
    router:Router,
):totalNextRoute {
    let fromRoute:totalNextRoute = {path: ''};
    const page = getUniCachePage<Array<any>|objectAny>(0);
    if (getDataType<Array<any>|objectAny>(page) === '[object Array]') {
        fromRoute = deepClone<totalNextRoute>(to)
    } else {
        fromRoute = createRoute(router) as totalNextRoute;
    }
    return fromRoute;
}

export function createFullPath(
    to:totalNextRoute,
    from:totalNextRoute
):void{
    if (to.fullPath == null) {
        const strQuery = stringifyQuery(to.query as objectAny);
        to.fullPath = to.path + strQuery;
    }
    if (from.fullPath == null) {
        const strQuery = stringifyQuery(from.query as objectAny);
        from.fullPath = from.path + strQuery;
    }
}

export function proxyPageHook(
    vueVim:any,
    router:Router,
    proxyHookKey:'appProxyHook'|'appletsProxyHook',
    pageType:pageTypeRule,
):void {
    replaceHook(router, vueVim, proxyHookKey, pageType);
}
