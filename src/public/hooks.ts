import {
    Router,
    hooksReturnRule,
    hookListRule,
    navtoRule,
    reloadNavRule,
    totalNextRoute,
    routesMapRule,
    hookToggle,
    NAVTYPE,
    navErrorRule
} from '../options/base';
import {
    routesForMapRoute,
    getDataType,
    urlToJson,
    forMatNextToFrom
} from '../helpers/utils'

export const ERRORHOOK:Array<(error:navErrorRule, router:Router)=>void> = [
    (error, router) => router.lifeCycle.routerErrorHooks[0](error, router)
]
export const HOOKLIST: hookListRule = [
    (router, to, from, toRoute) => callHook(router.lifeCycle.routerBeforeHooks[0], to, from, router),
    (router, to, from, toRoute) => {
        const pages = getCurrentPages();
        const page = pages[pages.length - 1];
        let beforeRouteLeave;
        if (page != null) {
            const leaveHooks:Array<Function>|undefined = page.$options.beforeRouteLeave;
            if (getDataType<Array<Function>>((leaveHooks as Array<Function>)) === '[object Array]') {
                beforeRouteLeave = (leaveHooks as Array<Function>)[0];
                beforeRouteLeave = beforeRouteLeave.bind(page)
            }
        }
        return callHook(beforeRouteLeave, to, from, router);
    },
    (router, to, from, toRoute) => callHook(router.lifeCycle.beforeHooks[0], to, from, router),
    (router, to, from, toRoute) => callHook(toRoute.beforeEnter, to, from, router),
    (router, to, from, toRoute) => callHook(router.lifeCycle.afterHooks[0], to, from, router, false),
    (router, to, from, toRoute) => callHook(router.lifeCycle.routerAfterHooks[0], to, from, router, false)
];

export function callHook(
    hook:Function|undefined,
    to:totalNextRoute,
    from: totalNextRoute,
    router:Router,
    hookAwait:boolean|undefined = true
):hooksReturnRule {
    return new Promise(resolve => {
        if (hook != null && hook instanceof Function) {
            if (hookAwait === true) {
                hook(to, from, resolve, router, false);
            } else {
                hook(to, from, () => {}, router, false);
                resolve();
            }
        } else {
            resolve();
        }
    })
}

export function onTriggerEachHook(
    to:totalNextRoute,
    from: totalNextRoute,
    router:Router,
    hookType:hookToggle,
    next:(rule?: navtoRule|false)=>void,
):void {
    let callHookList:hookListRule = [];
    if (hookType === 'beforeEach') {
        callHookList = HOOKLIST.slice(0, 3);
    } else {
        callHookList = HOOKLIST.slice(4);
    }
    transitionTo(router, to, from, 'push', callHookList, next);
}

export function transitionTo(
    router:Router,
    to:totalNextRoute,
    from: totalNextRoute,
    navType:NAVTYPE,
    callHookList:hookListRule,
    hookCB:Function
) :void{
    loopCallHook(callHookList, 0, hookCB, router, to, from, navType);
}

export function loopCallHook(
    hooks:hookListRule,
    index:number,
    next:Function,
    router:Router,
    to:totalNextRoute,
    from: totalNextRoute,
    navType:NAVTYPE,
): void|Function {
    const toRoute = routesForMapRoute((router.routesMap as routesMapRule), to.path, ['finallyPathMap', 'pathMap']);
    if (hooks.length - 1 < index) {
        return next();
    }
    const hook = hooks[index];
    const errHook = ERRORHOOK[0];
    const {matTo, matFrom} = forMatNextToFrom<totalNextRoute>(router, to, from);
    hook(router, matTo, matFrom, toRoute).then((nextTo:reloadNavRule):void => {
        if (nextTo === false) {
            errHook({ type: 0, msg: '管道函数传递 false 导航被终止!', matTo, matFrom, nextTo }, router)
        } else if (typeof nextTo === 'string' || typeof nextTo === 'object') {
            let newNavType = navType;
            let newTo = nextTo;
            if (typeof nextTo === 'object') {
                const {NAVTYPE: type, ...moreTo} = nextTo;
                if (type != null) {
                    newNavType = type;
                }
                newTo = moreTo;
            } else {
                const {path, query} = urlToJson(nextTo);
                newTo = { path, query };
            }
            if (router.options.platform === 'h5') {
                next({
                    replace: newNavType !== 'push',
                    ...newTo
                })
            } else {
                router[navType]({
                    ...newTo,
                    NAVTYPE: newNavType
                }, from);
            }
        } else if (nextTo == null) {
            index++;
            loopCallHook(hooks, index, next, router, to, from, navType)
        } else {
            errHook({ type: 1, msg: '管道函数传递未知类型，无法被识别。导航被终止！', matTo, matFrom, nextTo }, router)
        }
    });
}
