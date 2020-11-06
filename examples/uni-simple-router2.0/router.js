import {
	RouterMount,
	createRouter
} from './dist/uni-simple-router.js';


console.log(ROUTES)
		
const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	detectBeforeLock: (router, to, navType) => {
		router.$lockStatus=false;
	},
	routes: [
		...ROUTES,
		{
		  path: '*',
		  redirect:(to)=>{
			  return {name:'404'}
		  }
		},
	]
});
console.log(router)

router.beforeEach((to, from, next) => {
	console.log(to)
	console.log(from)
	next();
});

export {
	router,
	RouterMount
}