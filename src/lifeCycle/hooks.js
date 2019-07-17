import { resolveRule, normalizeParams, parseQuery,queryMp } from "../helpers/util.js";

import { route } from "../helpers/config.js";

export const registerHook = function(list, fn) {
  list.push(fn);
  return () => {
    const i = list.indexOf(fn);
    if (i > -1) list.splice(i, 1);
  };
};
export const executeHook = function(list, ...args) {
  for (let i = 0; i < list.length; i++) {
    list[i](args);
  }
};

export const isNext = function(router, Intercept, rule, fnType) {
  return new Promise((resolve, reject) => {
    if (Intercept === false || Intercept === 0) {
      return reject("路由终止");
    }
    if (Intercept === true || Intercept === undefined) {
      return resolve({
        toRule: rule,
        ags: {}
      });
    }
    return resolve(resolveParams(router, Intercept, fnType));
  });
};

export const resolveParams = async function(router, rule, fnType, navigateFun) {
	router.lastVim=queryMp(router.lastVim);
  const _from = resolveRule(
    router,
    {
      path: "/" + router.lastVim.page.route
    },
    router.lastVim.query
  );
  const _to = normalizeParams(JSON.parse(JSON.stringify(rule)), router.routers);
  const ags = {
    router,
    fromRule: _from,
    toRule: {
      ..._to.rule,
      ...route(),
      query: parseQuery("query", _to.query, true).query
    },
    rule,
    fnType
  };
  const beforeResult = await resolveBeforeHooks(ags);
  if (navigateFun == null) {
    return {
      toRule: _to,
      ags
    };
  }
  try {
    let fromatRule = await isNext(router, beforeResult, _to, fnType);
    const beforeEnter = Reflect.get(fromatRule.toRule.rule, "beforeEnter");
    if (beforeEnter) {
      fromatRule = await resolveRouterHooks(
        ags,
        beforeEnter,
        fromatRule.toRule
      );
    }
    navigateFun.call(router, fromatRule.toRule);

    await resolveAfterHooks(
      router,
      {
        ...route(),
        ...fromatRule.toRule.rule,
        query: parseQuery("query", fromatRule.toRule.query, true).query
      },
      ags.fromRule
    );
  } catch (e) {}
};
/**
 * 触发全局afterHooks 生命钩子
 */
export const resolveAfterHooks = function(router, toRule, fromRule) {
  return new Promise(async (resolve, rejcet) => {
    if (!router.lifeCycle["afterHooks"][0]) {
      return resolve();
    }
    await router.lifeCycle["afterHooks"][0](toRule, fromRule, resolve);
  });
};

/**
 * 触发全局beforeHooks 生命钩子
 */
export const resolveBeforeHooks = function({
  router,
  fromRule,
  toRule,
  rule,
  fnType
} = {}) {
  return new Promise(async (resolve, reject) => {
    if (!router.lifeCycle["beforeHooks"][0]) {
      return resolve();
    }
    await router.lifeCycle["beforeHooks"][0](toRule, fromRule, resolve);
  });
};
/**
 * 触发路由独享的守卫 beforeEnter 生命钩子
 */
export const resolveRouterHooks = function(
  { router, fromRule, fnType } = {},
  hookFun,
  rule
) {
  return new Promise(async (resolve, reject) => {
    const Intercept = await new Promise(async resolve => {
      await hookFun(
        {
          ...route(),
          ...rule.rule,
          query: parseQuery("query", rule.query, true).query
        },
        fromRule,
        resolve
      );
    });
    const fromatRule = await isNext(router, Intercept, rule, fnType);
    if (Object.keys(fromatRule.ags).length > 0) {
      const beforeEnter = Reflect.get(fromatRule.ags.toRule, "beforeEnter");
      if (beforeEnter) {
        return resolve(
          await resolveRouterHooks(
            fromatRule.ags,
            beforeEnter,
            fromatRule.toRule
          )
        );
      }
    }
    resolve(fromatRule);
  });
};
