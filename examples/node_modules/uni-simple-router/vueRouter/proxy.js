import {beforeEnterHooks} from './concat.js'
import {vuelifeHooks} from './base.js'
import MyArray from './myArray.js'

/**
 * 通过 Object.defineProperty 代理一个对象主要是拦截beforeEnter 生命钩子
 * @param {Router} Router  路由实例对象	
 * @param {Object} BeProxy 需要代理的路由表
 */
export const proxyBeforeEnter = function(Router,BeProxy) {
	const proxyDc = Object.create(null);		// 创建没有继承的属性
	for(let key in BeProxy){
		Object.defineProperty(proxyDc,key,{
			enumerable : true,
			configurable : true,
			get:function(){
				const value=BeProxy[key];
				if (key == 'beforeEnter' && value !== undefined) {
					return (to, from, next) => {
						beforeEnterHooks(to, from, next, value, Router)
					};
				}
				return value
			},
			set:function(v){
				BeProxy[key]=v;
			}
		})
	}
	return proxyDc;
}

/**
 * 在uni-app没有注入生命周期时先直接代理相关生命周期数组
 * @param {Object} Router
 * @param {Object} key		
 * @param {Funtion} hookFun 
 */
export const proxyEachHooks=function(Router,key, hookFun){
	const vueOldHooks = vuelifeHooks[key];
	return new MyArray(Router,vueOldHooks,hookFun);
}


/**
 * 通过proxy 代理一个对象主要是拦截beforeEnter 生命钩子
 * @param {Router} Router  路由实例对象	ES6+ 方法 高版本浏览器可使用
 */
// export const proxyBeforeEnter = function(Router) {
// 	return new Proxy({}, {
// 		get: function(t, k, r) {
// 			const value = Reflect.get(t, k, r);
// 			if (k == 'beforeEnter' && value !== undefined) {
// 				return (to, from, next) => {
// 					beforeEnterHooks(to, from, next, value, Router)
// 				};
// 			}
// 			return value;
// 		},
// 		set: function(t, k, v, r) {
// 			return Reflect.set(t, k, v, r);
// 		}
// 	})
// }


/**
 * 在uni-app没有注入生命周期时先直接代理相关生命周期数组
 * @param {Object} Router
 * @param {Object} key		ES6+ 方法 高版本浏览器可使用
 */
// export const proxyEachHooks = function(Router, key, hookFun) {
// 	const vueOldHooks = vuelifeHooks[key];
// 	return new Proxy([], {
// 		get: (target, prop) => {
// 			return prop in target ? target[prop] : undefined
// 		},
// 		set: (target, prop, value) => {
// 			if (typeof value == 'function') {
// 				vueOldHooks.splice(0, 1, value);
// 				target[prop] = (to, from, next) => {
// 					hookFun(to, from, next, Router)
// 				};
// 			} else {
// 				target[prop] = value;
// 			}
// 			return true
// 		}
// 	})
// }


