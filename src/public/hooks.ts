import {Router, hooksReturnRule, hookListRule, navtoRule, reloadNavRule, totalNextRoute, guardHookRule, routesMapRule} from '../options/base';
import {routesForMapRoute} from '../helpers/utils'

export function callHook(hook:Function|undefined, to:totalNextRoute, from: totalNextRoute):hooksReturnRule {
    return new Promise(resolve => {
        if (hook != null && hook instanceof Function) {
            hook(to, from, resolve);
        } else {
            resolve();
        }
    })
}

const hookList: hookListRule = [
    (router, to, from, toRoute) => callHook(router.lifeCycle.routerBeforeHooks[0], to, from),
    (router, to, from, toRoute) => {
        const page = (window as any).getCurrentPages()[0];
        if (page != null) {
            return callHook(page.$options.beforeRouteLeave[0], to, from)
        }
        return callHook(undefined, to, from);
    },
    (router, to, from, toRoute) => callHook(router.lifeCycle.beforeHooks[0], to, from),
    (router, to, from, toRoute) => callHook(toRoute.beforeEnter, to, from),
    (router, to, from, toRoute) => callHook(router.lifeCycle.afterHooks[0], to, from),
    (router, to, from, toRoute) => callHook(router.lifeCycle.routerAfterHooks[0], to, from)
];

export function beforeEachHook(
    to:totalNextRoute,
    from: totalNextRoute,
    next:(rule: navtoRule)=>void,
    router:Router,
    userGuard:guardHookRule
):void {
    transitionTo(router, to, from, () => {

    });
}

export function transitionTo(router:Router, to:totalNextRoute, from: totalNextRoute, hookCB:Function) :void{
    const toRoute = routesForMapRoute((router.routesMap as routesMapRule), to.path);
    function loopCallHook(hooks:hookListRule, index:number, next:Function): Function|undefined {
        if (hooks.length - 1 < index) {
            return next();
        }
        const hook = hookList[index];
        hook(router, to, from, toRoute).then((to:reloadNavRule) => {
            console.log(to)
            if (to === false) {

            } else if (typeof to === 'string' || typeof to === 'object') {
                router.push(to);
            }
            index++;
            loopCallHook(hooks, index, next)
        });
    }
    loopCallHook(hookList, 0, () => {
        console.log('生命周期执行完毕')
    });
    // for (let i = 0; i < hookList.length; i++) {
    //     const hook = hookList[i];
    //     hook(router, to, from, toRoute);
    // }
}

