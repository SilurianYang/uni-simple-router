import Vue from 'vue'
import App from './App'

import {	
	router,
	RouterMount
} from './router'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})

// #ifdef APP-PLUS|H5
RouterMount(app,router,'#app')
// #endif

// #ifndef APP-NVUE|H5
app.$mount();
// #endif