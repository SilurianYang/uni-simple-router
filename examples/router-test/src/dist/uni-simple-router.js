(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Router"] = factory();
	else
		root["Router"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/path-to-regexp/index.js":
/*!**********************************************!*\
  !*** ./node_modules/path-to-regexp/index.js ***!
  \**********************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module, __webpack_require__ */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isarray = __webpack_require__(/*! isarray */ "./node_modules/path-to-regexp/node_modules/isarray/index.js")

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = options && options.delimiter || '/'
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    var next = str[index]
    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var modifier = res[6]
    var asterisk = res[7]

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var partial = prefix != null && next != null && next !== prefix
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = res[2] || defaultDelimiter
    var pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options), options)
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens, options) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$', flags(options))
    }
  }

  return function (obj, opts) {
    var path = ''
    var data = obj || {}
    var options = opts || {}
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = '(?:' + token.pattern + ')'

      keys.push(token)

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = prefix + '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  var delimiter = escapeString(options.delimiter || '/')
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}


/***/ }),

/***/ "./node_modules/path-to-regexp/node_modules/isarray/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/path-to-regexp/node_modules/isarray/index.js ***!
  \*******************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./src/H5/buildRouter.ts":
/*!*******************************!*\
  !*** ./src/H5/buildRouter.ts ***!
  \*******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.buildVueRouter = exports.buildVueRoutes = void 0;
var base_1 = __webpack_require__(/*! ../options/base */ "./src/options/base.ts");
var warn_1 = __webpack_require__(/*! ../helpers/warn */ "./src/helpers/warn.ts");
var utils_1 = __webpack_require__(/*! ../helpers/utils */ "./src/helpers/utils.ts");
var hooks_1 = __webpack_require__(/*! ../public/hooks */ "./src/public/hooks.ts");
function buildVueRoutes(router, vueRouteMap) {
    var _a = router.routesMap, pathMap = _a.pathMap, finallyPathList = _a.finallyPathList;
    var vueRoutePathList = Object.keys(vueRouteMap);
    for (var i = 0; i < vueRoutePathList.length; i++) {
        var path = vueRoutePathList[i];
        var myRoute = pathMap[path];
        var vueRoute = vueRouteMap[path];
        if (!myRoute) {
            warn_1.warn(path + " \u8DEF\u7531\u5730\u5740\u5728\u8DEF\u7531\u8868\u4E2D\u672A\u627E\u5230\uFF0C\u786E\u5B9A\u662F\u5426\u4F20\u9012\u6F0F\u5566", router, true);
        }
        else {
            var finallyPath = utils_1.getRoutePath(myRoute, router).finallyPath;
            if (finallyPath instanceof Array) {
                throw new Error("\u975E vueRouterDev \u6A21\u5F0F\u4E0B\uFF0Calias\u3001aliasPath\u3001path \u65E0\u6CD5\u63D0\u4F9B\u6570\u7EC4\u7C7B\u578B\uFF01 " + JSON.stringify(myRoute));
            }
            if (myRoute.name != null) {
                vueRoute.name = myRoute.name;
            }
            var vuePath = vueRoute['path'];
            var vueAlias = vueRoute['alias'];
            delete vueRoute['alias'];
            vueRoute['path'] = finallyPath;
            if (vuePath === '/' && vueAlias != null) {
                vueRoute['alias'] = vueAlias;
                vueRoute['path'] = vuePath;
            }
            var beforeEnter = myRoute.beforeEnter;
            if (beforeEnter) {
                vueRoute['beforeEnter'] = function (to, from, next) {
                    hooks_1.onTriggerEachHook(to, from, router, base_1.hookToggle['enterHooks'], next);
                };
            }
        }
    }
    if (finallyPathList.includes('*')) {
        vueRouteMap['*'] = pathMap['*'];
    }
    return vueRouteMap;
}
exports.buildVueRoutes = buildVueRoutes;
function buildVueRouter(router, vueRouter, vueRouteMap) {
    var routes = [];
    if (utils_1.getDataType(vueRouteMap) === '[object Array]') {
        routes = vueRouteMap;
    }
    else {
        routes = Object.values(vueRouteMap);
    }
    var _a = router.options.h5, scrollBehavior = _a.scrollBehavior, fallback = _a.fallback;
    var oldScrollBehavior = vueRouter.options.scrollBehavior;
    vueRouter.options.scrollBehavior = function proxyScrollBehavior(to, from, savedPosition) {
        oldScrollBehavior && oldScrollBehavior(to, from, savedPosition);
        return scrollBehavior(to, from, savedPosition);
    };
    vueRouter.fallback = fallback;
    // Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
    var newVueRouter = new vueRouter.constructor(__assign(__assign({}, router.options.h5), { base: vueRouter.options.base, mode: vueRouter.options.mode, routes: routes }));
    vueRouter.matcher = newVueRouter.matcher;
}
exports.buildVueRouter = buildVueRouter;


/***/ }),

/***/ "./src/H5/proxyHook.ts":
/*!*****************************!*\
  !*** ./src/H5/proxyHook.ts ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__ */
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.proxyH5Mount = exports.proxyEachHook = exports.MyArray = void 0;
var MyArray = /** @class */ (function (_super) {
    __extends(MyArray, _super);
    function MyArray(router, vueEachArray, myEachHook, hookName) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.vueEachArray = vueEachArray;
        _this.myEachHook = myEachHook;
        _this.hookName = hookName;
        Object.setPrototypeOf(_this, MyArray.prototype);
        return _this;
    }
    MyArray.prototype.push = function (v) {
        var _this = this;
        this.vueEachArray.push(v);
        var index = this.length;
        this[this.length] = function (to, from, next) {
            if (index > 0) {
                _this.vueEachArray[index](to, from, function () {
                    next && next();
                });
            }
            else {
                _this.myEachHook(to, from, function (nextTo) {
                    // Fixe https://github.com/SilurianYang/uni-simple-router/issues/241 2021年3月6日22:15:27
                    // 目前不调用uni-app的守卫函数，因为会丢失页面栈信息
                    if (nextTo === false) {
                        next(false);
                    }
                    else {
                        _this.vueEachArray[index](to, from, function (uniNextTo) {
                            next(nextTo);
                        });
                    }
                }, _this.router, true);
            }
        };
    };
    return MyArray;
}(Array));
exports.MyArray = MyArray;
function proxyEachHook(router, vueRouter) {
    var hookList = ['beforeHooks', 'afterHooks'];
    for (var i = 0; i < hookList.length; i++) {
        var hookName = hookList[i];
        var myEachHook = router.lifeCycle[hookName][0];
        if (myEachHook) {
            var vueEachArray = vueRouter[hookName];
            vueRouter[hookName] = new MyArray(router, vueEachArray, myEachHook, hookName);
        }
    }
}
exports.proxyEachHook = proxyEachHook;
function proxyH5Mount(router) {
    var _a;
    if (router.mount.length === 0) {
        if ((_a = router.options.h5) === null || _a === void 0 ? void 0 : _a.vueRouterDev) {
            return;
        }
        var uAgent = navigator.userAgent;
        var isIos = !!uAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isIos) {
            // 【Fixe】 https://github.com/SilurianYang/uni-simple-router/issues/109
            setTimeout(function () {
                var element = document.getElementsByTagName('uni-page');
                if (element.length > 0) {
                    return false;
                }
                window.location.reload();
            }, 0);
        }
    }
    else {
        var app = router.mount[0].app;
        app.$mount();
        router.mount = [];
    }
}
exports.proxyH5Mount = proxyH5Mount;


/***/ }),

/***/ "./src/app/appPatch.ts":
/*!*****************************!*\
  !*** ./src/app/appPatch.ts ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__ */
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.runtimeQuit = exports.registerLoddingPage = void 0;
var quitBefore = null;
function registerLoddingPage(router) {
    var _a = router.options.APP, loddingPageHook = _a.loddingPageHook, loddingPageStyle = _a.loddingPageStyle; // 获取app所有配置
    var view = new plus.nativeObj.View('router-loadding', __assign({ top: '0px', left: '0px', height: '100%', width: '100%' }, loddingPageStyle()));
    loddingPageHook(view); // 触发等待页面生命周期
}
exports.registerLoddingPage = registerLoddingPage;
function runtimeQuit(title) {
    if (title === void 0) { title = '再按一次退出应用'; }
    var nowTime = +new Date();
    if (!quitBefore) {
        quitBefore = nowTime;
        uni.showToast({
            title: title,
            icon: 'none',
            position: 'bottom',
            duration: 1000
        });
        setTimeout(function () { quitBefore = null; }, 1000);
    }
    else {
        if (nowTime - quitBefore < 1000) {
            plus.runtime.quit();
        }
    }
}
exports.runtimeQuit = runtimeQuit;


/***/ }),

/***/ "./src/applets/appletPatch.ts":
/*!************************************!*\
  !*** ./src/applets/appletPatch.ts ***!
  \************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export getEnterPath [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getEnterPath = void 0;
function getEnterPath(vueVim, router) {
    switch (router.options.platform) {
        case 'mp-alipay':
        case 'mp-weixin':
        case 'mp-toutiao':
        case 'mp-qq':
            return vueVim.$options.mpInstance.route;
        case 'mp-baidu':
            // 【Fixe】 https://github.com/SilurianYang/uni-simple-router/issues/251
            return vueVim.$options.mpInstance.is || vueVim.$options.mpInstance.pageinstance.route;
    }
    return vueVim.$options.mpInstance.route; // 这是暂时的 因为除了以上的小程序 其他没测试 先这样写
}
exports.getEnterPath = getEnterPath;


/***/ }),

