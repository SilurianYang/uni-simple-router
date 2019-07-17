import * as util from "./helpers/util.js";
import { methods, route, lifeCycle } from "./helpers/config.js";

import * as lifeMothods from "./lifeCycle/hooks.js";

class Router {
  constructor(arg) {
    if (arg && arg.constructor !== Object) {
      return console.error(`Routing configuration must be an Object`);
    }
    Router.$root = this;
    this.routers = arg;
    this.methods = methods;
    this.lifeCycle = lifeCycle;
    this.lastVim = null;
  }
  /**动态的导航到一个新 URL 保留浏览历史
   * navigateTo
   * @param {Object} rule
   */
  push(rule) {
    lifeMothods.resolveParams(this, rule, "push", function(customRule) {
      uni[this.methods["push"]]({
        url: `${customRule.url}?${customRule.query}`
      });
    });
  }
  /**动态的导航到一个新 URL 关闭当前页面，跳转到的某个页面。
   * redirectTo
   * @param {Object} rule
   */
  replace(rule) {
    lifeMothods.resolveParams(this, rule, "replace", function(customRule) {
      uni[this.methods["replace"]]({
        url: `${customRule.url}?${customRule.query}`
      });
    });
  }
  /**动态的导航到一个新 URL 关闭所有页面，打开到应用内的某个页面
   * 	reLaunch
   * @param {Object} rule
   */
  replaceAll(rule) {
    lifeMothods.resolveParams(this, rule, "replaceAll", function(customRule) {
      uni[this.methods["replaceAll"]]({
        url: `${customRule.url}?${customRule.query}`
      });
    });
  }
  /**动态的导航到一个新 url 关闭所有页面，打开到应用内的某个tab
   * @param {Object} rule
   */
  pushTab(rule) {
    this.replaceAll(rule);
  }
  /**
   * 返回到指定层级页面上
   */
  back(delta = 1) {
    if (delta.constructor != Number) {
      return console.error(
        "返回层级参数必须是一个Number类型且必须大于1：" + delta
      );
    }
    uni.navigateBack({
      delta
    });
  }
  /**
   * 2019年7月17日18:27:36 修复在嵌套组件中无法访问$Route的bug
   * 
   * @param {Object} Vim
   */
  getQuery(Vim) {
	 Vim=util.queryMp(Vim);
    return util.resolveRule(
      this,
      {
        path: "/" + Vim.page.route
      },
      Vim.query
    );
  }
  beforeEach(fn) {
    return lifeMothods.registerHook(this.lifeCycle.beforeHooks, fn);
  }
  afterEach(fn) {
    return lifeMothods.registerHook(this.lifeCycle.afterHooks, fn);
  }
}
Router.$root = null;
Router.install = function(Vue) {
  Object.defineProperty(Vue.prototype, "$Router", {
    get: function() {
      Router.$root.lastVim = this;
      return Router.$root;
    }
  });
  Object.defineProperty(Vue.prototype, "$Route", {
    get: function() {
      return Router.$root.getQuery(this);
    }
  });
};

export default Router;
