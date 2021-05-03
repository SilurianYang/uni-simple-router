import { originMixins, reNavMethodRule, reNotNavMethodRule, Router, startAnimationRule, uniNavApiRule } from '../options/base';
import { stringifyQuery } from './query';
import {notDeepClearNull, resetPageHook} from '../helpers/utils'

let routerNavCount:number = 0;

export function uniOriginJump(
    router:Router,
    originMethod:Function,
    funName:reNavMethodRule|reNotNavMethodRule,
    options: originMixins,
    callOkCb?:Function,
    forceNav?:boolean
):void {
    const {complete, ...originRule} = formatOriginURLQuery(router, options, funName);

    if (routerNavCount === 0 && router.options.platform !== 'h5') { // 还原app.vue下已经重写后的生命周期
        resetPageHook(router, originRule.url)
    }
    if (forceNav != null && forceNav === false) {
        if (routerNavCount === 0) {
            routerNavCount++
            // 【Fixe】  https://github.com/SilurianYang/uni-simple-router/issues/254
            // 在小程序端  next 直接放行会执行这个
            if (router.options.platform !== 'h5') {
                router.Vue.prototype.$AppReady = true;
            }
        }
        complete && complete.apply(null, {msg: 'forceGuardEach强制触发并且不执行跳转'});
        callOkCb && callOkCb.apply(null, {msg: 'forceGuardEach强制触发并且不执行跳转'})
    } else {
        if (funName === 'navigateBack') {
            originMethod({
                ...originRule,
                from: options.BACKTYPE
            });
            callOkCb && callOkCb.apply(null)
        } else {
            originMethod({
                ...originRule,
                complete: function(...args:Array<any>) {
                    if (routerNavCount === 0) {
                        routerNavCount++

                        // 【Fixe】  https://github.com/SilurianYang/uni-simple-router/issues/254
                        // 在小程序端 第一次 next 做跳转  会触发这个 、在app端首次必定会触发这个
                        if (router.options.platform !== 'h5') {
                            router.Vue.prototype.$AppReady = true;
                        }

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
}
export function formatOriginURLQuery(
    router:Router,
    options:uniNavApiRule,
    funName:reNavMethodRule|reNotNavMethodRule
):uniNavApiRule {
    const {url, path, query, animationType, animationDuration, events, success, fail, complete, delta, animation} = options;
    const strQuery = stringifyQuery(query || {});
    const queryURL = strQuery === '' ? (path || url) : (path || url) + strQuery;
    let animationRule:startAnimationRule = {};
    if (router.options.platform === 'app-plus') {
        if (funName !== 'navigateBack') {
            animationRule = router.options.APP?.animation || {};
            animationRule = {...animationRule, ...animation || {}};
        }
    }
    return notDeepClearNull<uniNavApiRule>({
        delta,
        url: queryURL,
        animationType: animationType || animationRule.animationType,
        animationDuration: animationDuration || animationRule.animationDuration,
        events,
        success,
        fail,
        complete
    })
}
