
import {warn,err} from '../helpers/warn.js'
import {diffRouter} from './util.js'
import {
	builtIn,
} from './base.js'
/**
 * vueAfter 生命周期
 * @param {Object} to
 * @param {Object} from
 */
export const afterHooks = function(to, from) {

}
/**
 * vueBefore 生命周期
 * @param {Object} to
 * @param {Object} from
 * @param {Object} next
 */
export const beforeHooks = function(to, from, next) {
	console.log(to)
	console.log(from)
	this.vueLifeHooks.beforeHooks[0](to, from, (res) => {
		if(res!==null){
			warn(`uni-app 内部强制触发跳转拦截`)
		}
		next(res);
	})
}
/** 注册自定义的路由到vue-router中 前提是必须使用vueRouter开发模式
 * @param {Object} Router
 * @param {Object} vueRouter
 * @param {Boolean} vueRouterDev
 */
export const registerRouter=function (Router, vueRouter,vueRouterDev) {
	if(vueRouterDev){	//完全采用用户自定义的路由表
		diffRouter(Router,vueRouter,Router.CONFIG.h5.useUniConfig);
	}
	return false
	const createRouter = () => new vueRouter.constructor({
		...Router.CONFIG.h5,
		routes: [
			{
				path: '/404',
				name: '404',
				component: {
					render: (createElement) => {
						debugger
						return createElement('Page', {
								props: (0,
									_assign.default)({},
									__uniConfig.globalStyle, {})
							},
							[createElement('pages-test-404', {
								slot: 'page'
							})]);

					}
					// render:(fun)=>{
					// 	console.log(fun)
					// 	console.log(84848)
					// 	return import('@/pages/test/404.vue')
					// }
				},
				// beforeEnter:function(to,from,next){
				// 	setTimeout(function() {
				// 		next();
				// 	}, 2000);
				// }
			},
			{
				path: '*',
				redirect: {
					name: '404'
				}
			}
		]
	});
	const router = createRouter();
	vueRouter.matcher = router.matcher;
	// console.log(router)


	vueRouter.addRoutes([{
			path: '/router1',
			component: {
				render:(h)=>{
					console.log(h)
					return import('@/pages/router/router1/router1.vue')
				}
			}
		}

	])
	//console.log(Router)
	console.log(vueRouter)
}
