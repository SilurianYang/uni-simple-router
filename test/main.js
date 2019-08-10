import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import router from './common/uni-app-router/useRouter.js'


console.log('1.1.3分支')

const app = new Vue({
    ...App,
	router
})
app.$mount()
