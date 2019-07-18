import { route } from "./config.js";

export const isH5 = function() {
  return typeof window !== "undefined" && typeof document !== "undefined";
};
export const queryMp=function(Vim){
	if(Object.keys(Vim).length<6){
		return Vim;
	}
	if(Vim.$mp&&Vim.$mp.page){
		return Vim.$mp;
	}
	return queryMp(Vim.$parent);
}

export const filter = function(str) {
  str += "";
  str = str.replace(/%/g, "%25");
  str = str.replace(/\+/g, "%2B");
  str = str.replace(/ /g, "%20");
  str = str.replace(/\//g, "%2F");
  str = str.replace(/\?/g, "%3F");
  str = str.replace(/&/g, "%26");
  str = str.replace(/\=/g, "%3D");
  str = str.replace(/#/g, "%23");
  return str;
};
export const parseQuery = function(routerName, query, Encode = false) {
  if (Encode) {
    let reg = /([^=&\s]+)[=\s]*([^&\s]*)/g;
    let obj = {};
    while (reg.exec(query)) {
      obj[RegExp.$1] = RegExp.$2;
    }
    return {
      url: routerName,
      query: obj
    };
  } else {
    const sdata = [];
    for (let attr in query) {
      sdata.push(`${attr}=${filter(query[attr])}`);
    }
    return {
      url: routerName,
      query: sdata.join("&")
    };
  }
};
export const exactRule = function(cloneRule, routes, ruleKey, getRule = false) {
  const params = {};
  let i = 0;
  while (true) {
    const item = routes["routes"][i];
    if (item == null) {
      if (!getRule) {
        console.error(
          `路由表中未查找到 '${ruleKey}' 为 '${cloneRule[ruleKey]}' `
        );
      }
      break;
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

export const recordJump = function(Router, rule) {
  Router.cache = rule;
};

export const resolveRule = function(router, rule, query={}) {
  let ruleInfo = route(
    exactRule(
      {
        ...rule
      },
      router.routers,
      "path",
      router
    )
  );
  return {
    ...ruleInfo,
    query
  };
};
