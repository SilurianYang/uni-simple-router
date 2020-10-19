import {InstantiateConfig, LifeCycleConfig} from '../options/config';

export enum navRuleStatus {
	'失败',
	'成功',
	'next拦截',
}
export type nextRouteT<T> = nextRoute & T;
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
	name?: string; // 跳转路径名称
	query?: object; // 跳转使用path时 query包含需要传递的参数
	params?: object; // 跳转使用name时 params包含需要传递的参数
    animationType?:startAnimationType;
    animationDuration?:number;
    events?:object;
    success?:Function;
    fail?:Function;
    complete?:Function;
}

export interface nextRoute {
	path: string;
	query: object;
	params: object;
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
	beforeEnter?: <T>(
		to: nextRouteT<T>,
		from: nextRouteT<T>,
		next: Function
	) => void; // 路由元守卫
	meta?: any; // 其他格外参数
	[propName: string]: any;
}

export interface Router {
	readonly lifeCycle: LifeCycleConfig;
	readonly options: InstantiateConfig;
	mount: Array<{app: any; el: string}>;
	install(Vue: any): void;
	push(rule: navtoRule | string): Promise<void | undefined | navRuleStatus>; // 动态的导航到一个新 URL 保留浏览历史
	replace(
		rule: navtoRule | string
	): Promise<void | undefined | navRuleStatus>; // 动态的导航到一个新 URL 关闭当前页面，跳转到的某个页面。
	replaceAll(
		rule: navtoRule | string
	): Promise<void | undefined | navRuleStatus>; // 动态的导航到一个新 URL 关闭所有页面，打开到应用内的某个页面
	pushTab(
		rule: navtoRule | string
	): Promise<void | undefined | navRuleStatus>; // 动态的导航到一个新 url 关闭所有页面，打开到应用内的某个tab
	beforeEach(guard: Function): void; // 添加全局前置路由守卫
	afterEach(guard: Function): void; // 添加全局后置路由守卫
}