/***/ "./src/helpers/config.ts":
/*!*******************************!*\
  !*** ./src/helpers/config.ts ***!
  \*******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.notCallProxyHook = exports.proxyVueSortHookName = exports.indexProxyHook = exports.appProxyHook = exports.lifeCycle = exports.baseConfig = exports.keyword = exports.mpPlatformReg = void 0;
var warn_1 = __webpack_require__(/*! ./warn */ "./src/helpers/warn.ts");
var utils_1 = __webpack_require__(/*! ./utils */ "./src/helpers/utils.ts");
exports.mpPlatformReg = /(^mp-weixin$)|(^mp-baidu$)|(^mp-alipay$)|(^mp-toutiao$)|(^mp-qq$)|(^mp-360$)/g;
exports.keyword = ['query'];
exports.baseConfig = {
    h5: {
        paramsToQuery: false,
        vueRouterDev: false,
        vueNext: false,
        mode: 'hash',
        base: '/',
        linkActiveClass: 'router-link-active',
        linkExactActiveClass: 'router-link-exact-active',
        scrollBehavior: function (to, from, savedPostion) { return ({ x: 0, y: 0 }); },
        fallback: true
    },
    APP: {
        loddingPageStyle: function () { return JSON.parse('{"backgroundColor":"#FFF"}'); },
        loddingPageHook: function (view) { view.show(); },
        launchedHook: function () { plus.navigator.closeSplashscreen(); },
        animation: {}
    },
    platform: 'h5',
    keepUniOriginNav: false,
    debugger: false,
    routerBeforeEach: function (to, from, next) { next(); },
    routerAfterEach: function (to, from) { },
    routerErrorEach: function (error, router) { router.$lockStatus = false; warn_1.err(error, router, true); },
    detectBeforeLock: function (router, to, navType) { },
    routes: [
        {
            path: '/choose-location'
        },
        {
            path: '/open-location'
        },
        {
            path: '/preview-image'
        }
    ]
};
exports.lifeCycle = {
    beforeHooks: [],
    afterHooks: [],
    routerBeforeHooks: [],
    routerAfterHooks: [],
    routerErrorHooks: []
};
exports.appProxyHook = {
    app: {
        created: [],
        beforeMount: [],
        mounted: [],
        onLaunch: [],
        onShow: [],
        onHide: [],
        beforeDestroy: [],
        destroyed: []
    }
};
exports.indexProxyHook = {
    app: exports.appProxyHook.app,
    page: (function (appHooks) {
        // eslint-disable-next-line no-unused-vars
        var onLaunch = appHooks.onLaunch, otherHooks = __rest(appHooks, ["onLaunch"]);
        return __assign(__assign({}, otherHooks), { onLoad: [], onReady: [], onUnload: [], onResize: [] });
    })(utils_1.copyData(exports.appProxyHook.app)),
    component: []
};
exports.proxyVueSortHookName = {
    app: ['created', 'beforeMount', 'mounted', 'onLaunch', 'onShow', 'onHide', 'beforeDestroy', 'destroyed'],
    page: ['created', 'beforeMount', 'mounted', 'onLoad', 'onReady', 'onShow', 'onResize', 'onHide', 'beforeDestroy', 'destroyed', 'onUnload'],
    component: ['created', 'beforeMount', 'mounted', 'beforeDestroy', 'destroyed']
};
exports.notCallProxyHook = [
    'onHide', 'beforeDestroy', 'destroyed', 'destroyed', 'onUnload', 'onResize'
];


/***/ }),

/***/ "./src/helpers/createRouteMap.ts":
/*!***************************************!*\
  !*** ./src/helpers/createRouteMap.ts ***!
  \***************************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export createRouteMap [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createRouteMap = void 0;
var warn_1 = __webpack_require__(/*! ./warn */ "./src/helpers/warn.ts");
var utils_1 = __webpack_require__(/*! ./utils */ "./src/helpers/utils.ts");
function createRouteMap(router, routes) {
    var routesMap = {
        finallyPathList: [],
        finallyPathMap: Object.create(null),
        aliasPathMap: Object.create(null),
        pathMap: Object.create(null),
        vueRouteMap: Object.create(null),
        nameMap: Object.create(null)
    };
    routes.forEach(function (route) {
        var _a = utils_1.getRoutePath(route, router), finallyPath = _a.finallyPath, aliasPath = _a.aliasPath, path = _a.path;
        if (path == null) {
            throw new Error("\u8BF7\u63D0\u4F9B\u4E00\u4E2A\u5B8C\u6574\u7684\u8DEF\u7531\u5BF9\u8C61\uFF0C\u5305\u62EC\u4EE5\u7EDD\u5BF9\u8DEF\u5F84\u5F00\u59CB\u7684 \u2018path\u2019 \u5B57\u7B26\u4E32 " + JSON.stringify(route));
        }
        if (finallyPath instanceof Array) {
            if (!router.options.h5.vueRouterDev && router.options.platform === 'h5') {
                throw new Error("\u975E vueRouterDev \u6A21\u5F0F\u4E0B\uFF0Croute.alias \u76EE\u524D\u65E0\u6CD5\u63D0\u4F9B\u6570\u7EC4\u7C7B\u578B\uFF01 " + JSON.stringify(route));
            }
        }
        var strFinallyPath = finallyPath;
        var strAliasPath = aliasPath;
        if (router.options.platform !== 'h5') {
            if (strFinallyPath.indexOf('/') !== 0 && path !== '*') {
                warn_1.warn("\u5F53\u524D\u8DEF\u7531\u5BF9\u8C61\u4E0B\uFF0Croute\uFF1A" + JSON.stringify(route) + " \u662F\u5426\u7F3A\u5C11\u4E86\u524D\u7F00 \u2018/\u2019", router, true);
            }
        }
        if (!routesMap.finallyPathMap[strFinallyPath]) {
            routesMap.finallyPathMap[strFinallyPath] = route;
            routesMap.aliasPathMap[strAliasPath] = route;
            routesMap.pathMap[path] = route;
            routesMap.finallyPathList.push(strFinallyPath);
            if (route.name != null) {
                routesMap.nameMap[route.name] = route;
            }
        }
    });
    return routesMap;
}
exports.createRouteMap = createRouteMap;


/***/ }),

/***/ "./src/helpers/lifeCycle.ts":
/*!**********************************!*\
  !*** ./src/helpers/lifeCycle.ts ***!
  \**********************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export registerEachHooks [provided] [no usage info] [missing usage info prevents renaming] */
/*! export registerHook [provided] [no usage info] [missing usage info prevents renaming] */
/*! export registerRouterHooks [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerEachHooks = exports.registerRouterHooks = exports.registerHook = void 0;
var base_1 = __webpack_require__(/*! ../options/base */ "./src/options/base.ts");
var hooks_1 = __webpack_require__(/*! ../public/hooks */ "./src/public/hooks.ts");
function registerHook(list, fn) {
    list[0] = fn;
}
exports.registerHook = registerHook;
function registerRouterHooks(cycleHooks, options) {
    registerHook(cycleHooks.routerBeforeHooks, function (to, from, next) {
        options.routerBeforeEach(to, from, next);
    });
    registerHook(cycleHooks.routerAfterHooks, function (to, from) {
        options.routerAfterEach(to, from);
    });
    registerHook(cycleHooks.routerErrorHooks, function (error, router) {
        options.routerErrorEach(error, router);
    });
    return cycleHooks;
}
exports.registerRouterHooks = registerRouterHooks;
function registerEachHooks(router, hookType, userGuard) {
    registerHook(router.lifeCycle[hookType], function (to, from, next, router, auto) {
        if (auto) { // h5端 vue-router自动触发 非自己调用触发
            hooks_1.onTriggerEachHook(to, from, router, base_1.hookToggle[hookType], next);
        }
        else {
            userGuard(to, from, next);
        }
    });
}
exports.registerEachHooks = registerEachHooks;


/***/ }),

/***/ "./src/helpers/mixins.ts":
/*!*******************************!*\
  !*** ./src/helpers/mixins.ts ***!
  \*******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initMixins = exports.getMixins = void 0;
var createRouteMap_1 = __webpack_require__(/*! ../helpers/createRouteMap */ "./src/helpers/createRouteMap.ts");
var buildRouter_1 = __webpack_require__(/*! ../H5/buildRouter */ "./src/H5/buildRouter.ts");
var proxyHook_1 = __webpack_require__(/*! ../H5/proxyHook */ "./src/H5/proxyHook.ts");
var config_1 = __webpack_require__(/*! ./config */ "./src/helpers/config.ts");
var appPatch_1 = __webpack_require__(/*! ../app/appPatch */ "./src/app/appPatch.ts");
var page_1 = __webpack_require__(/*! ../public/page */ "./src/public/page.ts");
var methods_1 = __webpack_require__(/*! ../public/methods */ "./src/public/methods.ts");
var utils_1 = __webpack_require__(/*! ./utils */ "./src/helpers/utils.ts");
var appletPatch_1 = __webpack_require__(/*! ../applets/appletPatch */ "./src/applets/appletPatch.ts");
var registerRouter = false;
var onloadProxyOk = false;
var appletProxy = {
    app: false,
    page: ''
};
function getMixins(Vue, router) {
    var platform = router.options.platform;
    if (config_1.mpPlatformReg.test(platform)) {
        platform = 'app-lets';
    }
    var toggleHooks = {
        h5: {
            beforeCreate: function () {
                var _a;
                if (this.$options.router) {
                    router.$route = this.$options.router; // 挂载vue-router到路由对象下
                    var vueRouteMap = [];
                    if ((_a = router.options.h5) === null || _a === void 0 ? void 0 : _a.vueRouterDev) {
                        vueRouteMap = router.options.routes;
                    }
                    else {
                        vueRouteMap = createRouteMap_1.createRouteMap(router, this.$options.router.options.routes).finallyPathMap;
                        router.routesMap.vueRouteMap = vueRouteMap;
                        buildRouter_1.buildVueRoutes(router, vueRouteMap);
                    }
                    buildRouter_1.buildVueRouter(router, this.$options.router, vueRouteMap);
                    proxyHook_1.proxyEachHook(router, this.$options.router);
                }
            }
        },
        'app-plus': {
            beforeCreate: function () {
                if (!registerRouter) {
                    registerRouter = true;
                    page_1.proxyPageHook(this, router, 'appProxyHook', 'app');
                    appPatch_1.registerLoddingPage(router);
                }
            }
        },
        'app-lets': {
            beforeCreate: function () {
                var pageType = this.$options.mpType;
                if (pageType === 'component' && !onloadProxyOk) {
                    var isProxy = utils_1.assertParentChild(appletProxy['page'], this);
                    if (isProxy) {
                        page_1.proxyPageHook(this, router, 'appletsProxyHook', pageType);
                    }
                }
                else if (pageType !== 'component') {
                    if (!appletProxy[pageType]) { // 没有处理
                        if (pageType === 'page') {
                            appletProxy[pageType] = appletPatch_1.getEnterPath(this, router);
                            router.enterPath = appletProxy[pageType]; // 我不确定在不同端是否都是同样的变现？可能有的为非绝对路径？
                        }
                        else {
                            appletProxy[pageType] = true;
                        }
                        page_1.proxyPageHook(this, router, 'appletsProxyHook', pageType);
                    }
                }
            },
            onLoad: function () {
                if (!onloadProxyOk && utils_1.assertParentChild(appletProxy['page'], this)) {
                    onloadProxyOk = true;
                    methods_1.forceGuardEach(router);
                }
            }
        }
    };
    return toggleHooks[platform];
}
exports.getMixins = getMixins;
function initMixins(Vue, router) {
    var routesMap = createRouteMap_1.createRouteMap(router, router.options.routes);
    router.routesMap = routesMap; // 挂载自身路由表到路由对象下
    // Vue.util.defineReactive(router, '_Route', createRoute(router, 19970806))
    Vue.mixin(__assign({}, getMixins(Vue, router)));
}
exports.initMixins = initMixins;


