import { objectAny, reNavMethodRule, reNotNavMethodRule, Router, uniNavApiRule } from '../options/base';
import { stringifyQuery } from './query';

let routerNavCount:number = 0;

export function uniOriginJump(
    router:Router,
    originMethod:Function,
    funName:reNavMethodRule|reNotNavMethodRule,
    options:uniNavApiRule,
    callOkCb?:Function
):void {
    const {complete, ...originRule} = formatOriginURLQuery(options);
    if (routerNavCount === 0) { // 还原app。vue下已经重写后的生命周期
        let proxyHookKey:'appProxyHook'|'appletsProxyHook' = 'appletsProxyHook';
        if (router.options.platform === 'app-plus') {
            proxyHookKey = 'appProxyHook';
        }
        for (const [, value] of Object.entries(router[proxyHookKey])) {
            for (const [, [origin]] of Object.entries(value as objectAny)) {
                if (origin) {
                    origin.hook && origin.hook();
                }
            }
        }
    }
    originMethod({
        ...originRule,
        complete: function(...args:Array<any>) {
            if (routerNavCount === 0) {
                routerNavCount++
                if (router.options.platform === 'app-plus') {
                    const waitPage = plus.nativeObj.View.getViewById('router-loadding');
                    waitPage && waitPage.close();
                    const launchedHook = router.options.APP?.launchedHook;
                    launchedHook && launchedHook();
                }
            }
            complete && complete.apply(null, args);
            callOkCb && callOkCb.apply(null, args)
        }
    });
}

export function formatOriginURLQuery(
    options:uniNavApiRule
):uniNavApiRule {
    const {url, path, query, animationType, animationDuration, events, success, fail, complete} = options;
    const strQuery = stringifyQuery(query || {});
    const queryURL = strQuery === '' ? (path || url) : (path || url) + strQuery
    return {
        url: queryURL,
        animationType,
        animationDuration,
        events,
        success,
        fail,
        complete
    }
}
