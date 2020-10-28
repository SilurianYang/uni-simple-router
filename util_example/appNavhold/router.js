import Vue from 'vue'


import {vueDevRoutes} from './common/vueRouterDev_true/vueRouterDev'
import {namalRoutes} from './common/vueRouterDev_true/nomalRoutes'

import {
	RouterMount,
	createRouter
} from './dist/uni-simple-router.js'


const whitelist={
		'/': 'index',
		'/pages/tab1/tab1': 'tab1',
		'/pages/tab2/tab2': 'tab2',
}

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routerBeforeEach: (to, from, next) => {
		console.log('-------------------------routerBeforeEach-------------------------------------')
		console.log(to)
		console.log(from);
		console.log('-------------------------routerBeforeEach结束-------------------------------------')
		// if(to.name=='page2'){
		// 	return next({
		// 		name:'tab2',
		// 		NAVTYPE:'replaceAll',
		// 		success:()=>{
		// 			alert('跳转成功')
		// 		},
		// 		params:{
		// 			msg:'拦截page2到tab2',
		// 			list:[1,2,4,5],
		// 			...to.query
		// 		}
		// 	})
		// }
		next()
	},
	routerAfterEach: (to, from) => {
		console.log('-------------------------routerAfterEach-------------------------------------')
		console.log(to)
		console.log(from);
		console.log('-------------------------routerAfterEach结束-------------------------------------')
	},
	APP:{
		animation:{
			animationDuration:1000
		}
	},
	h5:{
		paramsToQuery: true,
	},
	debugger:true,
	routes: namalRoutes
});
router.beforeEach((to, from, next) => {
	console.log('-------------------------beforeEach-------------------------------------')
	console.log(to)
	console.log(from)
	console.log('-------------------------beforeEach结束-------------------------------------')
	next();
})
router.afterEach((to, from) => {
	console.log('-------------------------afterEach-------------------------------------')
	  console.log(to)
	  console.log(from)
	  console.log('-------------------------afterEach结束-------------------------------------')
})
console.log(router)

Vue.use(router);

export {
	router,
	RouterMount
}