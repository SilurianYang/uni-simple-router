import {proxyLaunchHook} from './hooks'

/**
 * 开始初始化app端路由配置
 * 
 * @param {Object} Router 	当前Router对象
 * 
 * this 为当前 page 对象
 */
export const appletsInit=function(Router){
	proxyLaunchHook.call(this)
}