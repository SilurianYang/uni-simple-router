import { navtoRule, navErrorRule, Router, proxyHookName, guardHookRule, totalNextRoute, hookToggle} from '../options/base';
import { LifeCycleConfig, InstantiateConfig} from '../options/config';
import {onTriggerEachHook} from '../public/hooks'

export function registerHook(list:Array<Function>, fn:Function):Function {
    list.push(fn);
    return () => {
        const i = list.indexOf(fn);
        if (i > 0) list.splice(i, 1);
    };
}

export function registerRouterHooks<T extends LifeCycleConfig>(cycleHooks:T, options:InstantiateConfig):T {
    registerHook(cycleHooks.routerBeforeHooks, function(to:totalNextRoute, from: totalNextRoute, next:(rule: navtoRule)=>void):void {
        (options.routerBeforeEach as Function)(to, from, next);
    })();
    registerHook(cycleHooks.routerAfterHooks, function(to:totalNextRoute, from: totalNextRoute):void {
        (options.routerAfterEach as Function)(to, from);
    })();
    registerHook(cycleHooks.routerErrorHooks, function(error:navErrorRule, router:Router):void {
        (options.routerErrorEach as Function)(error, router);
    })();
    return cycleHooks;
}

export function registerEachHooks(router:Router, hookType:proxyHookName, userGuard:guardHookRule) {
    registerHook(router.lifeCycle[hookType], function(
        to:totalNextRoute,
        from: totalNextRoute,
        next:(rule?: navtoRule|false)=>void,
        router:Router,
        auto:boolean,
    ):void {
        if (auto) { // h5端 vue-router自动触发 非自己调用触发
            onTriggerEachHook(to, from, router, hookToggle[hookType], next)
        } else {
            userGuard(to, from, next)
        }
    })
}
