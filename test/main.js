import Vue from 'vue'

import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

import RouterMount from './common/uni-app-router/useRouter.js'
import routerLink from './node_modules/uni-simple-router/component/router-link.vue'
Vue.component('router-link', routerLink)

const app = new Vue({
    ...App,
})
//RouterMount(app);
app.$mount()