/***/ }),

/***/ "./src/helpers/utils.ts":
/*!******************************!*\
  !*** ./src/helpers/utils.ts ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resolveAbsolutePath = exports.assertParentChild = exports.reservedWord = exports.resetPageHook = exports.callHook = exports.replaceHook = exports.lockDetectWarn = exports.deepClone = exports.baseClone = exports.assertDeepObject = exports.paramsToQuery = exports.forMatNextToFrom = exports.urlToJson = exports.getUniCachePage = exports.copyData = exports.getDataType = exports.routesForMapRoute = exports.assertNewOptions = exports.getRoutePath = exports.notDeepClearNull = exports.mergeConfig = exports.def = exports.voidFun = void 0;
var config_1 = __webpack_require__(/*! ../helpers/config */ "./src/helpers/config.ts");
var hooks_1 = __webpack_require__(/*! ../public/hooks */ "./src/public/hooks.ts");
var warn_1 = __webpack_require__(/*! ../helpers/warn */ "./src/helpers/warn.ts");
var methods_1 = __webpack_require__(/*! ../public/methods */ "./src/public/methods.ts");
var Regexp = __webpack_require__(/*! path-to-regexp */ "./node_modules/path-to-regexp/index.js");
function voidFun() { }
exports.voidFun = voidFun;
function def(defObject, key, getValue) {
    Object.defineProperty(defObject, key, {
        get: function () {
            return getValue();
        }
    });
}
exports.def = def;
function mergeConfig(baseConfig, userConfig) {
    var config = Object.create(null);
    var baseConfigKeys = Object.keys(baseConfig).concat(['resolveQuery', 'parseQuery']);
    for (var i = 0; i < baseConfigKeys.length; i += 1) {
        var key = baseConfigKeys[i];
        if (userConfig[key] != null) {
            if (userConfig[key].constructor === Object) {
                config[key] = __assign(__assign({}, baseConfig[key]), userConfig[key]);
            }
            else if (key === 'routes') {
                config[key] = __spreadArrays(baseConfig[key], userConfig[key]);
            }
            else {
                config[key] = userConfig[key];
            }
        }
        else {
            config[key] = baseConfig[key];
        }
    }
    return config;
}
exports.mergeConfig = mergeConfig;
function notDeepClearNull(object) {
    for (var key in object) {
        if (object[key] == null) {
            delete object[key];
        }
    }
    return object;
}
exports.notDeepClearNull = notDeepClearNull;
function getRoutePath(route, router) {
    var finallyPath = route.aliasPath || route.alias || route.path;
    if (router.options.platform !== 'h5') {
        finallyPath = route.path;
    }
    return {
        finallyPath: finallyPath,
        aliasPath: route.aliasPath || route.path,
        path: route.path,
        alias: route.alias
    };
}
exports.getRoutePath = getRoutePath;
function assertNewOptions(options) {
    var _a;
    var platform = options.platform, routes = options.routes;
    if (platform == null) {
        throw new Error("\u4F60\u5728\u5B9E\u4F8B\u5316\u8DEF\u7531\u65F6\u5FC5\u987B\u4F20\u9012 'platform'");
    }
    if (routes == null || routes.length === 0) {
        throw new Error("\u4F60\u5728\u5B9E\u4F8B\u5316\u8DEF\u7531\u65F6\u5FC5\u987B\u4F20\u9012 routes \u4E3A\u7A7A\uFF0C\u8FD9\u662F\u65E0\u610F\u4E49\u7684\u3002");
    }
    if (options.platform === 'h5') {
        if ((_a = options.h5) === null || _a === void 0 ? void 0 : _a.vueRouterDev) {
            config_1.baseConfig.routes = [];
        }
    }
    var mergeOptions = mergeConfig(config_1.baseConfig, options);
    return mergeOptions;
}
exports.assertNewOptions = assertNewOptions;
function routesForMapRoute(router, path, mapArrayKey) {
    var _a;
    if ((_a = router.options.h5) === null || _a === void 0 ? void 0 : _a.vueRouterDev) {
        return { path: path };
    }
    var wildcard = '';
    var routesMap = router.routesMap;
    for (var i = 0; i < mapArrayKey.length; i++) {
        var mapKey = mapArrayKey[i];
        var mapList = routesMap[mapKey];
        for (var _i = 0, _b = Object.entries(mapList); _i < _b.length; _i++) {
            var _c = _b[_i], key = _c[0], value = _c[1];
            if (key === '*') {
                if (wildcard === '') {
                    wildcard = '*';
                }
                continue;
            }
            var route = value;
            var rule = key;
            if (getDataType(mapList) === '[object Array]') {
                rule = route;
            }
            var pathRule = Regexp(rule);
            var result = pathRule.exec(path);
            if (result != null) {
                if (getDataType(route) === '[object String]') {
                    return routesMap.finallyPathMap[route];
                }
                return route;
            }
        }
    }
    if (wildcard !== '') {
        return routesMap.finallyPathMap[wildcard];
    }
    throw new Error(path + " \u8DEF\u5F84\u65E0\u6CD5\u5728\u8DEF\u7531\u8868\u4E2D\u627E\u5230\uFF01\u68C0\u67E5\u8DF3\u8F6C\u8DEF\u5F84\u53CA\u8DEF\u7531\u8868");
}
exports.routesForMapRoute = routesForMapRoute;
function getDataType(data) {
    return Object.prototype.toString.call(data);
}
exports.getDataType = getDataType;
function copyData(object) {
    return JSON.parse(JSON.stringify(object));
}
exports.copyData = copyData;
function getUniCachePage(pageIndex) {
    var pages = getCurrentPages();
    if (pageIndex == null) {
        return pages;
    }
    if (pages.length === 0) {
        return pages;
    }
    var page = pages.reverse()[pageIndex];
    if (page == null) {
        return [];
    }
    return page;
}
exports.getUniCachePage = getUniCachePage;
function urlToJson(url) {
    var query = {};
    var _a = url.split('?'), path = _a[0], params = _a[1];
    if (params != null) {
        var parr = params.split('&');
        for (var _i = 0, parr_1 = parr; _i < parr_1.length; _i++) {
            var i = parr_1[_i];
            var arr = i.split('=');
            query[arr[0]] = arr[1];
        }
    }
    return {
        path: path,
        query: query
    };
}
exports.urlToJson = urlToJson;
function forMatNextToFrom(router, to, from) {
    var _a = [to, from], matTo = _a[0], matFrom = _a[1];
    if (router.options.platform === 'h5') {
        var _b = router.options.h5, vueNext = _b.vueNext, vueRouterDev = _b.vueRouterDev;
        if (!vueNext && !vueRouterDev) {
            matTo = methods_1.createRoute(router, undefined, matTo);
            matFrom = methods_1.createRoute(router, undefined, matFrom);
        }
    }
    else {
        matTo = methods_1.createRoute(router, undefined, deepClone(matTo));
        matFrom = methods_1.createRoute(router, undefined, deepClone(matFrom));
    }
    return {
        matTo: matTo,
        matFrom: matFrom
    };
}
exports.forMatNextToFrom = forMatNextToFrom;
function paramsToQuery(router, toRule) {
    var _a;
    if (router.options.platform === 'h5' && !((_a = router.options.h5) === null || _a === void 0 ? void 0 : _a.paramsToQuery)) {
        return toRule;
    }
    if (getDataType(toRule) === '[object Object]') {
        var _b = toRule, name_1 = _b.name, params = _b.params, moreToRule = __rest(_b, ["name", "params"]);
        var paramsQuery = params;
        if (router.options.platform !== 'h5' && paramsQuery == null) {
            paramsQuery = {};
        }
        if (name_1 != null && paramsQuery != null) {
            var route = router.routesMap.nameMap[name_1];
            if (route == null) {
                hooks_1.ERRORHOOK[0]({ type: 2, msg: "\u547D\u540D\u8DEF\u7531\u4E3A\uFF1A" + name_1 + " \u7684\u8DEF\u7531\uFF0C\u65E0\u6CD5\u5728\u8DEF\u7531\u8868\u4E2D\u627E\u5230\uFF01", toRule: toRule }, router);
            }
            var finallyPath = getRoutePath(route, router).finallyPath;
            if (finallyPath.includes(':')) { // 动态路由无法使用 paramsToQuery
                hooks_1.ERRORHOOK[0]({ type: 2, msg: "\u52A8\u6001\u8DEF\u7531\uFF1A" + finallyPath + " \u65E0\u6CD5\u4F7F\u7528 paramsToQuery\uFF01", toRule: toRule }, router);
            }
            else {
                return __assign(__assign({}, moreToRule), { path: finallyPath, query: paramsQuery });
            }
        }
    }
    return toRule;
}
exports.paramsToQuery = paramsToQuery;
function assertDeepObject(object) {
    var arrMark = null;
    try {
        arrMark = JSON.stringify(object).match(/\{|\[|\}|\]/g);
    }
    catch (error) {
        warn_1.warnLock("\u4F20\u9012\u7684\u53C2\u6570\u89E3\u6790\u5BF9\u8C61\u5931\u8D25\u3002" + error);
    }
    if (arrMark == null) {
        return false;
    }
    if (arrMark.length > 3) {
        return true;
    }
    return false;
}
exports.assertDeepObject = assertDeepObject;
function baseClone(source, target) {
    for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
        var key = _a[_i];
        var dyKey = key;
        if (source[key] === source)
            continue;
        if (typeof source[key] === 'object') {
            target[dyKey] = getDataType(source[key]) === '[object Array]' ? [] : {};
            baseClone(source[key], target[dyKey]);
        }
        else {
            target[dyKey] = source[key];
        }
    }
}
exports.baseClone = baseClone;
function deepClone(source) {
    var __ob__ = getDataType(source) === '[object Array]' ? [] : {};
    baseClone(source, __ob__);
    return __ob__;
}
exports.deepClone = deepClone;
function lockDetectWarn(router, to, navType, next, passiveType) {
    if (passiveType === 'afterHooks') {
        next();
    }
    else {
        var detectBeforeLock = router.options.detectBeforeLock;
        detectBeforeLock && detectBeforeLock(router, to, navType);
        if (router.$lockStatus) {
            router.options.routerErrorEach({
                type: 2,
                msg: '当前页面正在处于跳转状态，请稍后再进行跳转....'
            }, router);
        }
        else {
            next();
        }
    }
}
exports.lockDetectWarn = lockDetectWarn;
function replaceHook(router, vueVim, proxyHookKey, pageType) {
    var vueOptions = vueVim.$options;
    var proxyHook = router[proxyHookKey][pageType];
    var proxyHookChild = {};
    if (getDataType(proxyHook) === '[object Array]') {
        proxyHookChild = {
            beforeCreate: [],
            created: [],
            beforeMount: [],
            mounted: [],
            beforeDestroy: [],
            destroyed: []
        };
    }
    if (proxyHook != null) {
        var proxyName = config_1.proxyVueSortHookName[pageType];
        var _loop_1 = function (i) {
            var keyName = proxyName[i];
            var originHook = vueOptions[keyName];
            if (getDataType(originHook) === '[object Array]') {
                var proxyInfo_1 = {
                    options: [],
                    hook: Function
                };
                var hook_1 = originHook.splice(originHook.length - 1, 1, function () {
                    var options = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        options[_i] = arguments[_i];
                    }
                    return (proxyInfo_1.options = options);
                })[0];
                proxyInfo_1.hook = function resetHook(enterPath) {
                    if (router.enterPath.replace(/^\//, '') !== enterPath.replace(/^\//, '') && pageType !== 'app') {
                        return function () { };
                    }
                    if (!config_1.notCallProxyHook.includes(keyName)) {
                        hook_1.apply(vueVim, proxyInfo_1.options);
                    }
                    return function () {
                        originHook.splice(originHook.length - 1, 1, hook_1);
                    };
                };
                if (Object.keys(proxyHookChild).length > 0) {
                    proxyHookChild[keyName] = [proxyInfo_1];
                }
                else {
                    proxyHook[keyName] = [proxyInfo_1];
                }
            }
        };
        for (var i = 0; i < proxyName.length; i++) {
            _loop_1(i);
        }
        if (Object.keys(proxyHookChild).length > 0) {
            // @ts-ignore
            proxyHook.push(proxyHookChild);
        }
    }
}
exports.replaceHook = replaceHook;
function callHook(value, enterPath) {
    var resetHookFun = [];
    for (var _i = 0, _a = Object.entries(value); _i < _a.length; _i++) {
        var _b = _a[_i], origin_1 = _b[1][0];
        if (origin_1 && origin_1.hook) {
            resetHookFun.push(origin_1.hook(enterPath));
        }
    }
    return resetHookFun;
}
exports.callHook = callHook;
function resetPageHook(router, enterPath) {
    // Fixe: https://github.com/SilurianYang/uni-simple-router/issues/206
    var pathInfo = enterPath.trim().match(/^(\/?[^\?\s]+)(\?[\s\S]*$)?$/);
    if (pathInfo == null) {
        throw new Error("\u8FD8\u539Fhook\u5931\u8D25\u3002\u8BF7\u68C0\u67E5 \u3010" + enterPath + "\u3011 \u8DEF\u5F84\u662F\u5426\u6B63\u786E\u3002");
    }
    enterPath = pathInfo[1];
    var proxyHookKey = 'appletsProxyHook';
    if (router.options.platform === 'app-plus') {
        proxyHookKey = 'appProxyHook';
    }
    var resetHookFun = [];
    for (var _i = 0, _a = Object.entries(router[proxyHookKey]); _i < _a.length; _i++) {
        var _b = _a[_i], value = _b[1];
        if (getDataType(value) === '[object Array]') {
            for (var i = 0; i < value.length; i++) {
                resetHookFun = resetHookFun.concat(callHook(value[i], enterPath));
            }
        }
        else {
            resetHookFun = resetHookFun.concat(callHook(value, enterPath));
        }
    }
    setTimeout(function () {
        for (var i = 0; i < resetHookFun.length; i++) {
            resetHookFun[i]();
        }
    }, 500);
}
exports.resetPageHook = resetPageHook;
function reservedWord(params) {
    if (typeof params === 'string') {
        return params;
    }
    var query = __assign(__assign({}, copyData(params.params || {})), copyData(params.query || {}));
    for (var i = 0; i < config_1.keyword.length; i++) {
        var hasKey = config_1.keyword[i];
        if (Reflect.has(query, hasKey)) {
            if (getDataType(params.query) === '[object Object]') {
                delete params.query[hasKey];
            }
            if (getDataType(params.params) === '[object Object]') {
                delete params.params[hasKey];
            }
            warn_1.warnLock(JSON.stringify(config_1.keyword) + " \u4F5C\u4E3A\u63D2\u4EF6\u7684\u4FDD\u7559\u5B57\uFF0C\u5728\u53C2\u6570\u4F20\u9012\u4E2D\u4E0D\u5141\u8BB8\u4F7F\u7528\u3002\u5DF2\u81EA\u52A8\u88AB\u8FC7\u6EE4\u6389\uFF01\u6362\u4E2A\u53C2\u6570\u540D\u8BD5\u8BD5\u5427\uFF01 ");
        }
    }
    return params;
}
exports.reservedWord = reservedWord;
function assertParentChild(parentPath, vueVim) {
    while (vueVim.$parent != null) {
        var mpPage = vueVim.$parent.$mp;
        if (mpPage.page && mpPage.page.is === parentPath) {
            return true;
        }
        vueVim = vueVim.$parent;
    }
    try {
        if (vueVim.$mp.page.is === parentPath || vueVim.$mp.page.route === parentPath) {
            return true;
        }
    }
    catch (error) {
        return false;
    }
    return false;
}
exports.assertParentChild = assertParentChild;
function resolveAbsolutePath(path, router) {
    var reg = /^\/?([^\?\s]+)(\?.+)?$/;
    var trimPath = path.trim();
    if (!reg.test(trimPath)) {
        throw new Error("\u3010" + path + "\u3011 \u8DEF\u5F84\u9519\u8BEF\uFF0C\u8BF7\u63D0\u4F9B\u5B8C\u6574\u7684\u8DEF\u5F84(10001)\u3002");
    }
    var paramsArray = trimPath.match(reg);
    if (paramsArray == null) {
        throw new Error("\u3010" + path + "\u3011 \u8DEF\u5F84\u9519\u8BEF\uFF0C\u8BF7\u63D0\u4F9B\u5B8C\u6574\u7684\u8DEF\u5F84(10002)\u3002");
    }
    var query = paramsArray[2] || '';
    if (/^\.\/[^\.]+/.test(trimPath)) { // 当前路径下
        var navPath = router.currentRoute.path + path;
        return navPath.replace(/[^\/]+\.\//, '');
    }
    var relative = paramsArray[1].replace(/\//g, "\\/").replace(/\.\./g, "[^\\/]+").replace(/\./g, '\\.');
    var relativeReg = new RegExp("^\\/" + relative + "$");
    var route = router.options.routes.filter(function (it) { return relativeReg.test(it.path); });
    if (route.length !== 1) {
        throw new Error("\u3010" + path + "\u3011 \u8DEF\u5F84\u9519\u8BEF\uFF0C\u5C1D\u8BD5\u8F6C\u6210\u7EDD\u5BF9\u8DEF\u5F84\u5931\u8D25\uFF0C\u8BF7\u624B\u52A8\u8F6C\u6210\u7EDD\u5BF9\u8DEF\u5F84(10003)\u3002");
    }
    return route[0].path + query;
}
exports.resolveAbsolutePath = resolveAbsolutePath;


/***/ }),

