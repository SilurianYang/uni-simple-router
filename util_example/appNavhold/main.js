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

// #ifdef H5
RouterMount(app,router,'#app')
// #endif

// #ifndef H5
RouterMount(app,router,'#app')
// #endif
