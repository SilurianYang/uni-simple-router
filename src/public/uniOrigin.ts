import { reNavMethodRule, reNotNavMethodRule, Router, uniNavApiRule } from '../options/base';
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
    if (funName === 'navigateBack') {
        callOkCb && callOkCb();
    }
    if (routerNavCount === 0) { // 还原app。vue下已经重写后的生命周期
        const app = getApp();
        for (const [, [value]] of Object.entries(router.appProxyHook)) {
            value.hook.apply(app);
        }
    }
    originMethod({
        ...originRule,
        complete: function(...args:Array<any>) {
            if (routerNavCount === 0) {
                if (router.options.platform === 'app-plus') {
                    plus.nativeObj.View.getViewById('router-loadding').close();
                    const launchedHook = router.options.APP?.launchedHook;
                    launchedHook && launchedHook();
                }
            }
            routerNavCount++
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
