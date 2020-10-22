import Vue from 'vue'
import App from './App'
import './common/navHold.js'

console.log(process.env)

import {
	RouterMount,
	createRouter
} from './dist/uni-simple-router.js'

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,
	routerBeforeEach: (to, from, next) => {
		console.log('-------------------------routerBeforeEach-------------------------------------')
		console.log(to)
		console.log(from);
		next()
	},
	routerAfterEach: (to, from) => {
		console.log('-------------------------routerAfterEach-------------------------------------')
		console.log(to)
		console.log(from);
	},
	APP:{
		animation:{
			animationDuration:1000
		}
	},
	h5:{
		aliasCoverPath:true
	},
	routes: [{
			path: '/pages/index/index',
			alias:'/index',
			name: 'index',
			style: {
				navigationBarTitleText: 'uni-app'
			},
			  beforeEnter: (to, from, next) => {
				console.log(to, from);
				setTimeout(()=>{
					next();
				},2000)
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
			style: {
				navigationBarTitleText: '',
				enablePullDownRefresh: false
			},
		},
		{
			path: '/pages/tab2/tab2',
			alias:'/tab2',
			style: {
				navigationBarTitleText: '',
				enablePullDownRefresh: false
			},
		},
		{
			path:'/pages/page2/page2',
			alias:'/pages/:name',
		},
		{
			path:'*',
			redirect:to=>{
				console.log(to)
				return '/index'
			}
		}
	],
});
router.beforeEach((to, from, next) => {
	console.log(to,from)
})
router.afterEach((to, from) => {
  console.log(to,from)
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
