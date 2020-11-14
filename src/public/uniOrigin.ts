import { reNavMethodRule, reNotNavMethodRule, Router, uniNavApiRule } from '../options/base';
import { stringifyQuery } from './query';
import {restPageHook} from '../helpers/utils'

let routerNavCount:number = 0;

export function uniOriginJump(
    router:Router,
    originMethod:Function,
    funName:reNavMethodRule|reNotNavMethodRule,
    options:uniNavApiRule,
    callOkCb?:Function,
    forceNav?:boolean
):void {
    const {complete, ...originRule} = formatOriginURLQuery(options);
    if (routerNavCount === 0) { // 还原app。vue下已经重写后的生命周期
        restPageHook(router);
    }
    if (forceNav != null && forceNav === false) {
        routerNavCount++
        complete && complete.apply(null, {msg: 'forceGuardEach强制触发并且不执行跳转'});
        callOkCb && callOkCb.apply(null, {msg: 'forceGuardEach强制触发并且不执行跳转'})
    } else {
        originMethod({
            ...originRule,
            complete: async function(...args:Array<any>) {
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
}

export function hideTabBar(
    router:Router,
    originMethod:Function,
    originRule:uniNavApiRule
):Promise<undefined> {
    return new Promise(resolve => {
        const appMain = router.appMain
        if (Object.keys(appMain).length > 0) {
            const appMainRule = appMain as {
                NAVTYPE:reNavMethodRule|reNotNavMethodRule,
                path:string
            }
            if (appMainRule.NAVTYPE === 'switchTab') {
                if (appMainRule.path !== originRule?.url) {
                    return originMethod({
                        url: originRule.url,
                        complete: () => resolve()
                    })
                }
            }
        }
        resolve();
    })
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
