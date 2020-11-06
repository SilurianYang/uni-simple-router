const rewrite=['navigateTo','redirectTo','reLaunch','switchTab','navigateBack','preloadPage'];

const transitionTo=function(option,oldMethod,name){
	oldMethod({
		...option
	})
	console.log(name)
	console.log(option)
} 

rewrite.forEach(name=>{
	const oldMethod=uni[name];
	uni[name]=function(params){
		transitionTo(params,oldMethod,name)
	};
})

//{"url":"/pages/index/index","openType":"appLaunch"}