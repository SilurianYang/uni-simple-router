
import {warn,err} from '../helpers/warn.js'
import {diffRouter} from './util.js'
import {
	builtIn,
	vuelifeHooks
} from './base.js'
/**
 * vueAfter 生命周期
 * @param {Object} to
 * @param {Object} from
 */
export const afterHooks = function(to, from) {
	console.log(from)
}
/**
 * vueBefore 生命周期
 * @param {Object} to
 * @param {Object} from
 * @param {Object} next
 */
export const beforeHooks = function(to, from, next) {
	console.log(to)
	vuelifeHooks.beforeHooks[0](to, from, (res) => {
		// if(res!=null){
		// 	console.log(res)
		// 	warn(`uni-app 内部强制触发跳转拦截`)
		// }
		next()
	})
}
/** 注册自定义的路由到vue-router中 前提是必须使用vueRouter开发模式
 * @param {Object} Router
 * @param {Object} vueRouter
 * @param {Boolean} vueRouterDev
 */
export const registerRouter=function (Router, vueRouter,vueRouterDev) {
	let routeMap=[];
	if(vueRouterDev){	//完全采用用户自定义的路由表
		routeMap=diffRouter(Router,vueRouter,Router.CONFIG.h5.useUniConfig);
	}
	//console.log(Router.CONFIG.h5)
	console.log(routeMap)
	const createRouter = () => new vueRouter.constructor({
		base:'/h5/',
		mode: "hash",
		routes: [
			...routeMap,
			{
				path: '*',
				redirect: {
					name: '404'
				}
			}
		]
	});
	const router = createRouter();

	// router.app=vueRouter.app;
	// router.apps=vueRouter.apps

	vueRouter.matcher = router.matcher;

	console.log(router)


	vueRouter.addRoutes([
		{
			path: '*',
			redirect: {
				name: '404'
			}
		}
	])
	//console.log(Router)
	console.log(vueRouter)
}
