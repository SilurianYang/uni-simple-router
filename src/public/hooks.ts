import {Router, hooksReturnRule, RoutesRule, navtoRule} from '../options/base';

export function callHook(hook:Function|undefined):hooksReturnRule {
    return new Promise(resolve => {
        if (hook != null && hook instanceof Function) {
            hook(resolve);
        } else {
            resolve();
        }
    })
}

const hookList: Array<(router:Router, navRoutes:RoutesRule)=>hooksReturnRule> = [
    (router) => callHook(router.lifeCycle.routerBeforeHooks[0]),
    (router) => {
        const page = (window as any).getCurrentPages()[0];
        if (page != null) {
            return callHook(page.$options.beforeRouteLeave[0])
        }
        return callHook(undefined);
    },
    (router) => callHook(router.lifeCycle.beforeHooks[0]),
    (router, navRule) => callHook(navRule.beforeEnter),
    (router) => callHook(router.lifeCycle.afterHooks[0]),
    (router) => callHook(router.lifeCycle.routerAfterHooks[0])
];

export function transitionTo(router:Router, navRule:navtoRule) :void{
    console.log(navRule)
    for (let i = 0; i < hookList.length; i++) {
        // const hook = hookList[i];
        // hook(router, );
    }
}

