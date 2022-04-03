
export declare interface AppConfig {
    registerLoadingPage?: boolean;
    loadingPageStyle?: () => object;
    loadingPageHook?: (view: any) => void;
    launchedHook?: () => void;
    animation?: startAnimationRule;
}

export declare interface appletConfig {
    animationDuration?: number;
}

export declare function assertDeepObject(object: objectAny): boolean;

export declare function assertNewOptions<T extends InstantiateConfig>(options: T): T | never;

export declare function assertParentChild(parentPath: string, vueVim: any): boolean;

export declare type backTypeRule = 'backbutton' | 'navigateBack';

export declare function baseClone<T extends {
    [key: string]: any;
}, K extends keyof T>(source: T, target: Array<any> | objectAny): Array<any> | objectAny | null;

export declare function copyData<T>(object: T): T;

export declare function createRouter(params: InstantiateConfig): Router;

export declare interface debuggerArrayConfig {
    error?: boolean;
    warn?: boolean;
    log?: boolean;
}

export declare type debuggerConfig = boolean | debuggerArrayConfig;

export declare function deepClone<T>(source: T): T;

export declare function deepDecodeQuery(query: objectAny): objectAny;

export declare function def(defObject: objectAny, key: string, getValue: Function): void;

export declare interface endAnimationRule {
    animationType?: endAnimationType;
    animationDuration?: number;
}

export declare type endAnimationType = 'slide-out-right' | 'slide-out-left' | 'slide-out-top' | 'slide-out-bottom' | 'pop-out' | 'fade-out' | 'zoom-in' | 'zoom-fade-in' | 'none';

export declare function forMatNextToFrom<T extends totalNextRoute>(router: Router, to: T, from: T): {
    matTo: T;
    matFrom: T;
};

export declare function getDataType<T>(data: T): string;

export declare function getRoutePath(route: RoutesRule, router: Router): {
    finallyPath: string | string[];
    aliasPath: string;
    path: string;
    alias: string | string[] | undefined;
};

export declare function getUniCachePage<T extends objectAny>(pageIndex?: number): T | [];

export declare function getWildcardRule(router: Router, msg?: navErrorRule): RoutesRule | never;

export declare type guardHookRule = (to: totalNextRoute, from: totalNextRoute, next: (rule?: navtoRule | false) => void) => void;

export declare interface H5Config {
    paramsToQuery?: boolean;
    vueRouterDev?: boolean;
    vueNext?: boolean;
    mode?: string;
    base?: string;
    linkActiveClass?: string;
    linkExactActiveClass?: string;
    scrollBehavior?: Function;
    fallback?: boolean;
}

export declare interface h5NextRule {
    fullPath?: string | undefined;
    hash?: string | undefined;
    matched?: Array<object>;
    meta?: object;
    name?: undefined | string;
    type?: undefined | string;
}

export declare type hookListRule = Array<(router: Router, to: totalNextRoute, from: totalNextRoute, toRoute: RoutesRule, next: Function) => void>;

export declare interface hookObjectRule {
    options: Array<any>;
    hook: Function;
}

declare type hookRule = (args: Array<any>, next: (args: Array<any>) => void, router: Router) => void;

export declare enum hookToggle {
    'beforeHooks' = "beforeEach",
    'afterHooks' = "afterEach",
    'enterHooks' = "beforeEnter"
}

export declare interface InstantiateConfig {
    [key: string]: any;
    keepUniOriginNav?: boolean;
    platform: platformRule;
    h5?: H5Config;
    APP?: AppConfig;
    applet?: appletConfig;
    beforeProxyHooks?: proxyHooksConfig;
    debugger?: debuggerConfig;
    routerBeforeEach?: (to: navtoRule, from: navtoRule, next: (rule?: navtoRule | false) => void) => void;
    routerAfterEach?: (to: navtoRule, from: navtoRule, next?: Function) => void;
    routerErrorEach?: (error: navErrorRule, router: Router) => void;
    resolveQuery?: (jsonQuery: objectAny) => objectAny;
    parseQuery?: (jsonQuery: objectAny) => objectAny;
    detectBeforeLock?: (router: Router, to: string | number | totalNextRoute | navRoute, navType: NAVTYPE) => void;
    routes: RoutesRule[];
}

