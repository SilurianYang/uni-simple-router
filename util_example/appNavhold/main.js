import Vue from 'vue'
import App from './App'

console.log(process.env)

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
		if(to.name=='page2'){
			// return next({
			// 	name:'tab2',
			// 	NAVTYPE:'replaceAll',
			// 	params:{
			// 		msg:'拦截page2到tab2',
			// 		...to.query
			// 	}
			// })
		}
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
		aliasCoverPath:true,
		paramsToQuery: true,
		     parseQuery (query) {
			console.log(query)
			return ''
		     },      //object->string
		//     stringifyQuery (obj) {
		// 		debugger
		// console.log(obj)
		//      }
		
	},
	debugger:true,
	routes: [{
			path: '/pages/index/index',
			alias:'/',
			name: 'index',
			style: {
				navigationBarTitleText: 'uni-app'
			},
			  beforeEnter: (to, from, next) => {
				console.log('-------------------------beforeEnter-------------------------------------')
				console.log(to);
				console.log(from);
				console.log('-------------------------beforeEnter结束-------------------------------------')
				next();
			  },
			children: [{
				path: '/pages/index/index',
				name: 'index',
				style: {
					navigationBarTitleText: 'uni-app'
				},
			}]
		},
		{
			path: '/pages/tab1/tab1',
			alias:'/tab1',
			name: 'tab1',
			style: {
				navigationBarTitleText: '',
				enablePullDownRefresh: false
			},
		},
		{
			path: '/pages/tab2/tab2',
			alias:'/tab2',
			name:'tab2',
			style: {
				navigationBarTitleText: '',
				enablePullDownRefresh: false
			},
		},
		{
			path:'/pages/page2/page2',
			name:'page2',
			alias:'/pages/:name',
		},
		{
			path:'/pages/page3/page3',
			name:'page3'
		},
		// {
		// 	path:'*',
		// 	redirect:to=>{
		// 		if(whitelist[to]){
		// 			return {
		// 				name:whitelist[to]
		// 			}
		// 		}
		// 	}
		// }
	],
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

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})

RouterMount(app,router,'#app')

// app.$mount()
