import Vue from 'vue'
import App from './App'
import './common/navHold.js'


import {
	RouterMount,
	Router
} from './dist/uni-simple-router.js'

const router = new Router({
	platform: process.env.VUE_APP_PLATFORM,
	routes: [{
			aliasPath: '/',
			path: '/pages/index/index',
			name: 'index',
			style: {
				navigationBarTitleText: 'uni-app'
			},
			children: [{
				aliasPath: '/',
				path: '/pages/index/index',
				name: 'index',
				style: {
					navigationBarTitleText: 'uni-app'
				},
			}]
		},
		{
			path: '/pages/tab1/tab1',
			style: {
				navigationBarTitleText: '',
				enablePullDownRefresh: false
			},
		},
		{
			path: '/pages/tab2/tab2',
			style: {
				navigationBarTitleText: '',
				enablePullDownRefresh: false
			},
		},
	],
});

RouterMount()

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
