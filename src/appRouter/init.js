import {proxyLaunchHook,beforeBackHooks} from './hooks'

/**
 * 对当前app做一个动画页面 用来过渡首次next 等待时间过长的尴尬
 */
export const registerLoddingPage = function() {
	const view = new plus.nativeObj.View('router-loadding', {
		top: '0px',
		left: '0px',
		height: '100%',
		width: '100%',
		backgroundColor: "#96DBF3"
	});
	view.drawBitmap('/static/wait.gif', {}, {
		top: 'auto',
		left: 'auto',
		width: '200px',
		height: '200px'
	})
	view.show();
}
/**
 * 移除当前 页面上 非router 声明的 onBackPress 事件
 * 
 * @param {Object} options	当前page对象的 $options
 */
export const removeBackPressEvent=function(options){
	for(let i=0;i<options.onBackPress.length;i++){
		const item=options.onBackPress[i];
		if(item.name!='hhyangRouterBack'){		//只要不等于 路由混入的都干掉
			options.onBackPress.splice(i,1)
		}
	}
}
/**
 * 判断当前页面是否需要拦截返回
 * 
 * @param {Object} page 当前 vue 组件对象 
 * @param {Object} options 当前 vue 组件对象下的$options对象
 * 
 * this 为当前 Router 对象
 */
export const pageIsHeadBack=function(page,options){
	const pageStyle=page.$getAppWebview().getStyle();
	if(pageStyle.titleNView!=null&&pageStyle.titleNView.autoBackButton){
		beforeBackHooks.call(this,options);
		return true
	}else{
		return false
	}
}

/**
 * 开始初始化app端路由配置
 * 
 * @param {Object} Router
 * 
 * this 为当前 page 对象
 */
export const appInit = function(Router) {
	proxyLaunchHook.call(this)
	registerLoddingPage();
}
