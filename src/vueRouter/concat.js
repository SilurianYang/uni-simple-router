
import warn from '../helpers/warn.js'
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

export const diffRouter=function (Router,vueRouter,useAll){
	const newRouterMap = [];
	
	vueRouter.options.routes.forEach(((item, index) => {
		if(useUniConfig){
				const path=item.path==='/'?item.alias:item.path;
				const vueRoute= Router.vueRoutes[path];
				const selfRoute=Router.selfRoutes[path];
				if(selfRoute==null){
					warn(`读取 ‘pages.json’ 中页面配置错误。实例化时传递的路由表中未找到路径为：${path}`)
				}
		}
			if (item.meta && item.meta.isTabBar) {
				constantRouterMap.push(item)
			}
		debugger
	}))
}
/** 注册自定义的路由到vue-router中 前提是必须使用vueRouter开发模式
 * @param {Object} Router
 * @param {Object} vueRouter
 * @param {Boolean} vueRouterDev
 */
export const registerRouter=function (Router, vueRouter,vueRouterDev) {
	if(vueRouterDev){
		//diffRouter(Router,vueRouter);
	}
	const createRouter = () => new vueRouter.constructor({
		...Router.CONFIG.h5,
		routes: [
			{
				path: '/404',
				name: '404',
				component: {
					render: (createElement) => {
						return createElement('Page', {
								props: (0,
									Object.assign)({},
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
			component: () => import('@/pages/router/router1/router1.vue')
		}

	])
	//console.log(Router)
	console.log(vueRouter)
}
