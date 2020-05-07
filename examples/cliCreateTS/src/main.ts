import Vue from 'vue'
import App from './App.vue'

//这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
import Router,{RouterMount, Route} from 'uni-simple-router'

Vue.use(Router)
//初始化
const router = new Router({
    routes: ROUTES
});

//全局路由前置守卫
router.beforeEach((to:Route, from:Route, next:Function) => {
    console.log(to)
    next()
})
// 全局路由后置守卫
router.afterEach((to:Route, from:Route) => {
})

Vue.config.productionTip = false

const app= new App();

//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
