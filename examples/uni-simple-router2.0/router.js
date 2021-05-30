import {
	RouterMount,
	createRouter,
	runtimeQuit
} from './dist/uni-simple-router.js';

let first = null;
const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	APP:{
		animation:{
			animationType:'slide-in-top',
			animationDuration:300
		},
		loddingPageHook:(view)=>{
			view.hide()
		}
	},
	applet:{
		animationDuration:300
	},
	routerBeforeEach:(to, from, next) => {
		console.log('+++++routerBeforeEach++++')
		next();
	},
	routerAfterEach:(to, from) => {
	   console.log('--------routerAfterEach----')
	},
	routerErrorEach:({type,msg})=>{
		console.log({type,msg});
		if(type!==2){
			router.$lockStatus=false;
		}
		// #ifdef APP-PLUS
			if(type===3){
				runtimeQuit();
			}
		// #endif
	},
	debugger:true,
	routes: [
		...ROUTES,
		{
		  path: '*',
		  redirect:(...args)=>{
			  console.log(args)
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
	
	
	count++
	// if(to.name=='index' && to.BACKTYPE=='navigateBack'){
	// 	next(false);
	// }else{
	// 	next();
	// }
	next();
	
	// if(count==1){
	// 	next({
	// 		path:'/pages/index/index',
	// 		NAVTYPE:'replaceAll'
	// 	})
	// }else{
	// 	next();
	// }
	
});
router.afterEach((to, from, next) => {
	console.log('afterEach---跳转结束')
});

export {
	router,
	RouterMount
}