/***/ "./src/helpers/warn.ts":
/*!*****************************!*\
  !*** ./src/helpers/warn.ts ***!
  \*****************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export err [provided] [no usage info] [missing usage info prevents renaming] */
/*! export isLog [provided] [no usage info] [missing usage info prevents renaming] */
/*! export log [provided] [no usage info] [missing usage info prevents renaming] */
/*! export warn [provided] [no usage info] [missing usage info prevents renaming] */
/*! export warnLock [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.warnLock = exports.log = exports.warn = exports.err = exports.isLog = void 0;
function isLog(type, dev, errText, enforce) {
    if (enforce === void 0) { enforce = false; }
    if (!enforce) {
        var isObject = dev.toString() === '[object Object]';
        if (dev === false) {
            return false;
        }
        else if (isObject) {
            if (dev[type] === false) {
                return false;
            }
        }
    }
    console[type](errText);
    return true;
}
exports.isLog = isLog;
function err(errText, router, enforce) {
    var dev = router.options.debugger;
    isLog('error', dev, errText, enforce);
}
exports.err = err;
function warn(errText, router, enforce) {
    var dev = router.options.debugger;
    isLog('warn', dev, errText, enforce);
}
exports.warn = warn;
function log(errText, router, enforce) {
    var dev = router.options.debugger;
    isLog('log', dev, errText, enforce);
}
exports.log = log;
function warnLock(errText) {
    console.warn(errText);
}
exports.warnLock = warnLock;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createRouter = exports.RouterMount = exports.runtimeQuit = void 0;
__exportStar(__webpack_require__(/*! ./options/base */ "./src/options/base.ts"), exports);
__exportStar(__webpack_require__(/*! ./options/config */ "./src/options/config.ts"), exports);
var appPatch_1 = __webpack_require__(/*! ./app/appPatch */ "./src/app/appPatch.ts");
Object.defineProperty(exports, "runtimeQuit", ({ enumerable: true, get: function () { return appPatch_1.runtimeQuit; } }));
var router_1 = __webpack_require__(/*! ./public/router */ "./src/public/router.ts");
Object.defineProperty(exports, "RouterMount", ({ enumerable: true, get: function () { return router_1.RouterMount; } }));
Object.defineProperty(exports, "createRouter", ({ enumerable: true, get: function () { return router_1.createRouter; } }));


