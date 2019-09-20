import {
	builtIn,
	lifeHooks
} from './base.js'

import {
	afterHooks,
	beforeHooks
} from './concat.js'

/**
 * 在uni-app没有注入生命周期时先直接代理相关生命周期数组
 * @param {Object} vueRouter
 * @param {Object} key
 */
function defineProperty(vueRouter, key,hookFun) {
	const vueOldHooks = lifeHooks[key];
	return new Proxy([], {
		get: (target, prop) => {
			return prop in target ? target[prop] : undefined
		},
		set: (target, prop, value) => {
			if (typeof value == 'function') {
				vueOldHooks.splice(0, 1, value);
				target[prop] = hookFun;
			} else {
				target[prop] = value;
			}
			return true
		}
	})
}
/**
 * 初始化
 */
export default function init(Router,vueRouter) {
	console.log(Router)
	console.log(vueRouter)
	
	vueRouter.beforeHooks = defineProperty(vueRouter,'afterHooks', afterHooks);
	vueRouter.afterHooks = defineProperty(vueRouter,'beforeHooks', beforeHooks);
}