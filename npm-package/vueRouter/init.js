import {
	vuelifeHooks,
} from './base.js'

import {
	afterHooks,
	beforeHooks,
	registerRouter,
} from './concat.js'

import {
	fromatRoutes
} from './util.js'

import {
	err
} from '../helpers/warn.js'

/**
 * 在uni-app没有注入生命周期时先直接代理相关生命周期数组
 * @param {Object} vueRouter
 * @param {Object} key
 */
function defineProperty(Router, key, hookFun) {
		const vueOldHooks = vuelifeHooks[key];
		return new Proxy([], {
			get: (target, prop) => {
				return prop in target ? target[prop] : undefined
			},
			set: (target, prop, value) => {
				if (typeof value == 'function') {
					vueOldHooks.splice(0, 1, value);
					target[prop] = (to, from, next) => {
						hookFun(to, from, next, Router)
					};
				} else {
					target[prop] = value;
				}
				return true
			}
		})
}
/**
 * 拦截并注册vueRouter中的生命钩子，路由表解析
 * @param {Object} Router 
 * @param {vueRouter} vueRouter 
 * @param {VueComponent} vueVim
 */
export const init = function (Router, vueRouter, vueVim) {
	const CONFIG = Router.CONFIG.h5;
	vueRouter.afterHooks = defineProperty(Router, 'afterHooks', afterHooks);
	vueRouter.beforeHooks =defineProperty(Router, 'beforeHooks', beforeHooks);
	const objVueRoutes = fromatRoutes(vueRouter.options.routes, false, {}); //返回一个格式化好的routes 键值对的形式
	const objSelfRoutes = fromatRoutes(Router.CONFIG.routes, true, CONFIG);
	Router.vueRoutes = objVueRoutes; //挂载vue-routes到当前的路由下
	Router.selfRoutes = {...Router.selfRoutes||{},...objSelfRoutes}; //挂载self-routes到当前路由下
	Router.$route=vueRouter;		//挂载vue-router到$route
	registerRouter(Router, vueRouter, CONFIG.vueRouterDev);
}