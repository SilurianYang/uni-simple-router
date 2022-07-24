import {RouterMount,createRouter,runtimeQuit} from './@/dist/uni-simple-router.js';

function timeOut(time=500){
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve()
		},time)
	})
}

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES],
	debugger:true,
		beforeProxyHooks: {
			async onLoad(options, next){
				await timeOut(1000)
				next([router.currentRoute.query]);
			},
			async onShow([options], next){
				await timeOut(1000)
				console.log(this);
				const args=options||router.currentRoute.query;
				next([args]);
			},
		},
			routerErrorEach:({type,level,...args})=>{
				console.log({type,level,...args})
				// #ifdef APP-PLUS
					if(type===3){
						router.$lockStatus=false;
						runtimeQuit();
					}
				// #endif
			},
});



//全局路由前置守卫
router.beforeEach(async (to, from, next) => {
	await timeOut(1500);
	next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    console.log('跳转结束')
})

export {
	router,
	RouterMount
}