/***/ }),

/***/ "./src/options/base.ts":
/*!*****************************!*\
  !*** ./src/options/base.ts ***!
  \*****************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export hookToggle [provided] [no usage info] [missing usage info prevents renaming] */
/*! export navtypeToggle [provided] [no usage info] [missing usage info prevents renaming] */
/*! export rewriteMethodToggle [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rewriteMethodToggle = exports.navtypeToggle = exports.hookToggle = void 0;
var hookToggle;
(function (hookToggle) {
    hookToggle["beforeHooks"] = "beforeEach";
    hookToggle["afterHooks"] = "afterEach";
    hookToggle["enterHooks"] = "beforeEnter";
})(hookToggle = exports.hookToggle || (exports.hookToggle = {}));
var navtypeToggle;
(function (navtypeToggle) {
    navtypeToggle["push"] = "navigateTo";
    navtypeToggle["replace"] = "redirectTo";
    navtypeToggle["replaceAll"] = "reLaunch";
    navtypeToggle["pushTab"] = "switchTab";
    navtypeToggle["back"] = "navigateBack";
})(navtypeToggle = exports.navtypeToggle || (exports.navtypeToggle = {}));
var rewriteMethodToggle;
(function (rewriteMethodToggle) {
    rewriteMethodToggle["navigateTo"] = "push";
    rewriteMethodToggle["navigate"] = "push";
    rewriteMethodToggle["redirectTo"] = "replace";
    rewriteMethodToggle["reLaunch"] = "replaceAll";
    rewriteMethodToggle["switchTab"] = "pushTab";
    rewriteMethodToggle["navigateBack"] = "back";
})(rewriteMethodToggle = exports.rewriteMethodToggle || (exports.rewriteMethodToggle = {}));


/***/ }),

/***/ "./src/options/config.ts":
/*!*******************************!*\
  !*** ./src/options/config.ts ***!
  \*******************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./src/public/hooks.ts":
/*!*****************************!*\
  !*** ./src/public/hooks.ts ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loopCallHook = exports.transitionTo = exports.onTriggerEachHook = exports.callHook = exports.callBeforeRouteLeave = exports.HOOKLIST = exports.ERRORHOOK = void 0;
var utils_1 = __webpack_require__(/*! ../helpers/utils */ "./src/helpers/utils.ts");
var methods_1 = __webpack_require__(/*! ./methods */ "./src/public/methods.ts");
var proxyHook_1 = __webpack_require__(/*! ../H5/proxyHook */ "./src/H5/proxyHook.ts");
exports.ERRORHOOK = [
    function (error, router) { return router.lifeCycle.routerErrorHooks[0](error, router); }
];
exports.HOOKLIST = [
    function (router, to, from, toRoute, next) { return callHook(router.lifeCycle.routerBeforeHooks[0], to, from, router, next); },
    function (router, to, from, toRoute, next) { return callBeforeRouteLeave(router, to, from, next); },
    function (router, to, from, toRoute, next) { return callHook(router.lifeCycle.beforeHooks[0], to, from, router, next); },
    function (router, to, from, toRoute, next) { return callHook(toRoute.beforeEnter, to, from, router, next); },
    function (router, to, from, toRoute, next) { return callHook(router.lifeCycle.afterHooks[0], to, from, router, next, false); },
    function (router, to, from, toRoute, next) {
        router.$lockStatus = false;
        if (router.options.platform === 'h5') {
            proxyHook_1.proxyH5Mount(router);
        }
        return callHook(router.lifeCycle.routerAfterHooks[0], to, from, router, next, false);
    }
];
function callBeforeRouteLeave(router, to, from, resolve) {
    var page = utils_1.getUniCachePage(0);
    var beforeRouteLeave;
    if (Object.keys(page).length > 0) {
        var leaveHooks = void 0;
        if (router.options.platform === 'h5') {
            leaveHooks = page.$options.beforeRouteLeave;
        }
        else {
            if (page.$vm != null) {
                leaveHooks = page.$vm.$options.beforeRouteLeave;
            }
        }
        switch (utils_1.getDataType(leaveHooks)) {
            case '[object Array]': // h5端表现
                beforeRouteLeave = leaveHooks[0];
                beforeRouteLeave = beforeRouteLeave.bind(page);
                break;
            case '[object Function]': // 目前app端表现
                beforeRouteLeave = leaveHooks.bind(page.$vm);
                break;
        }
    }
    return callHook(beforeRouteLeave, to, from, router, resolve);
}
exports.callBeforeRouteLeave = callBeforeRouteLeave;
function callHook(hook, to, from, router, resolve, hookAwait) {
    if (hookAwait === void 0) { hookAwait = true; }
    if (hook != null && hook instanceof Function) {
        if (hookAwait === true) {
            hook(to, from, resolve, router, false);
        }
        else {
            hook(to, from, function () { }, router, false);
            resolve();
        }
    }
    else {
        resolve();
    }
}
exports.callHook = callHook;
function onTriggerEachHook(to, from, router, hookType, next) {
    var callHookList = [];
    switch (hookType) {
        case 'beforeEach':
            callHookList = exports.HOOKLIST.slice(0, 3);
            break;
        case 'afterEach':
            callHookList = exports.HOOKLIST.slice(4);
            break;
        case 'beforeEnter':
            callHookList = exports.HOOKLIST.slice(3, 4);
            break;
    }
    transitionTo(router, to, from, 'push', callHookList, next);
}
exports.onTriggerEachHook = onTriggerEachHook;
function transitionTo(router, to, from, navType, callHookList, hookCB) {
    var _a = utils_1.forMatNextToFrom(router, to, from), matTo = _a.matTo, matFrom = _a.matFrom;
    if (router.options.platform === 'h5') {
        loopCallHook(callHookList, 0, hookCB, router, matTo, matFrom, navType);
    }
    else {
        loopCallHook(callHookList.slice(0, 4), 0, function () {
            hookCB(function () {
                loopCallHook(callHookList.slice(4), 0, utils_1.voidFun, router, matTo, matFrom, navType);
            });
        }, router, matTo, matFrom, navType);
    }
}
exports.transitionTo = transitionTo;
function loopCallHook(hooks, index, next, router, matTo, matFrom, navType) {
    var toRoute = utils_1.routesForMapRoute(router, matTo.path, ['finallyPathMap', 'pathMap']);
    if (hooks.length - 1 < index) {
        return next();
    }
    var hook = hooks[index];
    var errHook = exports.ERRORHOOK[0];
    hook(router, matTo, matFrom, toRoute, function (nextTo) {
        if (nextTo === false) {
            if (router.options.platform === 'h5') {
                next(false);
            }
            errHook({ type: 0, msg: '管道函数传递 false 导航被终止!', matTo: matTo, matFrom: matFrom, nextTo: nextTo }, router);
        }
        else if (typeof nextTo === 'string' || typeof nextTo === 'object') {
            var newNavType = navType;
            var newNextTo = nextTo;
            if (typeof nextTo === 'object') {
                var type = nextTo.NAVTYPE, moreTo = __rest(nextTo, ["NAVTYPE"]);
                newNextTo = moreTo;
                if (type != null) {
                    newNavType = type;
                }
            }
            methods_1.navjump(newNextTo, router, newNavType, { from: matFrom, next: next });
        }
        else if (nextTo == null) {
            index++;
            loopCallHook(hooks, index, next, router, matTo, matFrom, navType);
        }
        else {
            errHook({ type: 1, msg: '管道函数传递未知类型，无法被识别。导航被终止！', matTo: matTo, matFrom: matFrom, nextTo: nextTo }, router);
        }
    });
}
exports.loopCallHook = loopCallHook;


