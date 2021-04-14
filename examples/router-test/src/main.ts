import Vue from 'vue'

import AppVue from './App.vue'

import { router, RouterMount } from './router'

Vue.use(router)

Vue.config.productionTip = false

const app = new AppVue()

// #ifdef H5
RouterMount(app, router, '#app')
// #endif

// #ifndef H5
app.$mount()
// #endif
