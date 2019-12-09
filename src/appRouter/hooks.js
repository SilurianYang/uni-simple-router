import {uniAppHook} from '../helpers/config'
import {callAppHook,getPages,getPageVmOrMp,ruleToUniNavInfo,formatTo,formatFrom} from './util'
import {noop,parseQuery} from '../helpers/util'
import {warn} from '../helpers/warn'
import {resolveParams} from "../lifeCycle/hooks.js";
/**
 * 主要是对app.vue下onLaunch和onShow生命周期进行劫持
 * 
 * this 为当前 page 对象
 */
export const proxyLaunchHook=function(){
	const {
		onLaunch,
		onShow
	}=this.$options;
	uniAppHook.onLaunch.fun=[onLaunch[onLaunch.length-1]];
	uniAppHook.onShow.fun=[onShow[onShow.length-1]]
	onLaunch.splice(onLaunch.length-1,1,(...arg)=>{
		uniAppHook.onLaunch.args=arg;
	})		//替换uni-app自带的生命周期
	onShow.splice(onShow.length-1,1,(...arg)=>{
		uniAppHook.onShow.args=arg;
		if(uniAppHook.pageReady){		//因为还有app切前台后台的操作
			callAppHook.call(uniAppHook.onShow.fun,arg)
		}
	})	//替换替换 都替换
}
/**
 * 把指定页面的生命钩子函数保存并替换
 * this 为当前 page 对象
 */
export const proxyIndexHook=function(Router){
	const {needHooks,waitHooks}=uniAppHook;
	for(let i=0;i<needHooks.length;i++){
		const key=needHooks[i];
		if(this[key]!=null){
			const {length}=this[key];
			waitHooks[key]=this[key].splice(length-1,1,noop);	//把实际的页面生命钩子函数缓存起来,替换原有的生命钩子
		}
	}
	triggerLifeCycle(Router);	//接着 主动我们触发导航守卫
}

/**
 * 主动触发导航守卫
 * @param {Object} Router 当前路由对象
 */
export const triggerLifeCycle = function(Router) {
	const topPage=getCurrentPages()[0];
	if(topPage==null){
		return warn('打扰了,当前一个页面也没有 这不是官方的bug是什么??');
	}
	let {query,page}=getPageVmOrMp(topPage,false);
	transitionTo.call(Router,{path:page.route,query},'static');	
}
/**
 * 核心方法 处理一系列的跳转配置
 * @param {Object} rule 当前跳转规则
 * @param {Object} fnType 跳转页面的类型方法
 * @param {Object} navCB:? 回调函数
 * 
 * this 为当前 Router 对象
 * 
 */
export const transitionTo =async function(rule, fnType, navCB){
	await this.lifeCycle["routerbeforeHooks"][0].call(this, fnType) //触发内部跳转前的生命周期
	const finalRoute=ruleToUniNavInfo(rule,this.CONFIG.routes);		//获得到最终的 route 对象
	const _from=formatFrom(this.CONFIG.routes);	//先根据跳转类型获取 from 数据
	const _to=formatTo(finalRoute);	//再根据跳转类型获取 to 数据
	const beforeResult= await beforeHooks.call(this,_from,_to);		//执行 beforeEach 生命周期
	try{
	  await isNext(beforeResult,fnType,navCB);	//验证当前是否继续  可能需要递归  那么 我们把参数传递过去
	}catch(e){
		return false;
	}
	console.log(11111)
}
/**
 * 触发全局beforeHooks 生命钩子
 * @param {Object} _from // from  参数
 * @param {Object} _to  // to 参数
 * 
 * this 为当前 Router 对象
 */
const beforeHooks = function(_from,_to){
	return new Promise(async (resolve, reject)=>{
		if (!this.lifeCycle["beforeHooks"][0]) {
			return resolve();
		}
		await this.lifeCycle["beforeHooks"][0](_to, _from, resolve);
	})
}
/**
 * 触发全局 beforeEnter 生命钩子
 * @param {Object} _from // from  参数
 * @param {Object} _to  // to 参数
 * 
 * this 为当前 Router 对象
 */
const beforeEnterHooks =function(_from,_to){
	
}
/**
 * 验证当前 next() 管道函数是否支持下一步
 * 
 * @param {Object} Intercept 拦截到的新路由规则
 * @param {Object} fnType 跳转页面的类型方法 原始的
 * @param {Object} navCB 回调函数 原始的
 */
const isNext =function(Intercept,fnType, navCB){
	return new Promise((resolve,reject)=>{
		if(Intercept==null){		//什么也不做 直接执行下一个钩子
			return resolve();
		}
		if(Intercept===false){		//路由中断
			return reject('路由终止');
		}
		if(Intercept.constructor === String){		//说明 开发者直接传的path 并且没有指定 NAVTYPE 那么采用原来的navType
			reject(1);
			return transitionTo(Intercept,fnType,navCB);
		}
		if(Intercept.constructor === Object){	//有一系列的配置 包括页面切换动画什么的
			reject(1);
			return transitionTo(Intercept,Intercept.NAVTYPE||fnType,navCB);
		}
	})
}