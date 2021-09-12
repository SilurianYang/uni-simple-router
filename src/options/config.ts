import {startAnimationRule, hookListRule, RoutesRule, navtoRule, navErrorRule, Router, objectAny, NAVTYPE, totalNextRoute, navRoute} from './base';

export type debuggerConfig=boolean|debuggerArrayConfig;
export type platformRule='h5'|'app-plus'|'app-lets'|'mp-weixin'|'mp-baidu'|'mp-alipay'|'mp-toutiao'|'mp-qq'|'mp-360';

export interface H5Config {
	paramsToQuery?: boolean; // h5端上通过params传参时规则是vue-router 刷新会丢失 开启此开关将变成?连接的方式
	vueRouterDev?: boolean; // 完全使用采用vue-router的开发模式
	vueNext?: boolean; // 在next管道函数中是否获取vueRouter next的原本参数
	mode?: string;
	base?: string;
	linkActiveClass?: string;
	linkExactActiveClass?: string;
	scrollBehavior?: Function;
	fallback?: boolean;
}
export interface AppConfig {
    registerLoadingPage?:boolean; // 是否注册过渡加载页  +v2.0.6
	loadingPageStyle?: () => object; // 当前等待页面的样式 必须返回一个json
    loadingPageHook?: (view:any)=>void; // 刚刚打开页面处于等待状态,会触发此函数
    launchedHook?:()=>void; // 首次启动app完成
    animation?: startAnimationRule; // 页面切换动画
}
export interface appletConfig {
    animationDuration?:number; // 页面切换时间，有助于路由锁精准解锁
}

type hookRule=(args:Array<any>, next:(args:Array<any>)=>void, router:Router)=>void;
export interface proxyHooksConfig{
    onLaunch?:hookRule;
    onShow?:hookRule;
    onHide?:hookRule;
    onError?:hookRule;
    onInit?:hookRule;
    onLoad?:hookRule;
    onReady?:hookRule;
    onUnload?:hookRule;
    onResize?:hookRule;
    destroyed?:hookRule;
    created?:hookRule;
    beforeCreate?:hookRule;
    beforeMount?:hookRule;
    mounted?:hookRule;
    beforeDestroy?:hookRule;
}

export interface debuggerArrayConfig{
    error?:boolean;
    warn?:boolean;
    log?:boolean;
}

export interface InstantiateConfig {
    [key:string]:any;
    keepUniOriginNav?:boolean; // 重写uni-app的跳转方法；关闭后使用uni-app的原始方法跳转和插件api跳转等同
    platform:platformRule; // 当前运行平台
    h5?: H5Config;
	APP?: AppConfig;
    applet?:appletConfig;
    beforeProxyHooks?:proxyHooksConfig;
	debugger?: debuggerConfig; // 是否处于开发阶段 设置为true则打印日志
	routerBeforeEach?: (to:navtoRule, from:navtoRule, next:(rule?: navtoRule|false)=>void) => void; // router 前置路由函数 每次触发跳转前先会触发此函数
	routerAfterEach?: (to:navtoRule, from:navtoRule, next?: Function) => void; // router 后置路由函数 每次触发跳转后会触发此函数
    routerErrorEach?: (error: navErrorRule, router:Router) => void;
    resolveQuery?:(jsonQuery:objectAny)=>objectAny; // 跳转之前把参数传递给此函数、返回最终的数据！有此函数不走默认方法
    parseQuery?:(jsonQuery:objectAny)=>objectAny; // 读取值之前把参数传递给此函数，返回最终的数据！有此函数不走默认方法
    detectBeforeLock?:(router:Router, to:string|number|totalNextRoute|navRoute, navType:NAVTYPE)=>void; // 在检测路由锁之前触发的函数
    routes: RoutesRule[];
}
export interface LifeCycleConfig{
    beforeHooks: hookListRule;
    afterHooks: hookListRule;
    routerBeforeHooks: hookListRule;
    routerAfterHooks: hookListRule;
    routerErrorHooks: Array<(error:navErrorRule, router:Router)=>void>;
}

