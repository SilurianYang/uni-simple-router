const rewrite=['navigateTo','redirectTo','reLaunch','switchTab','navigateBack','preloadPage'];

const transitionTo=function(option){
	console.log(option)
} 

rewrite.forEach(name=>{
	uni[name]=transitionTo;
})

//{"url":"/pages/index/index","openType":"appLaunch"}