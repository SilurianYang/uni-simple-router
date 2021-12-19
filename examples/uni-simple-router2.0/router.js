import {
	RouterMount,
	createRouter,
	runtimeQuit
} from './dist/uni-simple-router.js';


let pageHookAnimationEnd=null;
const pageHookAnimation=new Promise(resolve=>pageHookAnimationEnd=resolve);

// #ifndef APP-PLUS
	pageHookAnimationEnd();
// #endif

let first = null;
const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	APP:{
		animation:{
			animationType:'slide-in-top',
			animationDuration:300
		},
		registerLoadingPage:true,
		loadingPageStyle:()=>JSON.parse('{"backgroundColor":"#FFCCCC"}'),   
		loadingPageHook:async (view)=>{
			console.log('------------loadingPageHook--------------')
			view.show();
			const [,{screenWidth}]=await uni.getSystemInfo();
			            view.drawBitmap('/static/wait3.gif', {}, {
			                top: 'auto',
			                left: 'auto',
			                width:  screenWidth+'px',
			                height: 'auto'
			            });
						plus.navigator.closeSplashscreen();
						setTimeout(()=>{
							pageHookAnimationEnd();
						},3500)
		},
		        launchedHook:()=>{
					plus.navigator.closeSplashscreen();
		            console.log('APP加载完成啦')
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
	    beforeProxyHooks: {
			onLaunch(options,next){
					console.log(this)
					setTimeout(()=>{
						return next([{
							name:666
						}])
					},3000)
			},
	        onLoad: function(options, next,router) {
	            console.log(options);
				console.log(this)
				next([
					{name:111}
				])
	        },
			
	    },
	debugger:false,
	routes: [
		...ROUTES,
		{
		  path: '*',
		  redirect:(...args)=>{
			  return {name:'404'}
		  }
		},
	]
});
console.log(router)
let count=0;
router.beforeEach(async (to, from, next) => {
	count++
	// if(to.name=='index' && to.BACKTYPE=='navigateBack'){
	// 	next(false);
	// }else{
	// 	next();
	// }
	
<<<<<<< HEAD
	
	if(count===1&&to.name=='empty'){
		return next({
			name:'nvue1',
			NAVTYPE:'replaceAll'
		})
	}
	
=======
	await pageHookAnimation;
>>>>>>> dev2.0.8
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