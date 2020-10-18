import {startAnimationRule, RoutesRule, navtoRule, navErrorRule} from './base';

export interface h5Config {
	rewriteFun?: boolean; // 是否对uni-app reLaunch/navigateBack 两个方法重写 处理uni刷新直接返回到首页和触发路由守卫
	paramsToQuery?: boolean; // h5端上通过params传参时规则是vue-router 刷新会丢失 开启此开关将变成?连接的方式
	loading?: boolean; // 是否显示加载动画
	vueRouterDev?: boolean; // 完全使用采用vue-router的开发模式
	useUniConfig?: boolean; // 是否采用在pages.json下的所有页面配置信息,false时需开发者自行设置页面
	keepUniIntercept?: boolean; // 保留uni-app使用vue-router的拦截器
	vueNext?: boolean; // 在next管道函数中是否获取vueRouter next的原本参数
	replaceStyle?: boolean; // 是否对resetStyle函数中返回的style节点进行全部替换，否则为追加
	resetStyle?: Function; // 自定义加载样式函数 可返回一个包涵 html、style、script 的对象来重置Router内置的加载动画
	mode?: string;
	base?: string;
	linkActiveClass?: string;
	linkExactActiveClass?: string;
	scrollBehavior?: Function;
	fallback?: boolean;
}
export interface AppConfig {
	holdTabbar?: boolean; // 是否开启底部菜单拦截
	loddingPageStyle?: () => object; // 当前等待页面的样式 必须返回一个json
	loddingPageHook?: Function; // 刚刚打开页面处于等待状态,会触发此事件
	animation?: startAnimationRule; // 页面切换动画
}

export interface InstantiateConfig {
    platform:string; // 当前运行平台
	h5?: h5Config;
	APP?: AppConfig;
	debugger?: boolean; // 是否处于开发阶段 设置为true则打印日志
	encodeURI?: boolean; // 是否对url传递的参数进行编码
	routerBeforeEach?: (rule: navtoRule, next: Function) => void; // router 前置路由函数 每次触发跳转前先会触发此函数
	routerAfterEach?: (rule: navtoRule) => void; // router 后置路由函数 每次触发跳转后会触发此函数
	routerErrorEach?: (error: navErrorRule) => void;
	routes: RoutesRule[];
}
