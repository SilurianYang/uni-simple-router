import Vue from 'vue'
import App from './App'
// import '@/common/navHold.js'

import {RouterMount,Router} from './dist/uni-simple-router.js'

console.log(RouterMount)

console.log(process.env.VUE_APP_PLATFORM)

const router= new Router();
console.log(router)


Vue.config.productionTip = false
	
App.mpType = 'app'

const app = new Vue({
    ...App
})
console.log(app)
// app.$mount()
