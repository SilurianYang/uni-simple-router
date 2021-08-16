import { proxyHookName } from '../helpers/config';
import { getDataType, getUniCachePage, deepClone} from '../helpers/utils';
import { objectAny, pageTypeRule, Router, totalNextRoute, vueOptionRule } from '../options/base';
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
    pageType:pageTypeRule
):void {
    const hookDeps = router.proxyHookDeps;
    const pageHook:vueOptionRule = vueVim.$options;
    for (let i = 0; i < proxyHookName.length; i++) {
        const hookName = proxyHookName[i];
        const hookList = pageHook[hookName];
        if (hookList) {
            for (let k = 0; k < hookList.length; k++) {
                const originHook = hookList[k];
                if (originHook.toString().includes($npm_package_name)) {
                    continue
                }
                const resetIndex = Object.keys(hookDeps.hooks).length + 1
                const proxyHook = (...args:Array<any>):void => {
                    hookDeps.resetIndex.push(resetIndex);
                    hookDeps.options[resetIndex] = args;
                }
                const [resetHook] = hookList.splice(k, 1, proxyHook);
                hookDeps.hooks[resetIndex] = {
                    proxyHook,
                    callHook: (enterPath:string) :void => {
                        if (router.enterPath.replace(/^\//, '') !== enterPath.replace(/^\//, '') && pageType !== 'app') {
                            return;
                        }
                        const options = hookDeps.options[resetIndex];
                        resetHook.apply(vueVim, options);
                    },
                    resetHook: () :void => {
                        hookList.splice(k, 1, resetHook)
                    }
                };
            }
        }
    }
}
export function resetAndCallPageHook(
    router:Router,
    enterPath:string,
    reset:boolean|undefined = true
):void{
    // Fixe: https://github.com/SilurianYang/uni-simple-router/issues/206
    const pathInfo = enterPath.trim().match(/^(\/?[^\?\s]+)(\?[\s\S]*$)?$/);
    if (pathInfo == null) {
        throw new Error(`还原hook失败。请检查 【${enterPath}】 路径是否正确。`);
    }
    enterPath = pathInfo[1];
    const proxyHookDeps = router.proxyHookDeps;
    const resetHooksArray = proxyHookDeps.resetIndex
    for (let i = 0; i < resetHooksArray.length; i++) {
        const index = resetHooksArray[i];
        const {callHook} = proxyHookDeps.hooks[index];
        callHook(enterPath);
    }
    if (reset) {
        resetPageHook(router);
    }
}
export function resetPageHook(
    router:Router
) {
    const proxyHookDeps = router.proxyHookDeps;
    for (const [, {resetHook}] of Object.entries(proxyHookDeps.hooks)) {
        resetHook();
    }
}
