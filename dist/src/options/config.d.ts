import { startAnimationRule, hookListRule, RoutesRule, navtoRule, navErrorRule, Router, objectAny, hookObjectRule, NAVTYPE, totalNextRoute } from './base';
export declare type debuggerConfig = boolean | debuggerArrayConfig;
export interface H5Config {
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
export interface AppConfig {
    loddingPageStyle?: () => object;
    loddingPageHook?: (view: any) => void;
    launchedHook?: () => void;
    animation?: startAnimationRule;
}
export interface debuggerArrayConfig {
    error?: boolean;
    warn?: boolean;
    log?: boolean;
}
export interface InstantiateConfig {
    [key: string]: any;
    keepUniOriginNav: boolean;
    platform: 'h5' | 'app-plus' | 'app-lets' | 'mp-weixin' | 'mp-baidu' | 'mp-alipay' | 'mp-toutiao' | 'mp-qq' | 'mp-360';
    h5?: H5Config;
    APP?: AppConfig;
    debugger?: debuggerConfig;
    routerBeforeEach?: (to: navtoRule, from: navtoRule, next: (rule?: navtoRule | false) => void) => void;
    routerAfterEach?: (to: navtoRule, from: navtoRule, next?: Function) => void;
    routerErrorEach?: (error: navErrorRule, router: Router) => void;
    resolveQuery?: (jsonQuery: objectAny) => objectAny;
    parseQuery?: (jsonQuery: objectAny) => objectAny;
    detectBeforeLock?: (router: Router, to: string | number | totalNextRoute, navType: NAVTYPE) => void;
    routes: RoutesRule[];
}
export interface LifeCycleConfig {
    beforeHooks: hookListRule;
    afterHooks: hookListRule;
    routerBeforeHooks: hookListRule;
    routerAfterHooks: hookListRule;
    routerErrorHooks: Array<(error: navErrorRule, router: Router) => void>;
}
export interface baseAppHookConfig {
    [key: string]: Array<hookObjectRule | Function>;
    beforeCreate: Array<hookObjectRule | Function>;
    created: Array<hookObjectRule | Function>;
    beforeMount: Array<hookObjectRule | Function>;
    mounted: Array<hookObjectRule | Function>;
    onShow: Array<hookObjectRule | Function>;
    onHide: Array<hookObjectRule | Function>;
    beforeDestroy: Array<hookObjectRule | Function>;
    destroyed: Array<hookObjectRule | Function>;
}
export interface appVueHookConfig extends baseAppHookConfig {
    onLaunch: Array<hookObjectRule | Function>;
}
export interface indexVueHookConfig extends baseAppHookConfig {
    onLoad: Array<hookObjectRule | Function>;
    onReady: Array<hookObjectRule | Function>;
    onUnload: Array<hookObjectRule | Function>;
    onResize: Array<hookObjectRule | Function>;
}
export interface appletsVueHookConfig {
    app: appVueHookConfig;
    index: indexVueHookConfig;
}
