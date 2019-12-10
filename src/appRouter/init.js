import {proxyLaunchHook} from './hooks'

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
