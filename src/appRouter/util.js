import {err} from '../helpers/warn'
import {copyObject,parseQuery} from '../helpers/util'
import {Global,route as mergeRoute} from '../helpers/config'

/**
 * 触发指定生命钩子
 * @param {Object} args //触发生命钩子传递的参数
 */
export const callAppHook=function(args){
	for(let i=0;i<this.length;i++){
		this[i](args);
	}
}
/**
 * @param {Number} index //需要获取的页面下标 -2 表示获取最后一个
 * @param {Boolean} all //是否获取全部的页面
 */
export const getPages=function(index=-1,all){
	const pages=getCurrentPages(all);
	if(index===-1){
		return pages
	}
	if(index===-2){
		return pages[pages.length-1];
	}
	return pages[index];
}
/**
 * @param {Object} page //当前顶级页面对象
 * @param {Object} vim:? //是否获取 $vm 对象还是 $mp 对象
 */
export const getPageVmOrMp=function(page,vim=true){
	if(vim){
		return page.$vm;
	}
	return page.$vm.$mp
}

/**
 * 获取 to 的配置参数
 * @param {Object} rule 当前跳转的规则
 */
export const formatTo=function(finalRoute){
	const route=copyObject(finalRoute.route);
	const rule=finalRoute.rule;
	route.query=rule['query']||rule['params']||{};
	return route;
}
/**
 * 获取 from 的配置参数 from 页面永远都是站在当前页面忘其它地方走 所以都是最后一个页面
 * 
 * @param {Object} routes //当前对象的所有路由表
 */
export const formatFrom=function(routes){
	const topPage=getPages(-2);
	const {page,query}=getPageVmOrMp(topPage,false);
	let route=pathOrNameToRoute(page.route,routes);	//获取到当前路由表下的 route
	route=mergeRoute(route);	//合并一下对象,主要是合并 query:{} 及 params:{}
	route.query=getFormatQuery(query);	//不管是编码传输还是非编码 最后都得在 to/from 中换成json对象
	return route;
}
/**
 * 通过一个未知的路径或者名称 在路由表中查找指定路由表 并返回
 * @param {string} type   //path 或者 name
 * @param {Object} routes //当前对象的所有路由表
 */
export const pathOrNameToRoute=function(type,routes){
	for(let key in routes){
		const item=routes[key];
		if(item.path===`/${type}`){
			return copyObject(item);
		}
		if(item.path===type){
			return copyObject(item);
		}
		if(item.name==type){
			return copyObject(item);
		}
	}
	err(`当前 '${type}' 在路由表中没有找到匹配的 name 或者 path`);
}
/**
 * 
 * 把用户的跳转路由规则格式化成uni-app可用的路由跳转规则
 * 
 * @param {Object} rule  //当前用户跳转的路由规则
 * @param {Object} routes //当前simple-router 下的路由表 
 */
export const ruleToUniNavInfo=function(rule,routes){
	if(rule==null){
		return err(`当前跳转规则为空,请检查跳转代码`);
	}
	let [navType,route,query]=['path',null,{}];
	if(rule.constructor===String){		//是字符串类型 那当前就是路径啦
		route=pathOrNameToRoute(rule,routes);	//直接把 rule 当 path 传递 完事
	}else if(rule.constructor===Object){		//对象类型 可以是 path 或者 name
		route=pathOrNameToRoute(rule['path']||(navType='name',rule['name']),routes);	//两则必有其一 报错自己处理
		query=rule['query']||rule['params']||{};
	}else{
		return err(`传的什么乱七八糟的类型?路由跳转规则只认字符串 'path' , 对象 'path' , 对象 'name' `);
	}
	route=mergeRoute(route);	//合并一下对象,主要是合并 query:{} 及 params:{}
	//路径处理完后   开始格式化参数
	let uniRoute=parseQuery(route.path,query);	//uni-app 需要的跳转规则
	return {
		rule,
		route,
		uniRoute
	}
}

export const getFormatQuery = function (query) {
	if(Global.Router.CONFIG.encodeURI){
		try{
			query = JSON.parse(decodeURIComponent(query.query || encodeURIComponent('{}')))
		}catch(e){
			query = JSON.parse(query.query)
		}
	}
	return query;
}