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
		loadingPageHook:(view)=>{
			view.hide()
		}
	},
	applet:{
		animationDuration:300
	},
	routerErrorEach:({type,level,...args})=>{
		console.log({type,level,...args});
		if(type===3){
			router.$lockStatus=false;
			// #ifdef APP-PLUS
			if(level==1&&args.uniActualData.from==='backbutton'){
				runtimeQuit();
			}
			// #endif
		}else if(type===0){
			router.$lockStatus=false;
		}
		
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
	
	count++
	// if(to.name=='index' && to.BACKTYPE=='navigateBack'){
	// 	next(false);
	// }else{
	// 	next();
	// }
	
	next();
	
	// if(count==1){
	// 	next({
	// 		path:'/pages/login/login',
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