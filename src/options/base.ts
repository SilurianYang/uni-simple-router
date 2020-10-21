import {InstantiateConfig, LifeCycleConfig} from '../options/config';

export type navRuleStatus=	'失败'|'成功'|'next拦截';
export type navMethodRule = Promise<void | undefined | navRuleStatus>;
export type hooksReturnRule = Promise<navtoRule | false | undefined>;
export type NAVTYPE = 'push' | 'replace' | 'replaceAll' | 'pushTab';
export type startAnimationType =
	| 'slide-in-right'
	| 'slide-in-left'
	| 'slide-in-top'
	| 'slide-in-bottom'
	| 'pop-in'
	| 'fade-in'
	| 'zoom-out'
	| 'zoom-fade-out'
	| 'none';
export type endAnimationType =
	| 'slide-out-right'
	| 'slide-out-left'
	| 'slide-out-top'
	| 'slide-out-bottom'
	| 'pop-out'
	| 'fade-out'
	| 'zoom-in'
	| 'zoom-fade-in'
	| 'none';

// 跳转api时，传递的跳转规则
export interface navtoRule {
	NAVTYPE?: NAVTYPE; // 跳转类型 v1.1.0+
	path?: string; // 跳转路径 绝对路径
	name?: string | undefined; // 跳转路径名称
	query?: {[propName: string]: any}; // 跳转使用path时 query包含需要传递的参数
	params?: {[propName: string]: any}; // 跳转使用name时 params包含需要传递的参数
	animationType?: startAnimationType;
	animationDuration?: number;
	events?: {[propName: string]: any};
	success?: Function;
	fail?: Function;
	complete?: Function;
}
// h5 next管道函数中传递的from及to对象
export interface h5NextRule {
	fullPath?: string | undefined;
	hash?: string | undefined;
	matched?: Array<object>;
	meta?: object;
	name?: undefined | string;
	type?: undefined | string;
}
// 非H5端基本的next管道函数from及to对象
export interface notH5NextRoute {
	path: string;
	query: {[propName: string]: any};
	params: {[propName: string]: any};
}

export interface totalNextRoute extends h5NextRule, notH5NextRoute {
	[propName: string]: any;
}

// 开始切换窗口动画 app端可用
export interface startAnimationRule {
	animationType?: startAnimationType; // 窗口关闭的动画效果
	animationDuration?: number; // 窗口关闭动画的持续时间
}
// 关闭窗口时的动画 app端可用
export interface endAnimationRule {
	animationType?: endAnimationType; // 窗口关闭的动画效果
	animationDuration?: number; // 窗口关闭动画的持续时间
}
// 执行路由跳转失败或者 next(false) 时走的规则
export interface navErrorRule {
	type: navRuleStatus;
	msg: string;
}
// uni原生api跳转时的规则
export interface uniNavApiRule {
	url: string;
	[propName: string]: any;
}
export interface routesMapRule{
    finallyPathList: Array<string>;
    finallyPathMap:RoutesRule;
    aliasPathMap: RoutesRule;
    pathMap: RoutesRule;
    vueRouteMap:{
        [propName: string]:any
    }
}

export interface RoutesRule {
	path: string; // pages.json中的path 必须加上 '/' 开头
	component?: object; // H5端可用
	name?: string; // 命名路由
	components?: object; // 命名视图组件，H5端可用
	redirect?: string | Location | Function; // H5端可用
	props?: boolean | object | Function; // H5端可用
	aliasPath?: string; // h5端 设置一个别名路径来替换 uni-app的默认路径
	alias?: string | Array<string>; // H5端可用
	children?: Array<RoutesRule>; // 嵌套路由，H5端可用
	beforeEnter?: (
		to: totalNextRoute,
		from: totalNextRoute,
		next: Function
	) => void; // 路由元守卫
	meta?: any; // 其他格外参数
	[propName: string]: any;
}

export interface Router {
	readonly lifeCycle: LifeCycleConfig;
	readonly options: InstantiateConfig;
	$route: object | null;
	routesMap: routesMapRule|{};
	mount: Array<{app: any; el: string}>;
	install(Vue: any): void;
	push(rule: navtoRule | string): navMethodRule; // 动态的导航到一个新 URL 保留浏览历史
	replace(rule: navtoRule | string): navMethodRule; // 动态的导航到一个新 URL 关闭当前页面，跳转到的某个页面。
	replaceAll(rule: navtoRule | string): navMethodRule; // 动态的导航到一个新 URL 关闭所有页面，打开到应用内的某个页面
	pushTab(rule: navtoRule | string): navMethodRule; // 动态的导航到一个新 url 关闭所有页面，打开到应用内的某个tab
	beforeEach(guard: Function): void; // 添加全局前置路由守卫
	afterEach(guard: Function): void; // 添加全局后置路由守卫
}
