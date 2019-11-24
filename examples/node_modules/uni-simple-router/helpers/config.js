export const baseConfig = {
	h5: {
		paramsToQuery: false, //h5端上通过params传参时规则是vue-router 刷新会丢失 开启此开关将变成?连接的方式
		loading: true, //是否显示加载动画
		hinderTab: false, //是否拦截uni-app自带底部菜单   TODO
		vueRouterDev: false, //完全使用采用vue-router的开发模式
		useUniConfig: true, //是否采用在pages.json下的所有页面配置信息,false时需开发者自行设置页面
		keepUniIntercept: false, //保留uni-app使用vue-router的拦截器
		vueNext: false, //在next管道函数中是否获取vueRouter next的原本参数
		replaceStyle: false, //是否对resetStyle函数中返回的style节点进行全部替换，否则为追加
		resetStyle: () => JSON.parse('{}'), //自定义加载样式函数 可返回一个包涵 html、style、script 的对象来重置Router内置的加载动画
		mode: 'hash',
		base: '/',
		linkActiveClass: 'router-link-active',
		linkExactActiveClass: 'router-link-exact-active',
		scrollBehavior: (to, from, savedPostion) => savedPostion,
		fallback: true,
	},
	debugger: false, //是否处于开发阶段 设置为true则打印日志
	encodeURI: true, //是否对url传递的参数进行编码
	routerBeforeEach: () => {}, //router 前置路由函数 每次触发跳转前先会触发此函数
	routerAfterEach: () => {}, //router 后置路由函数 每次触发跳转后会触发此函数
	routes: [],
}
export const methods = {
	push: "navigateTo",
	replace: "redirectTo",
	replaceAll: "reLaunch",
	pushTab: "switchTab",
	back: "navigateBack"
};
export const lifeCycle = {
	beforeHooks: [],
	afterHooks: [],
	routerHooks: [],
	routerbeforeHooks: [], //内部跳转前生命周期
	routerAfterHooks: [], //内部跳转后生命周期
};

export const Global = { //缓存一些必要的对象，作为全局可以访问的参数
	Router: {},
	vueRouter: {},
	addedRoutes: [], //用于缓存用户动态添加的路由
	RouterReadyPromise: () => {},
	H5RouterReady: null //当前router是否就绪
}

export const route = function(object = {}) {
	return {
		...object,
		params: {},
		query: {}
	};
};