/***/ }),

/***/ "./src/public/methods.ts":
/*!*******************************!*\
  !*** ./src/public/methods.ts ***!
  \*******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createRoute = exports.forceGuardEach = exports.backOptionsBuild = exports.navjump = exports.lockNavjump = void 0;
var base_1 = __webpack_require__(/*! ../options/base */ "./src/options/base.ts");
var query_1 = __webpack_require__(/*! ./query */ "./src/public/query.ts");
var utils_1 = __webpack_require__(/*! ../helpers/utils */ "./src/helpers/utils.ts");
var hooks_1 = __webpack_require__(/*! ./hooks */ "./src/public/hooks.ts");
var page_1 = __webpack_require__(/*! ../public/page */ "./src/public/page.ts");
var hooks_2 = __webpack_require__(/*! ./hooks */ "./src/public/hooks.ts");
function lockNavjump(to, router, navType, forceNav, animation) {
    utils_1.lockDetectWarn(router, to, navType, function () {
        if (router.options.platform !== 'h5') {
            router.$lockStatus = true;
        }
        navjump(to, router, navType, undefined, forceNav, animation);
    });
}
exports.lockNavjump = lockNavjump;
function navjump(to, router, navType, nextCall, forceNav, animation) {
    if (navType === 'back') {
        var level = 1;
        if (typeof to === 'string') {
            level = +to;
        }
        else {
            level = to.delta || 1;
        }
        if (router.options.platform === 'h5') {
            router.$route.go(-level);
            return;
        }
        else {
            to = backOptionsBuild(router, level, animation);
        }
    }
    to = utils_1.reservedWord(to);
    var rule = query_1.queryPageToMap(to, router).rule;
    rule.type = base_1.navtypeToggle[navType];
    var toRule = utils_1.paramsToQuery(router, rule);
    var parseToRule = query_1.resolveQuery(toRule, router);
    if (router.options.platform === 'h5') {
        if (navType !== 'push') {
            navType = 'replace';
        }
        if (nextCall != null) { // next 管道函数拦截时 直接next即可
            nextCall.next(__assign({ replace: navType !== 'push' }, parseToRule));
        }
        else {
            // Fixe  https://github.com/SilurianYang/uni-simple-router/issues/240   2021年3月7日14:45:36
            if (navType === 'push' && Reflect.has(parseToRule, 'events')) {
                if (Reflect.has(parseToRule, 'name')) {
                    throw new Error("\u5728h5\u7AEF\u4E0A\u4F7F\u7528 'push'\u3001'navigateTo' \u8DF3\u8F6C\u65F6\uFF0C\u5982\u679C\u5305\u542B events \u4E0D\u5141\u8BB8\u4F7F\u7528 name \u8DF3\u8F6C\uFF0C\u56E0\u4E3A name \u5B9E\u73B0\u4E86\u52A8\u6001\u8DEF\u7531\u3002\u8BF7\u66F4\u6362\u4E3A path \u6216\u8005 url \u8DF3\u8F6C\uFF01");
                }
                else {
                    uni['navigateTo'](parseToRule, true, utils_1.voidFun, forceNav);
                }
            }
            else {
                router.$route[navType](parseToRule, parseToRule.success || utils_1.voidFun, parseToRule.fail || utils_1.voidFun);
            }
        }
    }
    else {
        var from = { path: '' };
        if (nextCall == null) {
            var toRoute = utils_1.routesForMapRoute(router, parseToRule.path, ['finallyPathMap', 'pathMap']);
            parseToRule = __assign(__assign(__assign({}, toRoute), { params: {} }), parseToRule);
            from = page_1.createToFrom(parseToRule, router);
        }
        else {
            from = nextCall.from;
        }
        page_1.createFullPath(parseToRule, from);
        hooks_1.transitionTo(router, parseToRule, from, navType, hooks_2.HOOKLIST, function (callOkCb) {
            uni[base_1.navtypeToggle[navType]](parseToRule, true, callOkCb, forceNav);
        });
    }
}
exports.navjump = navjump;
function backOptionsBuild(router, level, animation) {
    var toRule = createRoute(router, level);
    var navjumpRule = {
        path: toRule.path,
        query: toRule.query,
        delta: level
    };
    if (utils_1.getDataType(animation) === '[object Object]') {
        var _a = animation, animationDuration = _a.animationDuration, animationType = _a.animationType;
        if (animationDuration != null) {
            navjumpRule.animationDuration = animationDuration;
        }
        if (animationType != null) {
            navjumpRule.animationType = animationType;
        }
    }
    return navjumpRule;
}
exports.backOptionsBuild = backOptionsBuild;
function forceGuardEach(router, navType, forceNav) {
    if (navType === void 0) { navType = 'replaceAll'; }
    if (forceNav === void 0) { forceNav = false; }
    if (router.options.platform === 'h5') {
        throw new Error("\u5728h5\u7AEF\u4E0A\u4F7F\u7528\uFF1AforceGuardEach \u662F\u65E0\u610F\u4E49\u7684\uFF0C\u76EE\u524D forceGuardEach \u4EC5\u652F\u6301\u5728\u975Eh5\u7AEF\u4E0A\u4F7F\u7528");
    }
    var page = utils_1.getUniCachePage(0);
    if (Object.keys(page).length === 0) {
        router.options.routerErrorEach({
            type: 3,
            msg: "\u4E0D\u5B58\u5728\u7684\u9875\u9762\u6808\uFF0C\u8BF7\u786E\u4FDD\u6709\u8DB3\u591F\u7684\u9875\u9762\u53EF\u7528\uFF0C\u5F53\u524D level:0"
        }, router);
    }
    var _a = page, route = _a.route, options = _a.options;
    lockNavjump({
        path: "/" + route,
        query: options
    }, router, navType, forceNav);
}
exports.forceGuardEach = forceGuardEach;
function createRoute(router, level, orignRule) {
    if (level === void 0) { level = 0; }
    var route = {
        name: '',
        meta: {},
        path: '',
        fullPath: '',
        NAVTYPE: '',
        query: {},
        params: {}
    };
    if (level === 19970806) { // 首次构建响应式 页面不存在 直接返回
        return route;
    }
    if (router.options.platform === 'h5') {
        var vueRoute = { path: '' };
        if (orignRule != null) {
            vueRoute = orignRule;
        }
        else {
            vueRoute = router.$route.currentRoute;
        }
        var matRouteParams = utils_1.copyData(vueRoute.params);
        delete matRouteParams.__id__;
        var toQuery = query_1.parseQuery(__assign(__assign({}, matRouteParams), utils_1.copyData(vueRoute.query)), router);
        vueRoute = __assign(__assign({}, vueRoute), { query: toQuery });
        route.path = vueRoute.path;
        route.fullPath = vueRoute.fullPath || '';
        route.query = vueRoute.query || {};
        route.NAVTYPE = base_1.rewriteMethodToggle[vueRoute.type || 'reLaunch'];
    }
    else {
        var appPage = {};
        if (orignRule != null) {
            appPage = __assign(__assign({}, orignRule), { openType: orignRule.type });
        }
        else {
            var page = utils_1.getUniCachePage(level);
            if (Object.keys(page).length === 0) {
                router.options.routerErrorEach({
                    type: 3,
                    msg: "\u4E0D\u5B58\u5728\u7684\u9875\u9762\u6808\uFF0C\u8BF7\u786E\u4FDD\u6709\u8DB3\u591F\u7684\u9875\u9762\u53EF\u7528\uFF0C\u5F53\u524D level:" + level
                }, router);
                throw new Error("\u4E0D\u5B58\u5728\u7684\u9875\u9762\u6808\uFF0C\u8BF7\u786E\u4FDD\u6709\u8DB3\u591F\u7684\u9875\u9762\u53EF\u7528\uFF0C\u5F53\u524D level:" + level);
            }
            // Fixes: https://github.com/SilurianYang/uni-simple-router/issues/196
            var pageOptions = page.options;
            var originQuery = pageOptions.query;
            if (originQuery != null && Object.keys(pageOptions).length === 1) {
                pageOptions = JSON.parse(decodeURIComponent(originQuery));
            }
            var pageQuery = JSON.parse(decodeURIComponent(JSON.stringify(pageOptions)));
            appPage = __assign(__assign({}, page.$page), { query: pageQuery, fullPath: decodeURIComponent(page.$page.fullPath) });
            if (router.options.platform !== 'app-plus') {
                appPage.path = "/" + page.route;
            }
        }
        var openType = appPage.openType;
        route.query = appPage.query;
        route.path = appPage.path;
        route.fullPath = appPage.fullPath;
        route.NAVTYPE = base_1.rewriteMethodToggle[openType || 'reLaunch'];
    }
    var tableRoute = utils_1.routesForMapRoute(router, route.path, ['finallyPathMap', 'pathMap']);
    var perfectRoute = __assign(__assign({}, route), tableRoute);
    perfectRoute.query = query_1.parseQuery(perfectRoute.query, router);
    return perfectRoute;
}
exports.createRoute = createRoute;


/***/ }),

/***/ "./src/public/page.ts":
/*!****************************!*\
  !*** ./src/public/page.ts ***!
  \****************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export createFullPath [provided] [no usage info] [missing usage info prevents renaming] */
