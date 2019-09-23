import {warn} from '../helpers/warn.js'
/**
 * 格式化原始路由表
 * @param {Object} routes  路由表
 * @param {Boolean} userRoute  是否为用户自己配置的路由表
 */
export const fromatRoutes = function(routes,userRoute) {
	const objRoutes={};
	for(let i=0;i<routes.length;i++){
		const item=routes[i];
		objRoutes[item.path]=item
		if(item.children&&item.children.constructor===Array){
			//reslovePath(objRoutes,item.children,item.aliasPath||item.path);
		}
	}
	return objRoutes;
}

export const resloveChildrenPath=function(objRoutes,children){
	for(let i=0;i<children.length;i++){
		const item=children[i];
		if(item.aliasPath==null){
			return warn(`子路由下 ‘aliasPath’ 不能为空：\r\n\r\n ${JSON.stringify(item)}`)
		}
		if(item.aliasPath.substring(0,1)==='/'){
			warn(`子路由不应该以绝对路径开头：\r\n\r\n ${JSON.stringify(item)}`)
		}
		if(item.path!=null){	
			objRoutes[item.path]=item;
		}else{
			objRoutes[item.aliasPath]=item;
		}
	}
	if(children){

	}
	if(aliasPath){

	}
}