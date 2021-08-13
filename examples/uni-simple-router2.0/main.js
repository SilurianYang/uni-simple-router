import Vue from 'vue'
import App from './App'
import {router, RouterMount} from './router.js'
import routerLInk from './dist/link.vue'
Vue.component('RouterLink1', routerLInk)

Vue.use(router)

// import VConsole from 'vconsole'
// var vConsole = new VConsole();

App.mpType = 'app'

// Vue.mixin({
// 	onShow(){
// 		if(this._uid!=0){
// 			router.forceGuardEach()
// 		}
// 	}
// })

const app = new Vue({
    ...App
})

// v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount(); // 为了兼容小程序及app端必须这样写才有效果
// #endif
