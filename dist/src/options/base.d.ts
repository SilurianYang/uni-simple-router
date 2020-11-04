import { appletsVueHookConfig, appVueHookConfig, InstantiateConfig, LifeCycleConfig } from '../options/config';
export declare enum hookToggle {
    'beforeHooks' = "beforeEach",
    'afterHooks' = "afterEach",
    'enterHooks' = "beforeEnter"
}
export declare enum navtypeToggle {
    'push' = "navigateTo",
    'replace' = "redirectTo",
    'replaceAll' = "reLaunch",
    'pushTab' = "switchTab",
    'back' = "navigateBack"
}
export declare enum rewriteMethodToggle {
    'navigateTo' = "push",
    'navigate' = "push",
    'redirectTo' = "replace",
    'reLaunch' = "replaceAll",
    'switchTab' = "pushTab",
    'navigateBack' = "back"
}
export declare type notCallProxyHookRule = 'onHide' | 'beforeDestroy' | 'destroyed' | 'onUnload' | 'onResize';
export declare type appVueSortHookRule = 'beforeCreate' | 'created' | 'beforeMount' | 'mounted' | 'onLaunch' | 'onShow' | 'onHide' | 'beforeDestroy' | 'destroyed';
export declare type indexVueSortHookRule = 'beforeCreate' | 'created' | 'beforeMount' | 'mounted' | 'onLoad' | 'onReady' | 'onShow' | 'onResize' | 'onHide' | 'beforeDestroy' | 'destroyed' | 'onUnload';
export declare type reNavMethodRule = 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab';
export declare type reNotNavMethodRule = 'navigateBack';
export declare type reloadNavRule = totalNextRoute | false | undefined | string;
export declare type hookListRule = Array<(router: Router, to: totalNextRoute, from: totalNextRoute, toRoute: RoutesRule) => hooksReturnRule>;
export declare type guardHookRule = (to: totalNextRoute, from: totalNextRoute, next: (rule?: navtoRule | false) => void) => void;
export declare type navRuleStatus = 0 | 1 | 2 | 3;
export declare type proxyHookName = 'beforeHooks' | 'afterHooks';
export declare type navMethodRule = Promise<void | undefined | navRuleStatus>;
export declare type hooksReturnRule = Promise<reloadNavRule>;
export declare type objectAny = {
    [propName: string]: any;
};
export declare type NAVTYPE = 'push' | 'replace' | 'replaceAll' | 'pushTab' | 'back';
export declare type startAnimationType = 'slide-in-right' | 'slide-in-left' | 'slide-in-top' | 'slide-in-bottom' | 'pop-in' | 'fade-in' | 'zoom-out' | 'zoom-fade-out' | 'none';
export declare type endAnimationType = 'slide-out-right' | 'slide-out-left' | 'slide-out-top' | 'slide-out-bottom' | 'pop-out' | 'fade-out' | 'zoom-in' | 'zoom-fade-in' | 'none';
export interface navtoRule {
    NAVTYPE?: NAVTYPE;
    path?: string;
    name?: string | undefined;
    query?: objectAny;
    params?: objectAny;
    animationType?: startAnimationType;
    animationDuration?: number;
    events?: objectAny;
    success?: Function;
    fail?: Function;
    complete?: Function;
}
export interface h5NextRule {
    fullPath?: string | undefined;
    hash?: string | undefined;
    matched?: Array<object>;
    meta?: object;
    name?: undefined | string;
    type?: undefined | string;
}
export interface totalNextRoute extends h5NextRule, navtoRule {
    path: string;
    [propName: string]: any;
}
export interface startAnimationRule {
    animationType?: startAnimationType;
    animationDuration?: number;
}
export interface endAnimationRule {
    animationType?: endAnimationType;
    animationDuration?: number;
}
export interface preloadPageRule {
    path: string;
    success?: Function;
    fail?: Function;
    complete?: Function;
}
export interface hookObjectRule {
    options: Array<any>;
    hook: Function;
}
export interface navErrorRule {
    type: navRuleStatus;
    msg: string;
    to?: totalNextRoute;
    from?: totalNextRoute;
    nextTo?: any;
    [propName: string]: any;
}
export interface uniNavApiRule {
    url: string;
    openType?: 'appLaunch';
    query?: objectAny;
    path?: string;
    detail?: {
        [propName: string]: any;
    };
    animationType?: startAnimationType;
    animationDuration?: number;
    events?: {
        [propName: string]: any;
    };
    success?: Function;
    fail?: Function;
    complete?: Function;
}
export interface uniBackRule {
    from: string;
}
export interface uniBackApiRule {
    delta?: number;
    animationDuration?: number;
    animationType?: endAnimationType;
}
export declare type routesMapKeysRule = 'finallyPathList' | 'finallyPathMap' | 'aliasPathMap' | 'pathMap' | 'nameMap' | 'vueRouteMap';
export interface routesMapRule {
    [key: string]: any;
    finallyPathList: Array<string>;
    finallyPathMap: RoutesRule;
    aliasPathMap: RoutesRule;
    pathMap: RoutesRule;
    nameMap: RoutesRule;
    vueRouteMap: objectAny;
}
export interface routeRule {
    name: string | undefined;
    meta: objectAny;
    path: string;
    query: objectAny;
    params: objectAny;
    fullPath: string;
    NAVTYPE: NAVTYPE | '';
    [propName: string]: any;
}
export interface RoutesRule {
    path: string;
    component?: object;
    name?: string;
    components?: object;
    redirect?: string | Function;
    props?: boolean | object | Function;
    aliasPath?: string;
    alias?: string | Array<string>;
    children?: Array<RoutesRule>;
    beforeEnter?: guardHookRule;
    meta?: any;
    [propName: string]: any;
}
export interface Router {
    [key: string]: any;
    readonly lifeCycle: LifeCycleConfig;
    readonly options: InstantiateConfig;
    $lockStatus: boolean;
    $route: object | null;
    appProxyHook: {
        app: appVueHookConfig;
    };
    appletsProxyHook: appletsVueHookConfig;
    routesMap: routesMapRule | {};
    mount: Array<{
        app: any;
        el: string;
    }>;
    install(Vue: any): void;
    push(to: totalNextRoute | string, from?: totalNextRoute): void;
    replace(to: totalNextRoute | string, from?: totalNextRoute): void;
    replaceAll(to: totalNextRoute | string, from?: totalNextRoute): void;
    pushTab(to: totalNextRoute | string, from?: totalNextRoute): void;
    back(level: number | undefined, origin?: uniBackRule | uniBackApiRule): void;
    forceGuardEach(navType: NAVTYPE | undefined): void;
    beforeEach(userGuard: guardHookRule): void;
    afterEach(userGuard: (to: totalNextRoute, from: totalNextRoute) => void): void;
}
//# sourceMappingURL=base.d.ts.map