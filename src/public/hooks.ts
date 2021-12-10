import {
    Router,
    hookListRule,
    navtoRule,
    reloadNavRule,
    totalNextRoute,
    hookToggle,
    NAVTYPE,
    navErrorRule,
    objectAny
} from '../options/base';
import {
    routesForMapRoute,
    getDataType,
    forMatNextToFrom,
    getUniCachePage,
    voidFun
} from '../helpers/utils'
import { navjump } from './methods';
import { proxyH5Mount } from '../H5/proxyHook';
import { addKeepAliveInclude } from '../H5/patch';
import { tabIndexSelect } from '../app/appPatch';

export const ERRORHOOK:Array<(error:navErrorRule, router:Router)=>void> = [
    (error, router) => router.lifeCycle.routerErrorHooks[0](error, router)
]
export const HOOKLIST: hookListRule = [
    (router, to, from, toRoute, next) => callHook(router.lifeCycle.routerBeforeHooks[0], to, from, router, next),
    (router, to, from, toRoute, next) => callBeforeRouteLeave(router, to, from, next),
    (router, to, from, toRoute, next) => callHook(router.lifeCycle.beforeHooks[0], to, from, router, next),
    (router, to, from, toRoute, next) => callHook(toRoute.beforeEnter, to, from, router, next),
    (router, to, from, toRoute, next) => callHook(router.lifeCycle.afterHooks[0], to, from, router, next, false),
    (router, to, from, toRoute, next) => {
        router.$lockStatus = false;
        if (router.options.platform === 'h5') {
            proxyH5Mount(router);
            // 【Fixe】 https://github.com/SilurianYang/uni-simple-router/issues/316  2021年12月10日14:30:13
            addKeepAliveInclude(router);
        }
        router.runId++;
        return callHook(router.lifeCycle.routerAfterHooks[0], to, from, router, next, false)
    }
];

export function callBeforeRouteLeave(
    router:Router,
    to:totalNextRoute,
    from:totalNextRoute,
    resolve:Function
):void {
    const page = getUniCachePage<objectAny>(0);
    let beforeRouteLeave;
    if (Object.keys(page).length > 0) {
        let leaveHooks:Array<Function>|undefined|Function;
        if (router.options.platform === 'h5') {
            leaveHooks = (page as objectAny).$options.beforeRouteLeave;
        } else {
            if ((page as objectAny).$vm != null) {
                leaveHooks = (page as objectAny).$vm.$options.beforeRouteLeave;
            }
        }
        switch (getDataType<Array<Function>>((leaveHooks as Array<Function>))) {
        case '[object Array]': // h5端表现
            beforeRouteLeave = (leaveHooks as Array<Function>)[0];
            beforeRouteLeave = beforeRouteLeave.bind(page)
            break;
        case '[object Function]': // 目前app端表现
            beforeRouteLeave = (leaveHooks as Function).bind((page as objectAny).$vm);
            break
        }
    }
    return callHook(beforeRouteLeave, to, from, router, resolve);
}

export function callHook(
    hook:Function|undefined,
    to:totalNextRoute,
    from: totalNextRoute,
    router:Router,
    resolve:Function,
    hookAwait:boolean|undefined = true
):void {
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
}

export function onTriggerEachHook(
    to:totalNextRoute,
    from: totalNextRoute,
    router:Router,
    hookType:hookToggle,
    next:(rule?: navtoRule|false)=>void,
):void {
    let callHookList:hookListRule = [];
    switch (hookType) {
    case 'beforeEach':
        callHookList = HOOKLIST.slice(0, 3);
        break;
    case 'afterEach':
        callHookList = HOOKLIST.slice(4);
        break
    case 'beforeEnter':
        callHookList = HOOKLIST.slice(3, 4);
        break;
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
    const {matTo, matFrom} = forMatNextToFrom<totalNextRoute>(router, to, from);
    if (router.options.platform === 'h5') {
        loopCallHook(callHookList, 0, hookCB, router, matTo, matFrom, navType);
    } else {
        loopCallHook(callHookList.slice(0, 4), 0, () => {
            hookCB(() => { // 非H5端等他跳转完才触发最后两个生命周期
                loopCallHook(callHookList.slice(4), 0, voidFun, router, matTo, matFrom, navType);
            });
        }, router, matTo, matFrom, navType);
    }
}

export function loopCallHook(
    hooks:hookListRule,
    index:number,
    next:Function,
    router:Router,
    matTo:totalNextRoute,
    matFrom: totalNextRoute,
    navType:NAVTYPE,
): void|Function {
    const toRoute = routesForMapRoute(router, matTo.path, ['finallyPathMap', 'pathMap']);
    if (hooks.length - 1 < index) {
        return next();
    }
    const hook = hooks[index];
    const errHook = ERRORHOOK[0];
    hook(router, matTo, matFrom, toRoute, (nextTo:reloadNavRule) => {
        if (router.options.platform === 'app-plus') {
            if (nextTo === false || (typeof nextTo === 'string' || typeof nextTo === 'object')) {
                tabIndexSelect(matTo, matFrom);
            }
        }
        if (nextTo === false) {
            if (router.options.platform === 'h5') {
                next(false);
            }
            errHook({ type: 0, msg: '管道函数传递 false 导航被终止!', matTo, matFrom, nextTo }, router)
        } else if (typeof nextTo === 'string' || typeof nextTo === 'object') {
            let newNavType = navType;
            let newNextTo = nextTo;
            if (typeof nextTo === 'object') {
                const {NAVTYPE: type, ...moreTo} = nextTo;
                newNextTo = moreTo;
                if (type != null) {
                    newNavType = type;
                }
            }
            navjump(newNextTo, router, newNavType, {from: matFrom, next})
        } else if (nextTo == null) {
            index++;
            loopCallHook(hooks, index, next, router, matTo, matFrom, navType)
        } else {
            errHook({ type: 1, msg: '管道函数传递未知类型，无法被识别。导航被终止！', matTo, matFrom, nextTo }, router)
        }
    });
}
