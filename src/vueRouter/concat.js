
import warn from '../helpers/warn.js'
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
			warn(`uni-app 内部强制触发跳转`)
		}
		next(res);
	})
}

function diffRouter(){
	
}

function registerHook(Router, vueRouter) {
	const constantRouterMap = [];
	vueRouter.options.routes.forEach(((item, index) => {
		if (item.meta && item.meta.isTabBar) {
			constantRouterMap.push(item)
		}
	}))

	const createRouter = () => new vueRouter.constructor({
		mode: vueRouter.mode,
		base: './',
		routes: [...constantRouterMap,
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
