import Vue from 'vue'
import Router from 'uni-simple-router';
Vue.use(Router);

const router = new Router({
	h5:{
		loading:false,
		vueRouterDev:false,
		useUniConfig:true,
	},
	routes: [
		{
			path:'/pages/test/404',
			aliasPath:'/404',
			name:'404',
			component:()=>import('@/pages/test/404.vue'),
			children:[
				{
					aliasPath:'404/:id',
					component:()=>import('@/pages/test/test.vue'),
					children:[{
						aliasPath:'888',
						component:()=>import('@/pages/test/test.vue'),
					}]
				},
				{
					aliasPath:'4041',
					component:()=>import('@/pages/test/test.vue'),
				}
			]
		},
		{
			//aliasPath:'/',
			path: "/pages/tabbar/tabbar-1/tabbar-1",
			component:()=>import('@/pages/test/404.vue'),
			name: 'tabbar-1',
			beforeEnter: (to, from, next) => {
				console.log('beforeEnter')
				console.log(to)
				console.log(from)
				next();
			  },
		},
		{
			//aliasPath:'/tabbar2',
			component:()=>import('@/pages/test/404.vue'),
			path: "/pages/tabbar/tabbar-2/tabbar-2",
			name: 'tabbar-2',
			beforeEnter: (to, from, next) => {
				next();
			  }
		},
		{
			//aliasPath:'/tabbar3',
			component:()=>import('@/pages/test/404.vue'),
			path: "/pages/tabbar/tabbar-3/tabbar-3",
			name: 'tabbar-3',
		},
		{
			//aliasPath:'/tabbar4',
			component:()=>import('@/pages/test/404.vue'),
			path: "/pages/tabbar/tabbar-4/tabbar-4",
			name: 'tabbar-4',
		},
		{
			//aliasPath:'/tabbar5',
			component:()=>import('@/pages/test/404.vue'),
			path: "/pages/tabbar/tabbar-5/tabbar-5",
			name: 'tabbar-5',
		},
		{
			component:()=>import('@/pages/test/404.vue'),
			path: "/pages/router/router1/router1",
			name: 'router1'
		}, {
			component:()=>import('@/pages/test/404.vue'),
			path: "/pages/router/router2/router2",
			name: 'router2',
		}, {
			component:()=>import('@/pages/test/404.vue'),
			path: "/pages/router/router3/router3",
			name: 'router3'
		}, {
			component:()=>import('@/pages/test/404.vue'),
			path: "/pages/router/router4/router4",
			name: 'router4'
		},
		{
			aliasPath:'/router5',
			component:()=>import('@/pages/test/404.vue'),
			path: "/pages/router/router5/router5",
			name: 'router5',
			beforeEnter: (to, from, next) => {
				console.log(`router5------beforeEnter`)
				console.log(to)
				console.log(from)
				next();
			}
		},
		{
			component:()=>import('@/pages/test/404.vue'),
			path: "/pages/router/router6/router6",
			name: 'router6'
		}
	]
});
let count=0;
router.beforeEach((to, from, next) => {
		console.log(to)
		console.log(from)
		if(count==0){
			next({name:'router5',NAVTYPE:'push'});
		}else{
			next();
		}
		count++
})
router.afterEach((to, from) => {
	console.log('afterEach')
})

export default router;