/*! export createToFrom [provided] [no usage info] [missing usage info prevents renaming] */
/*! export proxyPageHook [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.proxyPageHook = exports.createFullPath = exports.createToFrom = void 0;
var utils_1 = __webpack_require__(/*! ../helpers/utils */ "./src/helpers/utils.ts");
var methods_1 = __webpack_require__(/*! ./methods */ "./src/public/methods.ts");
var query_1 = __webpack_require__(/*! ./query */ "./src/public/query.ts");
function createToFrom(to, router) {
    var fromRoute = { path: '' };
    var page = utils_1.getUniCachePage(0);
    if (utils_1.getDataType(page) === '[object Array]') {
        fromRoute = utils_1.deepClone(to);
    }
    else {
        fromRoute = methods_1.createRoute(router);
    }
    return fromRoute;
}
exports.createToFrom = createToFrom;
function createFullPath(to, from) {
    if (to.fullPath == null) {
        var strQuery = query_1.stringifyQuery(to.query);
        to.fullPath = to.path + strQuery;
    }
    if (from.fullPath == null) {
        var strQuery = query_1.stringifyQuery(from.query);
        from.fullPath = from.path + strQuery;
    }
}
exports.createFullPath = createFullPath;
function proxyPageHook(vueVim, router, proxyHookKey, pageType) {
    utils_1.replaceHook(router, vueVim, proxyHookKey, pageType);
}
exports.proxyPageHook = proxyPageHook;


/***/ }),

/***/ "./src/public/query.ts":
/*!*****************************!*\
  !*** ./src/public/query.ts ***!
  \*****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.stringifyQuery = exports.parseQuery = exports.resolveQuery = exports.queryPageToMap = void 0;
var utils_1 = __webpack_require__(/*! ../helpers/utils */ "./src/helpers/utils.ts");
var hooks_1 = __webpack_require__(/*! ./hooks */ "./src/public/hooks.ts");
var warn_1 = __webpack_require__(/*! ../helpers/warn */ "./src/helpers/warn.ts");
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;
var encode = function (str) {
    return encodeURIComponent(str)
        .replace(encodeReserveRE, encodeReserveReplacer)
        .replace(commaRE, ',');
};
function queryPageToMap(toRule, router) {
    var query = {};
    var route = '';
    var successCb = toRule.success;
    var failCb = toRule.fail;
    if (utils_1.getDataType(toRule) === '[object Object]') {
        var objNavRule = toRule;
        if (objNavRule.path != null) {
            var _a = utils_1.urlToJson(objNavRule.path), path = _a.path, newQuery = _a.query;
            route = utils_1.routesForMapRoute(router, path, ['finallyPathList', 'pathMap']);
            query = __assign(__assign({}, newQuery), (toRule.query || {}));
            objNavRule.path = path;
            objNavRule.query = query;
            delete toRule.params;
        }
        else if (objNavRule.name != null) {
            route = router.routesMap.nameMap[objNavRule.name];
            if (route == null) {
                hooks_1.ERRORHOOK[0]({ type: 2, msg: "\u547D\u540D\u8DEF\u7531\u4E3A\uFF1A" + objNavRule.name + " \u7684\u8DEF\u7531\uFF0C\u65E0\u6CD5\u5728\u8DEF\u7531\u8868\u4E2D\u627E\u5230\uFF01", toRule: toRule }, router);
            }
            else {
                query = toRule.params || {};
                delete toRule.query;
            }
        }
        else {
            hooks_1.ERRORHOOK[0]({ type: 2, msg: toRule + " \u89E3\u6790\u5931\u8D25\uFF0C\u8BF7\u68C0\u6D4B\u5F53\u524D\u8DEF\u7531\u8868\u4E0B\u662F\u5426\u6709\u5305\u542B\u3002", toRule: toRule }, router);
        }
    }
    else {
        toRule = utils_1.urlToJson(toRule);
        route = utils_1.routesForMapRoute(router, toRule.path, ['finallyPathList', 'pathMap']);
        query = toRule.query;
    }
    if (router.options.platform === 'h5') {
        var finallyPath = utils_1.getRoutePath(route, router).finallyPath;
        if (finallyPath.includes(':') && toRule.name == null) {
            hooks_1.ERRORHOOK[0]({ type: 2, msg: "\u5F53\u6709\u8BBE\u7F6E alias\u6216\u8005aliasPath \u4E3A\u52A8\u6001\u8DEF\u7531\u65F6\uFF0C\u4E0D\u5141\u8BB8\u4F7F\u7528 path \u8DF3\u8F6C\u3002\u8BF7\u4F7F\u7528 name \u8DF3\u8F6C\uFF01", route: route }, router);
        }
        var completeCb_1 = toRule.complete;
        var cacheSuccess_1 = toRule.success;
        var cacheFail_1 = toRule.fail;
        if (utils_1.getDataType(completeCb_1) === '[object Function]') {
            var publicCb_1 = function (args, callHook) {
                if (utils_1.getDataType(callHook) === '[object Function]') {
                    callHook.apply(this, args);
                }
                completeCb_1.apply(this, args);
            };
            successCb = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                publicCb_1.call(this, args, cacheSuccess_1);
            };
            failCb = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                publicCb_1.call(this, args, cacheFail_1);
            };
        }
    }
    var rule = toRule;
    if (utils_1.getDataType(rule.success) === '[object Function]') {
        rule.success = successCb;
    }
    if (utils_1.getDataType(rule.fail) === '[object Function]') {
        rule.fail = failCb;
    }
    return {
        rule: rule,
        route: route,
        query: query
    };
}
exports.queryPageToMap = queryPageToMap;
function resolveQuery(toRule, router) {
    var queryKey = 'query';
    if (toRule.params != null) {
        queryKey = 'params';
    }
    if (toRule.query != null) {
        queryKey = 'query';
    }
    var query = utils_1.copyData(toRule[queryKey] || {});
    var userResolveQuery = router.options.resolveQuery;
    if (userResolveQuery) {
        var jsonQuery = userResolveQuery(query);
        if (utils_1.getDataType(jsonQuery) !== '[object Object]') {
            warn_1.warn('请按格式返回参数： resolveQuery?:(jsonQuery:{[propName: string]: any;})=>{[propName: string]: any;}', router);
        }
        else {
            toRule[queryKey] = jsonQuery;
        }
    }
    else {
        var deepObj = utils_1.assertDeepObject(query);
        if (!deepObj) {
            return toRule;
        }
        var encode_1 = JSON.stringify(query);
        toRule[queryKey] = {
            query: encode_1
        };
    }
    return toRule;
}
exports.resolveQuery = resolveQuery;
function parseQuery(query, router) {
    var userParseQuery = router.options.parseQuery;
    if (userParseQuery) {
        query = userParseQuery(utils_1.copyData(query));
        if (utils_1.getDataType(query) !== '[object Object]') {
            warn_1.warn('请按格式返回参数： parseQuery?:(jsonQuery:{[propName: string]: any;})=>{[propName: string]: any;}', router);
        }
    }
    else {
        if (Reflect.get(query, 'query')) { // 验证一下是不是深度对象
            var deepQuery = Reflect.get(query, 'query');
            var jsonQuery = {
                query: decodeURIComponent(deepQuery)
            };
            try {
                jsonQuery = JSON.parse(jsonQuery.query);
                if (typeof jsonQuery === 'object') {
                    return jsonQuery;
                }
            }
            catch (error) {
                warn_1.warn('尝试解析深度对象失败，按原样输出。' + error, router);
            }
        }
    }
    return query;
}
exports.parseQuery = parseQuery;
function stringifyQuery(obj) {
    var res = obj
        ? Object.keys(obj)
            .map(function (key) {
            var val = obj[key];
            if (val === undefined) {
                return '';
            }
            if (val === null) {
                return encode(key);
            }
            if (Array.isArray(val)) {
                var result_1 = [];
                val.forEach(function (val2) {
                    if (val2 === undefined) {
                        return;
                    }
                    if (val2 === null) {
                        result_1.push(encode(key));
                    }
                    else {
                        result_1.push(encode(key) + '=' + encode(val2));
                    }
                });
                return result_1.join('&');
            }
            return encode(key) + '=' + encode(val);
        })
            .filter(function (x) { return x.length > 0; })
            .join('&')
        : null;
    return res ? "?" + res : '';
}
exports.stringifyQuery = stringifyQuery;


/***/ }),

