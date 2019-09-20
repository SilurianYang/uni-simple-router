import { route,baseConfig } from "./config.js";
import {warn} from "./warn.js";

export const isH5 = function() {
  return typeof window !== "undefined" && typeof document !== "undefined";
};
/**
 * 格式化基础配置信息 通过new Router传递过来的参数
 */
export const formatConfig=function(userConfig){
	 if(!userConfig.routes||userConfig.routes.constructor!==Array){
		 return warn(`路由参数 'routes' 必须传递 \r\n\r\n${JSON.stringify(userConfig)}`);
	 }
	  if(userConfig.h5!=null&&userConfig.h5.constructor!==Object){
		 return warn(`h5参数传递错误，应该是一个 'Object' 类型 示例：\r\n\r\n${JSON.stringify(baseConfig.h5)}`);
	  }
	  const config=Object.create(null);
	  for(let key in baseConfig){
		  if(userConfig[key]){
			  config[key]={...baseConfig[key],...userConfig[key]}
		  }else{
			  config[key]=baseConfig[key]
		  }
	  }
	 return config;
}
/**递归查找当前page路径对应的vue组件
 * @param {Object} Vim
 */
export const queryMp=function(Vim){
	if(Vim.constructor.name=='Vue'){
		Vim.$options.page='';
		Vim.$options.ONLAUNCH=true;
		return Vim.$options
	}else{
		if(Object.keys(Vim).length<6){
			return Vim;
		}
		if(Vim.$mp&&Vim.$mp.page){
			return Vim.$mp;
		}
		return queryMp(Vim.$parent);
	}
}

export const parseQuery = function(routerName, query, Encode = false) {
  if (Encode) {
    return {
      url: routerName,
      query: JSON.parse(decodeURIComponent(query.replace(/^query=/,'')))
    };
  } else {
    return {
      url: routerName,
      query: `query=${encodeURIComponent(JSON.stringify(query))}`
    };
  }
};
export const exactRule = function(cloneRule, routes, ruleKey, getRule = false) {
  const params = {};
  let i = 0;
  while (true) {
    const item = routes[i];
    if (item == null) {
      if (!getRule) {
		  warn(`路由表中未查找到 '${ruleKey}' 为 '${cloneRule[ruleKey]}'`)
      }
	  return {path:'',name:''}
    }
    if (item[ruleKey] != null && item[ruleKey] === cloneRule[ruleKey]) {
      if (!getRule) {
        params.url = item["path"];
        params.rule = item;
        return params;
      }
      return item;
    }
    i++;
  }
};

export const normalizeParams = function(cloneRule, routes) {
  let params = {};
  if (cloneRule.constructor === String) {
    let rule = {};
    rule.path = cloneRule;
    rule.query = {};
    cloneRule = rule;
  }
  params =
    (cloneRule["path"] && parseQuery("path", cloneRule["query"] || {})) ||
    (cloneRule["name"] && parseQuery("name", cloneRule["params"] || {}));
  params = {
    ...exactRule(cloneRule, routes, params.url),
    query: params.query
  };
  return params;
};

export const encodeURI = function(rule) {
	return encodeURIComponent(rule);
};

export const resolveRule = function(router, rule, query={}) {
  let ruleInfo = route(
    exactRule(
      {
        ...rule
      },
      router.CONFIG.routes,
      "path",
      router
    )
  );
  return {
    ...ruleInfo,
    query
  };
};
