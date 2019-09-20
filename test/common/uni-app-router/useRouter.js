import Vue from 'vue'
import Router from 'uni-simple-router';

Vue.use(Router);

const router = new Router({
	h5:{
		loading:false,
		hinderTab:false,
		vueRouter:true
	},
	routes: [
		{
			path:'/pages/test/404',
			aliasPath:'/404'
		},
		{
			path: "/pages/tabbar/tabbar-1/tabbar-1",
			name: 'tabbar-1'
		},
		{
			path: "/pages/tabbar/tabbar-2/tabbar-2",
			name: 'tabbar-2'
		},
		{
			path: "/pages/tabbar/tabbar-3/tabbar-3",
			name: 'tabbar-3'
		},
		{
			path: "/pages/tabbar/tabbar-4/tabbar-4",
			name: 'tabbar-4',
		},
		{
			path: "/pages/tabbar/tabbar-5/tabbar-5",
			name: 'tabbar-5'
		},
		{
			path: "/pages/router/router1/router1",
			name: 'router1'
		}, {
			path: "/pages/router/router2/router2",
			name: 'router2',
		}, {
			path: "/pages/router/router3/router3",
			name: 'router3'
		}, {
			path: "/pages/router/router4/router4",
			name: 'router4'
		},
		{
			path: "/pages/router/router5/router5",
			name: 'router5',
		},
		{
			path: "/pages/router/router6/router6",
			name: 'router6'
		}
	]
});

router.beforeEach((to, from, next) => {
		// console.log(from)
		// console.log(to)
		next();
})
router.afterEach((to, from) => {
})

export default router
