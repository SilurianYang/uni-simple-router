import {
	warn,
	err
} from '../helpers/warn.js'

const pagesConfigReg = /\({[^)]+\)/;
const defRoutersReg = /props:[^{]+{([^}]+)/;

/**
 * 解析验证当前的 component 选项是否配置正确
 * @param {Function|Object} component 
 * @param {Object} item 
 * @param {Boolean} useUniConfig 
 */
export const resolveRender = function ({
	component,
	components
}, item, useUniConfig) {
	if (useUniConfig == true) {
		return false;
	}
	if (components != null) {
		delete item.components;
		warn(`路由表配置中 ‘components’ 无效，自动清理掉：\r\n\r\n ${JSON.stringify(item)}`)
	}
	if (component == null) {
		err(`路由表中 ‘component’ 选项不能为空：\r\n\r\n ${JSON.stringify(item)}`)
	}
	if (component.constructor === Function) {
		item.component = {
			render: component
		}
	} else if (component.constructor === Object) {
		if (component.render == null || component.render.constructor !== Function) {
			err(`路由表配置中 ‘render’ 函数缺失或类型不正确：\r\n\r\n ${JSON.stringify(item)}`)
		}
	} else {
		err(`路由表配置中 ‘component’ 选项仅支持 Function、Object 类型。并确保 Object 类型时传递了 ‘render’ 函数  ：\r\n\r\n ${JSON.stringify(item)}`)
	}
}

/**
 * 格式化原始路由表
 * @param {Object} routes  路由表
 * @param {Boolean} userRoute  是否为用户自己配置的路由表
 * @param {Boolean} useUniConfig 是否使用pages.json下的页面配置
 */
export const fromatRoutes = function (routes, userRoute, useUniConfig) {
	const objRoutes = {};
	for (let i = 0; i < routes.length; i++) {
		const item = routes[i];
		const path = item.path === '/' ? item.alias : item.path;
		objRoutes[path] = {
			...item,
			...{
				_PAGEPATH: path.substring(1)
			}
		};
		if (userRoute) {
			if (item.children && item.children.constructor === Array) {
				resloveChildrenPath(objRoutes, item.children, useUniConfig);
			}
			resolveRender(item, item, useUniConfig);
		}
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
		if (item.aliasPath == null) {
			return err(`子路由下 ‘aliasPath’ 不能为空：\r\n\r\n ${JSON.stringify(item)}`)
		}
		if (item.aliasPath.substring(0, 1) === '/') {
			err(`子路由不应该以绝对路径开头：\r\n\r\n ${JSON.stringify(item)}`)
		}
		resolveRender(item, item, useUniConfig);
		if (item.path != null) {
			objRoutes[item.path] = {
				...item,
				...{
					_ROUTERPATH: true
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

export const diffRouter = function (Router, vueRouter, useUniConfig) {
	const newRouterMap = [];

	vueRouter.options.routes.forEach(((item, index) => {
		if (useUniConfig) { //使用pages.json的样式配置
			const path = item.path === '/' ? item.alias : item.path;
			const vueRoute = Router.vueRoutes[path] || Router.vueRoutes[item.path];
			const CselfRoute = JSON.parse(JSON.stringify(Router.selfRoutes[path]));
			if (CselfRoute == null) {
				return err(`读取 ‘pages.json’ 中页面配置错误。实例化时传递的路由表中未找到路径为：${path} \r\n\r\n 可以尝试把 ‘useUniConfig’ 设置为 ‘false’。或者配置正确的路径`)
			}
			const pageConfigJson = getFuntionConfig(vueRoute.component.render.toString());
			console.log(vueRoute.component)

			delete CselfRoute.components
			delete CselfRoute.children
			CselfRoute.path = CselfRoute.aliasPath || CselfRoute.path;
			delete CselfRoute.aliasPath
			//console.log(pageConfigJson.FunStr)
			CselfRoute.component = {
				render: h => {
					return h(
						'Page', {
							props: pageConfigJson.config
						}, [
							h(CselfRoute._PAGEPATH.replace(/\//g, '-')), {
								slot: 'page'
							}
						])
				}
			}
			newRouterMap.push(CselfRoute)
		}
		// if (item.meta && item.meta.isTabBar) {
		// 	constantRouterMap.push(item)
		// }
	}))
	return newRouterMap;
}