import {
	RouterMount,
	createRouter
} from './dist/uni-simple-router.js';

let first = null;
const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routerBeforeEach:(to, from, next) => {
		console.log('+++++routerBeforeEach++++')
		next();
	},
	routerAfterEach:(to, from) => {
	   console.log('--------routerAfterEach----')
	},
	routerErrorEach:({type,msg})=>{
		console.log({type,msg})
		// #ifdef APP-PLUS
			if(type===3){
				router.$lockStatus=false;
				if (!first) {
					first = new Date().getTime();  
					uni.showToast({
					    title: '再按一次退出应用',
						icon:'none',
						position :'bottom',
						duration: 1000
					});
					setTimeout(function() {  
						first = null;  
					}, 1000);  
				} else {  
					if (new Date().getTime() - first < 1000) {  
						plus.runtime.quit();  
					}  
				} 
			}
		// #endif
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
let count=0;
router.beforeEach((to, from, next) => {
	console.log(to)
	console.log(from)
	// if(count==0){
	// 	next({
	// 		path:'/pages/login/login',
	// 		NAVTYPE:'replaceAll'
	// 	})
	// }else{
	// 	next();
	// }
	
	next();
	count++;
});
router.afterEach((to, from, next) => {
	console.log('跳转结束')
});

export {
	router,
	RouterMount
}