export declare interface LifeCycleConfig {
    beforeHooks: hookListRule;
    afterHooks: hookListRule;
    routerBeforeHooks: hookListRule;
    routerAfterHooks: hookListRule;
    routerErrorHooks: Array<(error: navErrorRule, router: Router) => void>;
}

export declare function lockDetectWarn(router: Router, to: string | number | totalNextRoute | navRoute, navType: NAVTYPE, next: Function, uniActualData?: uniBackApiRule | uniBackRule | undefined, passiveType?: 'beforeHooks' | 'afterHooks'): void;

export declare function mergeConfig<T extends InstantiateConfig>(baseConfig: T, userConfig: T): T;

export declare interface navErrorRule {
    type: navRuleStatus;
    msg: string;
    to?: totalNextRoute;
    from?: totalNextRoute;
    nextTo?: any;
    [propName: string]: any;
}

export declare type navMethodRule = Promise<void | undefined | navRuleStatus>;

export declare interface navRoute extends h5NextRule, navtoRule {
}

export declare type navRuleStatus = 0 | 1 | 2 | 3;

export declare interface navtoRule {
    NAVTYPE?: NAVTYPE;
    path?: string;
    name?: string | undefined;
    query?: objectAny;
    params?: objectAny;
    animationType?: startAnimationType | endAnimationType;
    animationDuration?: number;
    events?: objectAny;
    success?: Function;
    fail?: Function;
    complete?: Function;
}

export declare type NAVTYPE = 'push' | 'replace' | 'replaceAll' | 'pushTab' | 'back';

export declare enum navtypeToggle {
    'push' = "navigateTo",
    'replace' = "redirectTo",
    'replaceAll' = "reLaunch",
    'pushTab' = "switchTab",
    'back' = "navigateBack"
}

export declare function notDeepClearNull<T>(object: T): T;

export declare function notRouteTo404(router: Router, toRoute: RoutesRule | {
    redirect: any;
    path: string;
}, parseToRule: totalNextRoute, navType: NAVTYPE): RoutesRule | totalNextRoute | never;

export declare type objectAny = {
    [propName: string]: any;
};

export declare interface originMixins extends uniNavApiRule {
    BACKTYPE: '' | backTypeRule;
}

export declare type pageTypeRule = 'app' | 'page' | 'component';

export declare function paramsToQuery(router: Router, toRule: totalNextRoute | string): totalNextRoute | string;

export declare type platformRule = 'h5' | 'app-plus' | 'app-lets' | 'mp-weixin' | 'mp-baidu' | 'mp-alipay' | 'mp-toutiao' | 'mp-qq' | 'mp-360';

export declare type PromiseResolve = (value?: void | PromiseLike<void> | undefined) => void;

export declare type proxyDepsRule = {
    resetIndex: Array<number>;
    hooks: {
        [key: number]: {
            proxyHook: () => void;
            callHook: (enterPath: string) => void;
            resetHook: () => void;
        };
    };
    options: {
        [key: number]: Array<any>;
    };
};

export declare type proxyHookName = 'beforeHooks' | 'afterHooks';

export declare interface proxyHooksConfig {
    onLaunch?: hookRule;
    onShow?: hookRule;
    onHide?: hookRule;
    onError?: hookRule;
    onInit?: hookRule;
    onLoad?: hookRule;
    onReady?: hookRule;
    onUnload?: hookRule;
    onResize?: hookRule;
    destroyed?: hookRule;
    created?: hookRule;
    beforeCreate?: hookRule;
    beforeMount?: hookRule;
    mounted?: hookRule;
    beforeDestroy?: hookRule;
}

export declare type reloadNavRule = totalNextRoute | false | undefined | string;

export declare function removeSimpleValue(array: Array<string | number>, value: string): Boolean;

export declare type reNavMethodRule = 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab';

export declare type reNotNavMethodRule = 'navigateBack';

export declare function resolveAbsolutePath(path: string, router: Router): string | never;

export declare enum rewriteMethodToggle {
    'navigateTo' = "push",
    'navigate' = "push",
    'redirectTo' = "replace",
    'reLaunch' = "replaceAll",
    'switchTab' = "pushTab",
    'navigateBack' = "back"
}