/***/ "./src/public/rewrite.ts":
/*!*******************************!*\
  !*** ./src/public/rewrite.ts ***!
  \*******************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export rewriteMethod [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.rewriteMethod = void 0;
var base_1 = __webpack_require__(/*! ../options/base */ "./src/options/base.ts");
var utils_1 = __webpack_require__(/*! ../helpers/utils */ "./src/helpers/utils.ts");
var warn_1 = __webpack_require__(/*! ../helpers/warn */ "./src/helpers/warn.ts");
var uniOrigin_1 = __webpack_require__(/*! ./uniOrigin */ "./src/public/uniOrigin.ts");
var rewrite = [
    'navigateTo',
    'redirectTo',
    'reLaunch',
    'switchTab',
    'navigateBack'
];
function rewriteMethod(router) {
    if (router.options.keepUniOriginNav === false) {
        rewrite.forEach(function (name) {
            var oldMethod = uni[name];
            uni[name] = function (params, originCall, callOkCb, forceNav) {
                if (originCall === void 0) { originCall = false; }
                if (originCall) {
                    uniOrigin_1.uniOriginJump(router, oldMethod, name, params, callOkCb, forceNav);
                }
                else {
                    if (router.options.platform === 'app-plus') {
                        if (Object.keys(router.appMain).length === 0) {
                            router.appMain = {
                                NAVTYPE: name,
                                path: params.url
                            };
                        }
                    }
                    callRouterMethod(params, name, router);
                }
            };
        });
    }
}
exports.rewriteMethod = rewriteMethod;
function callRouterMethod(option, funName, router) {
    debugger;
    if (router.options.platform === 'app-plus') {
        var openType = null;
        if (option) {
            openType = option.openType;
        }
        if (openType != null && openType === 'appLaunch') {
            funName = 'reLaunch';
        }
    }
    if (funName === 'reLaunch' && JSON.stringify(option) === '{"url":"/"}') {
        warn_1.warn("uni-app \u539F\u751F\u65B9\u6CD5\uFF1AreLaunch({url:'/'}) \u9ED8\u8BA4\u88AB\u91CD\u5199\u5566\uFF01\u4F60\u53EF\u4EE5\u4F7F\u7528 this.$Router.replaceAll() \u6216\u8005 uni.reLaunch({url:'/?xxx=xxx'})", router, true);
        funName = 'navigateBack';
        option = {
            from: 'backbutton'
        };
    }
    if (funName === 'navigateBack') {
        var level = 1;
        if (option == null) {
            option = { delta: 1 };
        }
        if (utils_1.getDataType(option.delta) === '[object Number]') {
            level = option.delta;
        }
        router.back(level, option);
    }
    else {
        var routerMethodName = base_1.rewriteMethodToggle[funName];
        var path = option.url;
        if (!path.startsWith('/')) {
            var absolutePath = utils_1.resolveAbsolutePath(path, router);
            path = absolutePath;
            option.url = absolutePath;
        }
        if (funName === 'switchTab') {
            var route = utils_1.routesForMapRoute(router, path, ['pathMap', 'finallyPathList']);
            var finallyPath = utils_1.getRoutePath(route, router).finallyPath;
            if (utils_1.getDataType(finallyPath) === '[object Array]') {
                warn_1.warn("uni-app \u539F\u751F\u65B9\u6CD5\u8DF3\u8F6C\u8DEF\u5F84\u4E3A\uFF1A" + path + "\u3002\u6B64\u8DEF\u4E3A\u662Ftab\u9875\u9762\u65F6\uFF0C\u4E0D\u5141\u8BB8\u8BBE\u7F6E alias \u4E3A\u6570\u7EC4\u7684\u60C5\u51B5\uFF0C\u5E76\u4E14\u4E0D\u80FD\u4E3A\u52A8\u6001\u8DEF\u7531\uFF01\u5F53\u7136\u4F60\u53EF\u4EE5\u901A\u8FC7\u901A\u914D\u7B26*\u89E3\u51B3\uFF01", router, true);
            }
            if (finallyPath === '*') {
                warn_1.warn("uni-app \u539F\u751F\u65B9\u6CD5\u8DF3\u8F6C\u8DEF\u5F84\u4E3A\uFF1A" + path + "\u3002\u5728\u8DEF\u7531\u8868\u4E2D\u627E\u4E0D\u5230\u76F8\u5173\u8DEF\u7531\u8868\uFF01\u5F53\u7136\u4F60\u53EF\u4EE5\u901A\u8FC7\u901A\u914D\u7B26*\u89E3\u51B3\uFF01", router, true);
            }
            path = finallyPath;
        }
        var _a = option, events = _a.events, success = _a.success, fail = _a.fail, complete = _a.complete, animationType = _a.animationType, animationDuration = _a.animationDuration;
        var jumpOptions = { path: path, events: events, success: success, fail: fail, complete: complete, animationDuration: animationDuration, animationType: animationType };
        router[routerMethodName](utils_1.notDeepClearNull(jumpOptions));
    }
}


/***/ }),

/***/ "./src/public/router.ts":
/*!******************************!*\
  !*** ./src/public/router.ts ***!
  \******************************/
/*! flagged exports */
/*! export RouterMount [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export createRouter [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createRouter = exports.RouterMount = void 0;
var config_1 = __webpack_require__(/*! ../helpers/config */ "./src/helpers/config.ts");
var utils_1 = __webpack_require__(/*! ../helpers/utils */ "./src/helpers/utils.ts");
var lifeCycle_1 = __webpack_require__(/*! ../helpers/lifeCycle */ "./src/helpers/lifeCycle.ts");
var mixins_1 = __webpack_require__(/*! ../helpers/mixins */ "./src/helpers/mixins.ts");
var methods_1 = __webpack_require__(/*! ../public/methods */ "./src/public/methods.ts");
var rewrite_1 = __webpack_require__(/*! ../public/rewrite */ "./src/public/rewrite.ts");
function createRouter(params) {
    var options = utils_1.assertNewOptions(params);
    var router = {
        options: options,
        mount: [],
        appProxyHook: config_1.appProxyHook,
        appletsProxyHook: config_1.indexProxyHook,
        appMain: {},
        enterPath: '',
        $route: null,
        $lockStatus: false,
        routesMap: {},
        lifeCycle: lifeCycle_1.registerRouterHooks(config_1.lifeCycle, options),
        push: function (to) {
            methods_1.lockNavjump(to, router, 'push');
        },
        replace: function (to) {
            methods_1.lockNavjump(to, router, 'replace');
        },
        replaceAll: function (to) {
            methods_1.lockNavjump(to, router, 'replaceAll');
        },
        pushTab: function (to) {
            methods_1.lockNavjump(to, router, 'pushTab');
        },
        back: function (level, animation) {
            if (level === void 0) { level = 1; }
            methods_1.lockNavjump(level + '', router, 'back', undefined, animation);
        },
        forceGuardEach: function (navType, forceNav) {
            methods_1.forceGuardEach(router, navType, forceNav);
        },
        beforeEach: function (userGuard) {
            lifeCycle_1.registerEachHooks(router, 'beforeHooks', userGuard);
        },
        afterEach: function (userGuard) {
            lifeCycle_1.registerEachHooks(router, 'afterHooks', userGuard);
        },
        install: function (Vue) {
            rewrite_1.rewriteMethod(this);
            mixins_1.initMixins(Vue, this);
            Object.defineProperty(Vue.prototype, '$Router', {
                get: function () {
                    return router;
                }
            });
            Object.defineProperty(Vue.prototype, '$Route', {
                get: function () {
                    return methods_1.createRoute(router);
                }
            });
        }
    };
    utils_1.def(router, 'keyword', function () { return config_1.keyword; });
    utils_1.def(router, 'currentRoute', function () { return methods_1.createRoute(router); });
    router.beforeEach(function (to, from, next) { return next(); });
    router.afterEach(function () { });
    return router;
}
exports.createRouter = createRouter;
function RouterMount(Vim, router, el) {
    if (el === void 0) { el = '#app'; }
    if (utils_1.getDataType(router.mount) === '[object Array]') {
        router.mount.push({
            app: Vim,
            el: el
        });
    }
    else {
        throw new Error("\u6302\u8F7D\u8DEF\u7531\u5931\u8D25\uFF0Crouter.app \u5E94\u8BE5\u4E3A\u6570\u7EC4\u7C7B\u578B\u3002\u5F53\u524D\u7C7B\u578B\uFF1A" + typeof router.mount);
    }
    if (router.options.platform === 'h5') {
        var vueRouter = router.$route;
        vueRouter.replace({
            path: vueRouter.currentRoute.fullPath
        });
    } // 其他端目前不需要做啥
}
exports.RouterMount = RouterMount;


/***/ }),

/***/ "./src/public/uniOrigin.ts":
/*!*********************************!*\
  !*** ./src/public/uniOrigin.ts ***!
  \*********************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.formatOriginURLQuery = exports.uniOriginJump = void 0;
var query_1 = __webpack_require__(/*! ./query */ "./src/public/query.ts");
var utils_1 = __webpack_require__(/*! ../helpers/utils */ "./src/helpers/utils.ts");
var routerNavCount = 0;
function uniOriginJump(router, originMethod, funName, options, callOkCb, forceNav) {
    var _a = formatOriginURLQuery(router, options, funName), complete = _a.complete, originRule = __rest(_a, ["complete"]);
    if (routerNavCount === 0 && router.options.platform !== 'h5') { // 还原app.vue下已经重写后的生命周期
        utils_1.resetPageHook(router, originRule.url);
    }
    if (forceNav != null && forceNav === false) {
        routerNavCount++;
        complete && complete.apply(null, { msg: 'forceGuardEach强制触发并且不执行跳转' });
        callOkCb && callOkCb.apply(null, { msg: 'forceGuardEach强制触发并且不执行跳转' });
    }
    else {
        if (funName === 'navigateBack') {
            originMethod(__assign({}, originRule));
            callOkCb && callOkCb.apply(null);
        }
        else {
            originMethod(__assign(__assign({}, originRule), { complete: function () {
                    var _a;
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (routerNavCount === 0) {
                        routerNavCount++;
                        if (router.options.platform === 'app-plus') {
                            var waitPage = plus.nativeObj.View.getViewById('router-loadding');
                            waitPage && waitPage.close();
                            var launchedHook = (_a = router.options.APP) === null || _a === void 0 ? void 0 : _a.launchedHook;
                            launchedHook && launchedHook();
                        }
                    }
                    complete && complete.apply(null, args);
                    callOkCb && callOkCb.apply(null, args);
                } }));
        }
    }
}
exports.uniOriginJump = uniOriginJump;
function formatOriginURLQuery(router, options, funName) {
    var _a;
    var url = options.url, path = options.path, query = options.query, animationType = options.animationType, animationDuration = options.animationDuration, events = options.events, success = options.success, fail = options.fail, complete = options.complete, delta = options.delta, animation = options.animation;
    var strQuery = query_1.stringifyQuery(query || {});
    var queryURL = strQuery === '' ? (path || url) : (path || url) + strQuery;
    var animationRule = {};
    if (router.options.platform === 'app-plus') {
        if (funName !== 'navigateBack') {
            animationRule = ((_a = router.options.APP) === null || _a === void 0 ? void 0 : _a.animation) || {};
            animationRule = __assign(__assign({}, animationRule), animation || {});
        }
    }
    return utils_1.notDeepClearNull({
        delta: delta,
        url: queryURL,
        animationType: animationType || animationRule.animationType,
        animationDuration: animationDuration || animationRule.animationDuration,
        events: events,
        success: success,
        fail: fail,
        complete: complete
    });
}
exports.formatOriginURLQuery = formatOriginURLQuery;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/index.ts");
/******/ })()
;
});
//# sourceMappingURL=uni-simple-router.js.map