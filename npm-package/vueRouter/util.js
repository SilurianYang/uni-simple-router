import {
	warn,
	err
} from '../helpers/warn.js'

import {
	beforeEnterHooks
} from './concat.js'

import {
	resolveRule,
	copyObject
} from '../helpers/util.js'

import {
	queryInfo,
} from "../patch/applets-patch.js";

const pagesConfigReg = /\({[^)]+\)/;
const defRoutersReg = /props:[^{]+{([^}]+)/;

/**
 * 解析验证当前的 component 选项是否配置正确 只有vueRouterDev:false 才会调用此方法
 * @param {Function|Object} component 
 * @param {Object} item 
 * @param {Boolean} useUniConfig 
 */
export const resolveRender = function ({
	component,
	components
}, item, useUniConfig) {
	if (components != null) {
		warn(`vueRouterDev:false时 路由表配置中 ‘components’ 无效，\r\n\r\n ${JSON.stringify(item)}`)
	}
	if (useUniConfig == true) { //采用uni-pages.json中的配置时component可以为空
		return false;
	}
	if (item.path == '*') { //唯独这个情况在vue-router中可以不用component
		return true
	}
	if (component == null) {
		return err(`vueRouterDev:false时 路由表中 ‘component’ 选项不能为空：\r\n\r\n ${JSON.stringify(item)}`)
	}
	if (component.constructor === Function) {
		item.component = {
			render: component
		}
	} else if (component.constructor === Object) {
		if (component.render == null || component.render.constructor !== Function) {
			err(`vueRouterDev:false时 路由表配置中 ‘render’ 函数缺失或类型不正确：\r\n\r\n ${JSON.stringify(item)}`)
		}
	} else {
		err(`vueRouterDev:false时 路由表配置中 ‘component’ 选项仅支持 Function、Object 类型。并确保 Object 类型时传递了 ‘render’ 函数  ：\r\n\r\n ${JSON.stringify(item)}`)
	}
}

/**
 * 格式化原始路由表
 * @param {Object} routes  路由表
 * @param {Boolean} userRoute  是否为用户自己配置的路由表
 * @param {Boolean} H5CONFIG 
 */
export const fromatRoutes = function (routes, userRoute, {
	vueRouterDev,
	useUniConfig
}) {
	if (userRoute && vueRouterDev) { //如果是用户的路由表并且 完全采用vueRouter开发 则不作处理直接返回
		return routes;
	}
	const objRoutes = {};
	for (let i = 0; i < routes.length; i++) {
		const item = routes[i];
		const path = item.path === '/' ? item.alias : item.path;
		if (userRoute) {
			if (item.children && item.children.constructor === Array) {
				resloveChildrenPath(objRoutes, item.children, useUniConfig);
			}
			resolveRender(item, item, useUniConfig); //是否使用pages.json下的页面配置
		}
		objRoutes[path] = {
			...item,
			...{
				_PAGEPATH: path.substring(1)
			}
		};
	}
	return objRoutes;
}
/**
 * 递归解析 H5配置中有存在嵌套对象的情况,优先以path为key存储。没有则找aliasPath作为key
 * @param {Object} objRoutes 
 * @param {Array} children 
 * @param {Boolean} useUniConfig 是否使用pages.json下的页面配置
 */
export const resloveChildrenPath = function (objRoutes, children, useUniConfig) {
	for (let i = 0; i < children.length; i++) {
		const item = children[i];
		resolveRender(item, item, useUniConfig);
		if (item.path != null) {
			objRoutes[item.path] = {
				...item,
				...{
					_ROUTERPATH: true //使用page.json中的path为路径
				}
			};
		} else {
			objRoutes[item.aliasPath] = {
				...item,
				...{
					_ROUTERPATH: false
				}
			};
		}
		if (item.children && item.children.constructor === Array) {
			resloveChildrenPath(objRoutes, item.children, useUniConfig);
		}
	}
}
/**
 * 解析vueRouter中 component 下 render函数中的配置信息
 * @param {String} FunStr 
 */
export const getFuntionConfig = function (FunStr) {
	let matchText = FunStr.match(pagesConfigReg);
	let prefix = '';
	if (matchText == null) { //是uni-app自带的默认路由及配置
		try {
			matchText = FunStr.match(defRoutersReg)[1];
			matchText = eval(`Object.assign({${matchText}})`);
			prefix = 'system-'
		} catch (error) {
			err(`读取uni-app页面构建方法配置错误 \r\n\r\n ${error}`)
		}
	} else {
		matchText = eval(`Object.assign${matchText[0]}`)
	}
	return {
		config: matchText,
		prefix,
		FunStr
	};
}
/**
 * 通过一个未知的路径名称 在路由表中查找指定路由表 并返回
 * @param {String} path //不管是aliasPath名的路径还是path名的路径
 * @param {Object} routes 	//当前对象的所有路由表
 */
export const pathToRute = function (path, routes) {
	let PATHKEY = ''
	let rute = {};
	for (let key in routes) {
		const item = routes[key];
		rute = item;
		if (item.aliasPath == path) { //path参数是优先采用aliasPath为值得 所以可以先判断是否与aliasPath相同
			PATHKEY = 'aliasPath'
			break
		}
		if (item.path == path) { //路径相同
			PATHKEY = 'path'
			break
		}
	}
	return {
		PATHKEY: {
			[PATHKEY]: path
		},
		rute
	}
}
/**
 * 根据是否获取非vue-Router next管道参数，来进行格式化
 * 
 * @param {Object} to
 * @param {Object} from
 * @param {Router} Router  //router当前实例对象
 */
export const getRouterNextInfo = function (to, from, Router) {
	debugger
	let [toRoute, fromRoute] = [to, from];
	const H5 = Router.CONFIG.h5;
	if (H5.vueNext === false && H5.vueRouterDev === false) { //不采用vue-router中的to和from,需要格式化成Router中$Route获取的一样一样的
		let [toPath, fromPath] = [{}, {}];
		toPath[to.meta.PATHKEY] = to.meta.PATHKEY === 'path' ? `/${to.meta.pagePath}` : `${to.path}`;
		fromPath[from.meta.PATHKEY] = from.meta.PATHKEY === 'path' ? `/${from.meta.pagePath}` : `${from.path}`;

		if (to.meta.PATHKEY == null) { //未使用uni-pages.json中的配置、通过addRoutes时 meta.PATHKEY 可能未undefined
			toPath = pathToRute(to.path, Router.selfRoutes).PATHKEY;
		}
		if (from.meta.PATHKEY == null) {
			fromPath = pathToRute(from.path, Router.selfRoutes).PATHKEY;
		}

		const isEmptyTo=Object.keys(to.query).length!=0?copyObject(to.query):copyObject(to.params);
		const isEmptyFrom=Object.keys(from.query).length!=0?copyObject(from.query):copyObject(from.params);

		delete isEmptyTo['__id__']		//删除uni-app下的内置属性
		delete isEmptyFrom['__id__']

		const toQuery = queryInfo({
			query: isEmptyTo
		}).query;
		const fromQuery = queryInfo({
			query: isEmptyFrom
		}).query;

		toRoute = resolveRule(Router, toPath, toQuery, Object.keys(toPath)[0]);
		fromRoute = resolveRule(Router, fromPath, fromQuery, Object.keys(fromPath)[0]);
	} else {
		if (fromRoute.name == null && toRoute.name != null) { //这种情况是因为uni-app在使用vue-router时搞了骚操作。
			fromRoute = {
				...fromRoute,
				...{
					name: toRoute.name
				}
			}; //这个情况一般出现在首次加载页面
		}
	}
	return {
		toRoute,
		fromRoute
	}
}
/**
 * 通过proxy 代理一个对象主要是拦截beforeEnter 生命钩子
 * @param {Router} Router  路由实例对象
 */
export const proxyBeforeEnter = function (Router) {
	return new Proxy({}, {
		get: function (t, k, r) {
			const value = Reflect.get(t, k, r);
			if (k == 'beforeEnter' && value !== undefined) {
				return (to, from, next) => {
					beforeEnterHooks(to, from, next, value, Router)
				};
			}
			return value;
		},
		set: function (t, k, v, r) {
			return Reflect.set(t, k, v, r);
		}
	})
}
export const APushBOject=function(from,to){
	for (let k in from) {
		to[k] = from[k];
	}
}
export const vueDevRouteProxy = function (routes, Router) {
	const proxyRoutes = [];
	for (let i = 0; i < routes.length; i++) {
		const item = routes[i];
		const ProxyRoute = proxyBeforeEnter(Router);
		const childrenRoutes = Reflect.get(item, 'children');
		if (childrenRoutes != null) {
			const childrenProxy = vueDevRouteProxy(childrenRoutes, Router);
			item.children = childrenProxy;
		}
		for (let key in item) {
			ProxyRoute[key] = item[key];
		}
		proxyRoutes.push(ProxyRoute);
	}
	return proxyRoutes
}
/**
 * 在useUniConfig:true 的情况下重新拼装路由表 useUniConfig:false 不需要读取page.json中的数据 直接使用component作为页面组件
 * @param {Router} Router 		//unis-simple-router 路由对象
 * @param {vueRouter} vueRouter 	//vue-router对象
 * @param {Boolean} useUniConfig  //是否采用uni-page.json中的配置选项
 * @param {Array} routes   //需要循环的routes表
 */
export const diffRouter = function (Router, vueRouter, useUniConfig, routes) {
	const newRouterMap = [];
	if (useUniConfig) { //使用pages.json的样式配置 只是单纯的把url路径改成用户自定义的 保留uni的所以的配置及生命周期、缓存
		const Routes = routes ? routes : vueRouter.options.routes;
		const cloneSelfRoutes=copyObject(Router.selfRoutes);		//copy一个对象随便搞xxoo
		Routes.forEach(((item, index) => {
			const path = item.path === '/' ? item.alias : item.path;
			const vueRoute = (Router.vueRoutes[path] || Router.vueRoutes[item.path]) || Router.selfRoutes[path];
			const CselfRoute = Router.selfRoutes[path];
			delete cloneSelfRoutes[path];		//移除已经添加到容器中的路由，用于最后做对比 是否page.json中没有，而实例化时传递了
			const ProxyRoute = proxyBeforeEnter(Router);
			if (CselfRoute == null) {
				return err(`读取 ‘pages.json’ 中页面配置错误。实例化时传递的路由表中未找到路径为：${path} \r\n\r\n 可以尝试把 ‘useUniConfig’ 设置为 ‘false’。或者配置正确的路径。如果你是动态添加的则不用理会`)
			}
			let pageConfigJson = {
				config: {}
			};
			if (vueRoute.component) {
				pageConfigJson = getFuntionConfig(vueRoute.component.render.toString())
				CselfRoute.component = {
					render: h => vueRoute.component.render(h)
				}
			}
			delete CselfRoute.components //useUniConfig:true 时不允许携带components
			delete CselfRoute.children; //useUniConfig:true 时不允许携带children
			CselfRoute.meta = {
				...pageConfigJson.config,
				...item.meta || {},
				PATHKEY: CselfRoute.aliasPath ? 'aliasPath' : 'path',
				pagePath: CselfRoute.path.substring(1)
			};
			CselfRoute.path = CselfRoute.aliasPath || (item.path === '/' ? item.path : CselfRoute.path);
			item.alias = item.path === '/' ? item.alias : CselfRoute.path; //重新给vueRouter赋值一个新的路径，欺骗uni-app源码判断
			APushBOject(CselfRoute,ProxyRoute);
			newRouterMap.push(ProxyRoute)
			
		}))
		if(Object.keys(cloneSelfRoutes).length>0){		//确实page.json中没有，而实例化时传递了
			const testG=cloneSelfRoutes['*'];	//全局通配符 他是个例外 通配符	可以被添加
			if(testG&&routes==null){
				const ProxyRoute = proxyBeforeEnter(Router);
				APushBOject(Router.selfRoutes['*'],ProxyRoute);
				newRouterMap.push(ProxyRoute)
			}
			if(routes==null){		//非动态添加时才打印警告
				for(let key in cloneSelfRoutes){
					warn(`实例化时传递的routes参数：\r\n\r\n ${JSON.stringify(cloneSelfRoutes[key])} \r\n\r\n 在pages.json中未找到。自定排除掉，不会添加到路由中`)
				}
			}
		}
	} else { //不使用任何的uni配置完全使用 完全使用component作为页面使用
		const Routes = routes ? routes : Router.selfRoutes;
		for (let key in Routes) {
			const item = Routes[key];
			if (item._ROUTERPATH != null) { //不寻找children下的路径，只取第一层
				continue;
			}
			delete item.components;
			delete item.children;
			const ProxyRoute = proxyBeforeEnter(Router);
			item.path = item.aliasPath || item.path; //优先获取别名为路径
			if (item.path !== '*') {
				item.component = item.component.render || item.component; //render可能是用户使用addRoutes api进行动态添加的
			}
			item.meta = {
				...item.meta || {},
				PATHKEY: item.aliasPath ? 'aliasPath' : 'path',
				pagePath: item.path.substring(1)
			}
			for (let k in item) {
				ProxyRoute[k] = item[k];
			}
			newRouterMap.push(ProxyRoute)
		}
	}
	return newRouterMap;
}