export declare interface Router {
    readonly lifeCycle: LifeCycleConfig;
    readonly options: InstantiateConfig;
    $lockStatus: boolean;
    $route: object | null;
    enterPath: string;
    runId: number;
    Vue: any;
    appMain: {
        NAVTYPE: reNavMethodRule | reNotNavMethodRule;
        path: string;
    } | {};
    proxyHookDeps: proxyDepsRule;
    routesMap: routesMapRule | {};
    mount: Array<{
        app: any;
        el: string;
    }>;
    install(Vue: any): void;
    push(to: totalNextRoute | navRoute | string, from?: totalNextRoute): void;
    replace(to: totalNextRoute | navRoute | string, from?: totalNextRoute): void;
    replaceAll(to: totalNextRoute | navRoute | string, from?: totalNextRoute): void;
    pushTab(to: totalNextRoute | navRoute | string, from?: totalNextRoute): void;
    back(level: number | undefined, origin?: uniBackRule | uniBackApiRule): void;
    forceGuardEach(navType: NAVTYPE | undefined, forceNav: boolean): void;
    beforeEach(userGuard: guardHookRule): void;
    afterEach(userGuard: (to: totalNextRoute, from: totalNextRoute) => void): void;
}

export declare function RouterMount(Vim: any, router: Router, el?: string | undefined): void | never;

export declare interface routeRule {
    name: string | undefined;
    meta: objectAny;
    path: string;
    query: objectAny;
    params: objectAny;
    fullPath: string;
    NAVTYPE: NAVTYPE | '';
    BACKTYPE?: backTypeRule | '';
    [propName: string]: any;
}

export declare function routesForMapRoute(router: Router, path: string, mapArrayKey: Array<routesMapKeysRule>, deepFind?: boolean | undefined): RoutesRule | never;

export declare type routesMapKeysRule = 'finallyPathList' | 'finallyPathMap' | 'aliasPathMap' | 'pathMap' | 'nameMap' | 'vueRouteMap';

export declare interface routesMapRule {
    [key: string]: any;
    finallyPathList: Array<string>;
    finallyPathMap: RoutesRule;
    aliasPathMap: RoutesRule;
    pathMap: RoutesRule;
    nameMap: RoutesRule;
    vueRouteMap: objectAny;
}

export declare interface RoutesRule {
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

export declare function runtimeQuit(title?: string | undefined): void;

export declare interface startAnimationRule {
    animationType?: startAnimationType;
    animationDuration?: number;
}

export declare type startAnimationType = 'slide-in-right' | 'slide-in-left' | 'slide-in-top' | 'slide-in-bottom' | 'pop-in' | 'fade-in' | 'zoom-out' | 'zoom-fade-out' | 'none';

export declare function timeOut(time: number): Promise<void>;

export declare interface totalNextRoute extends h5NextRule, navtoRule {
    path: string;
    delta?: number;
    [propName: string]: any;
}

export declare interface uniBackApiRule {
    delta?: number;
    animationDuration?: number;
    animationType?: endAnimationType;
}

export declare interface uniBackRule {
    from: backTypeRule;
}

export declare interface uniNavApiRule {
    url: string;
    openType?: 'appLaunch';
    query?: objectAny;
    path?: string;
    delta?: number;
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
    animation?: {
        animationType?: startAnimationType;
        animationDuration?: number;
    };
}

export declare function urlToJson(url: string): {
    path: string;
    query: objectAny;
};

export declare function voidFun(...args: any): void;

export declare type vueHookNameRule = 'onLaunch' | 'onShow' | 'onHide' | 'onError' | 'onInit' | 'onLoad' | 'onReady' | 'onUnload' | 'onResize' | 'created' | 'beforeMount' | 'mounted' | 'beforeDestroy' | 'destroyed';

export declare type vueOptionRule = {
    [propName in vueHookNameRule]: Array<Function> | undefined;
};

export { }

// @ts-ignore
declare module 'vue/types/vue' {
    interface Vue {
        $Router: Router;
        $Route: routeRule;
    }
}
    