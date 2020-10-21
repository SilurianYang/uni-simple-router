/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
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

eval("var isarray = __webpack_require__(/*! isarray */ \"./node_modules/path-to-regexp/node_modules/isarray/index.js\")\n\n/**\n * Expose `pathToRegexp`.\n */\nmodule.exports = pathToRegexp\nmodule.exports.parse = parse\nmodule.exports.compile = compile\nmodule.exports.tokensToFunction = tokensToFunction\nmodule.exports.tokensToRegExp = tokensToRegExp\n\n/**\n * The main path matching regexp utility.\n *\n * @type {RegExp}\n */\nvar PATH_REGEXP = new RegExp([\n  // Match escaped characters that would otherwise appear in future matches.\n  // This allows the user to escape special characters that won't transform.\n  '(\\\\\\\\.)',\n  // Match Express-style parameters and un-named parameters with a prefix\n  // and optional suffixes. Matches appear as:\n  //\n  // \"/:test(\\\\d+)?\" => [\"/\", \"test\", \"\\d+\", undefined, \"?\", undefined]\n  // \"/route(\\\\d+)\"  => [undefined, undefined, undefined, \"\\d+\", undefined, undefined]\n  // \"/*\"            => [\"/\", undefined, undefined, undefined, undefined, \"*\"]\n  '([\\\\/.])?(?:(?:\\\\:(\\\\w+)(?:\\\\(((?:\\\\\\\\.|[^\\\\\\\\()])+)\\\\))?|\\\\(((?:\\\\\\\\.|[^\\\\\\\\()])+)\\\\))([+*?])?|(\\\\*))'\n].join('|'), 'g')\n\n/**\n * Parse a string for the raw tokens.\n *\n * @param  {string}  str\n * @param  {Object=} options\n * @return {!Array}\n */\nfunction parse (str, options) {\n  var tokens = []\n  var key = 0\n  var index = 0\n  var path = ''\n  var defaultDelimiter = options && options.delimiter || '/'\n  var res\n\n  while ((res = PATH_REGEXP.exec(str)) != null) {\n    var m = res[0]\n    var escaped = res[1]\n    var offset = res.index\n    path += str.slice(index, offset)\n    index = offset + m.length\n\n    // Ignore already escaped sequences.\n    if (escaped) {\n      path += escaped[1]\n      continue\n    }\n\n    var next = str[index]\n    var prefix = res[2]\n    var name = res[3]\n    var capture = res[4]\n    var group = res[5]\n    var modifier = res[6]\n    var asterisk = res[7]\n\n    // Push the current path onto the tokens.\n    if (path) {\n      tokens.push(path)\n      path = ''\n    }\n\n    var partial = prefix != null && next != null && next !== prefix\n    var repeat = modifier === '+' || modifier === '*'\n    var optional = modifier === '?' || modifier === '*'\n    var delimiter = res[2] || defaultDelimiter\n    var pattern = capture || group\n\n    tokens.push({\n      name: name || key++,\n      prefix: prefix || '',\n      delimiter: delimiter,\n      optional: optional,\n      repeat: repeat,\n      partial: partial,\n      asterisk: !!asterisk,\n      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')\n    })\n  }\n\n  // Match any characters still remaining.\n  if (index < str.length) {\n    path += str.substr(index)\n  }\n\n  // If the path exists, push it onto the end.\n  if (path) {\n    tokens.push(path)\n  }\n\n  return tokens\n}\n\n/**\n * Compile a string to a template function for the path.\n *\n * @param  {string}             str\n * @param  {Object=}            options\n * @return {!function(Object=, Object=)}\n */\nfunction compile (str, options) {\n  return tokensToFunction(parse(str, options), options)\n}\n\n/**\n * Prettier encoding of URI path segments.\n *\n * @param  {string}\n * @return {string}\n */\nfunction encodeURIComponentPretty (str) {\n  return encodeURI(str).replace(/[\\/?#]/g, function (c) {\n    return '%' + c.charCodeAt(0).toString(16).toUpperCase()\n  })\n}\n\n/**\n * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.\n *\n * @param  {string}\n * @return {string}\n */\nfunction encodeAsterisk (str) {\n  return encodeURI(str).replace(/[?#]/g, function (c) {\n    return '%' + c.charCodeAt(0).toString(16).toUpperCase()\n  })\n}\n\n/**\n * Expose a method for transforming tokens into the path function.\n */\nfunction tokensToFunction (tokens, options) {\n  // Compile all the tokens into regexps.\n  var matches = new Array(tokens.length)\n\n  // Compile all the patterns before compilation.\n  for (var i = 0; i < tokens.length; i++) {\n    if (typeof tokens[i] === 'object') {\n      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$', flags(options))\n    }\n  }\n\n  return function (obj, opts) {\n    var path = ''\n    var data = obj || {}\n    var options = opts || {}\n    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent\n\n    for (var i = 0; i < tokens.length; i++) {\n      var token = tokens[i]\n\n      if (typeof token === 'string') {\n        path += token\n\n        continue\n      }\n\n      var value = data[token.name]\n      var segment\n\n      if (value == null) {\n        if (token.optional) {\n          // Prepend partial segment prefixes.\n          if (token.partial) {\n            path += token.prefix\n          }\n\n          continue\n        } else {\n          throw new TypeError('Expected \"' + token.name + '\" to be defined')\n        }\n      }\n\n      if (isarray(value)) {\n        if (!token.repeat) {\n          throw new TypeError('Expected \"' + token.name + '\" to not repeat, but received `' + JSON.stringify(value) + '`')\n        }\n\n        if (value.length === 0) {\n          if (token.optional) {\n            continue\n          } else {\n            throw new TypeError('Expected \"' + token.name + '\" to not be empty')\n          }\n        }\n\n        for (var j = 0; j < value.length; j++) {\n          segment = encode(value[j])\n\n          if (!matches[i].test(segment)) {\n            throw new TypeError('Expected all \"' + token.name + '\" to match \"' + token.pattern + '\", but received `' + JSON.stringify(segment) + '`')\n          }\n\n          path += (j === 0 ? token.prefix : token.delimiter) + segment\n        }\n\n        continue\n      }\n\n      segment = token.asterisk ? encodeAsterisk(value) : encode(value)\n\n      if (!matches[i].test(segment)) {\n        throw new TypeError('Expected \"' + token.name + '\" to match \"' + token.pattern + '\", but received \"' + segment + '\"')\n      }\n\n      path += token.prefix + segment\n    }\n\n    return path\n  }\n}\n\n/**\n * Escape a regular expression string.\n *\n * @param  {string} str\n * @return {string}\n */\nfunction escapeString (str) {\n  return str.replace(/([.+*?=^!:${}()[\\]|\\/\\\\])/g, '\\\\$1')\n}\n\n/**\n * Escape the capturing group by escaping special characters and meaning.\n *\n * @param  {string} group\n * @return {string}\n */\nfunction escapeGroup (group) {\n  return group.replace(/([=!:$\\/()])/g, '\\\\$1')\n}\n\n/**\n * Attach the keys as a property of the regexp.\n *\n * @param  {!RegExp} re\n * @param  {Array}   keys\n * @return {!RegExp}\n */\nfunction attachKeys (re, keys) {\n  re.keys = keys\n  return re\n}\n\n/**\n * Get the flags for a regexp from the options.\n *\n * @param  {Object} options\n * @return {string}\n */\nfunction flags (options) {\n  return options && options.sensitive ? '' : 'i'\n}\n\n/**\n * Pull out keys from a regexp.\n *\n * @param  {!RegExp} path\n * @param  {!Array}  keys\n * @return {!RegExp}\n */\nfunction regexpToRegexp (path, keys) {\n  // Use a negative lookahead to match only capturing groups.\n  var groups = path.source.match(/\\((?!\\?)/g)\n\n  if (groups) {\n    for (var i = 0; i < groups.length; i++) {\n      keys.push({\n        name: i,\n        prefix: null,\n        delimiter: null,\n        optional: false,\n        repeat: false,\n        partial: false,\n        asterisk: false,\n        pattern: null\n      })\n    }\n  }\n\n  return attachKeys(path, keys)\n}\n\n/**\n * Transform an array into a regexp.\n *\n * @param  {!Array}  path\n * @param  {Array}   keys\n * @param  {!Object} options\n * @return {!RegExp}\n */\nfunction arrayToRegexp (path, keys, options) {\n  var parts = []\n\n  for (var i = 0; i < path.length; i++) {\n    parts.push(pathToRegexp(path[i], keys, options).source)\n  }\n\n  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))\n\n  return attachKeys(regexp, keys)\n}\n\n/**\n * Create a path regexp from string input.\n *\n * @param  {string}  path\n * @param  {!Array}  keys\n * @param  {!Object} options\n * @return {!RegExp}\n */\nfunction stringToRegexp (path, keys, options) {\n  return tokensToRegExp(parse(path, options), keys, options)\n}\n\n/**\n * Expose a function for taking tokens and returning a RegExp.\n *\n * @param  {!Array}          tokens\n * @param  {(Array|Object)=} keys\n * @param  {Object=}         options\n * @return {!RegExp}\n */\nfunction tokensToRegExp (tokens, keys, options) {\n  if (!isarray(keys)) {\n    options = /** @type {!Object} */ (keys || options)\n    keys = []\n  }\n\n  options = options || {}\n\n  var strict = options.strict\n  var end = options.end !== false\n  var route = ''\n\n  // Iterate over the tokens and create our regexp string.\n  for (var i = 0; i < tokens.length; i++) {\n    var token = tokens[i]\n\n    if (typeof token === 'string') {\n      route += escapeString(token)\n    } else {\n      var prefix = escapeString(token.prefix)\n      var capture = '(?:' + token.pattern + ')'\n\n      keys.push(token)\n\n      if (token.repeat) {\n        capture += '(?:' + prefix + capture + ')*'\n      }\n\n      if (token.optional) {\n        if (!token.partial) {\n          capture = '(?:' + prefix + '(' + capture + '))?'\n        } else {\n          capture = prefix + '(' + capture + ')?'\n        }\n      } else {\n        capture = prefix + '(' + capture + ')'\n      }\n\n      route += capture\n    }\n  }\n\n  var delimiter = escapeString(options.delimiter || '/')\n  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter\n\n  // In non-strict mode we allow a slash at the end of match. If the path to\n  // match already ends with a slash, we remove it for consistency. The slash\n  // is valid at the end of a path match, not in the middle. This is important\n  // in non-ending mode, where \"/test/\" shouldn't match \"/test//route\".\n  if (!strict) {\n    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'\n  }\n\n  if (end) {\n    route += '$'\n  } else {\n    // In non-ending mode, we need the capturing groups to match as much as\n    // possible by using a positive lookahead to the end or next path segment.\n    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'\n  }\n\n  return attachKeys(new RegExp('^' + route, flags(options)), keys)\n}\n\n/**\n * Normalize the given path string, returning a regular expression.\n *\n * An empty array can be passed in for the keys, which will hold the\n * placeholder key descriptions. For example, using `/user/:id`, `keys` will\n * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.\n *\n * @param  {(string|RegExp|Array)} path\n * @param  {(Array|Object)=}       keys\n * @param  {Object=}               options\n * @return {!RegExp}\n */\nfunction pathToRegexp (path, keys, options) {\n  if (!isarray(keys)) {\n    options = /** @type {!Object} */ (keys || options)\n    keys = []\n  }\n\n  options = options || {}\n\n  if (path instanceof RegExp) {\n    return regexpToRegexp(path, /** @type {!Array} */ (keys))\n  }\n\n  if (isarray(path)) {\n    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)\n  }\n\n  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)\n}\n\n\n//# sourceURL=webpack://Router/./node_modules/path-to-regexp/index.js?");

/***/ }),

/***/ "./node_modules/path-to-regexp/node_modules/isarray/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/path-to-regexp/node_modules/isarray/index.js ***!
  \*******************************************************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: module */
/***/ ((module) => {

eval("module.exports = Array.isArray || function (arr) {\n  return Object.prototype.toString.call(arr) == '[object Array]';\n};\n\n\n//# sourceURL=webpack://Router/./node_modules/path-to-regexp/node_modules/isarray/index.js?");

/***/ }),

/***/ "./src/H5/buildRouter.ts":
/*!*******************************!*\
  !*** ./src/H5/buildRouter.ts ***!
  \*******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:16-20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.buildVueRouter = exports.buildVueRoutes = void 0;\r\nvar warn_1 = __webpack_require__(/*! ../helpers/warn */ \"./src/helpers/warn.ts\");\r\nvar utils_1 = __webpack_require__(/*! ../helpers/utils */ \"./src/helpers/utils.ts\");\r\nfunction buildVueRoutes(router, vueRouteMap) {\r\n    var _a = router.routesMap, pathMap = _a.pathMap, finallyPathList = _a.finallyPathList;\r\n    var vueRoutePathList = Object.keys(vueRouteMap);\r\n    var h5Options = router.options.h5;\r\n    for (var i = 0; i < vueRoutePathList.length; i++) {\r\n        var path = vueRoutePathList[i];\r\n        var myRoute = pathMap[path];\r\n        var vueRoute = vueRouteMap[path];\r\n        if (!myRoute) {\r\n            warn_1.warn(path + \" \\u8DEF\\u7531\\u5730\\u5740\\u5728\\u8DEF\\u7531\\u8868\\u4E2D\\u672A\\u627E\\u5230\\uFF0C\\u786E\\u5B9A\\u662F\\u5426\\u4F20\\u9012\\u6F0F\\u5566\", router, true);\r\n        }\r\n        else {\r\n            var _b = utils_1.getRoutePath(myRoute), finallyPath = _b.finallyPath, alias = _b.alias;\r\n            if (finallyPath instanceof Array) {\r\n                throw new Error(\"\\u975E vueRouterDev \\u6A21\\u5F0F\\u4E0B\\uFF0Calias\\u3001aliasPath\\u3001path \\u65E0\\u6CD5\\u63D0\\u4F9B\\u6570\\u7EC4\\u7C7B\\u578B\\uFF01 \" + JSON.stringify(myRoute));\r\n            }\r\n            if (h5Options.aliasCoverPath) {\r\n                vueRoute['path'] = finallyPath;\r\n            }\r\n            else {\r\n                if (alias != null) {\r\n                    vueRoute['alias'] = alias;\r\n                }\r\n            }\r\n        }\r\n    }\r\n    if (finallyPathList.includes('*')) {\r\n        vueRouteMap['*'] = pathMap['*'];\r\n    }\r\n    return vueRouteMap;\r\n}\r\nexports.buildVueRoutes = buildVueRoutes;\r\nfunction buildVueRouter(router, vueRouter, vueRouteMap) {\r\n    var routes = Object.values(vueRouteMap);\r\n    var newVueRouter = new vueRouter.constructor(__assign(__assign({}, router.options.h5), { routes: routes }));\r\n    vueRouter.matcher = newVueRouter.matcher;\r\n}\r\nexports.buildVueRouter = buildVueRouter;\r\n\n\n//# sourceURL=webpack://Router/./src/H5/buildRouter.ts?");

/***/ }),

/***/ "./src/helpers/config.ts":
/*!*******************************!*\
  !*** ./src/helpers/config.ts ***!
  \*******************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export baseConfig [provided] [no usage info] [missing usage info prevents renaming] */
/*! export lifeCycle [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.lifeCycle = exports.baseConfig = void 0;\r\nvar types_1 = __webpack_require__(/*! ../types */ \"./src/types/index.ts\");\r\nvar warn_1 = __webpack_require__(/*! ./warn */ \"./src/helpers/warn.ts\");\r\nexports.baseConfig = {\r\n    platform: 'h5',\r\n    h5: {\r\n        aliasCoverPath: false,\r\n        rewriteFun: true,\r\n        paramsToQuery: false,\r\n        loading: true,\r\n        vueRouterDev: false,\r\n        useUniConfig: true,\r\n        keepUniIntercept: false,\r\n        vueNext: false,\r\n        replaceStyle: false,\r\n        resetStyle: function () { return JSON.parse('{}'); },\r\n        mode: 'hash',\r\n        base: '/',\r\n        linkActiveClass: 'router-link-active',\r\n        linkExactActiveClass: 'router-link-exact-active',\r\n        scrollBehavior: function (to, from, savedPostion) { return savedPostion; },\r\n        fallback: true\r\n    },\r\n    APP: {\r\n        holdTabbar: true,\r\n        loddingPageStyle: function () { return JSON.parse('{\"backgroundColor\":\"#FFF\"}'); },\r\n        loddingPageHook: function (view) { types_1.plus.navigator.closeSplashscreen(); view.show(); },\r\n        animation: { animationType: 'pop-in', animationDuration: 300 }\r\n    },\r\n    debugger: false,\r\n    encodeURI: true,\r\n    routerBeforeEach: function (to, from, next) { next(); },\r\n    routerAfterEach: function (to, from) { },\r\n    routerErrorEach: function (error, router) { warn_1.err(JSON.stringify(error), router, true); },\r\n    routes: [\r\n        {\r\n            path: '/choose-location'\r\n        },\r\n        {\r\n            path: '/open-location'\r\n        },\r\n        {\r\n            path: '/preview-image'\r\n        }\r\n    ]\r\n};\r\nexports.lifeCycle = {\r\n    beforeHooks: [],\r\n    afterHooks: [],\r\n    routerBeforeHooks: [],\r\n    routerAfterHooks: [],\r\n    routerErrorHooks: []\r\n};\r\n\n\n//# sourceURL=webpack://Router/./src/helpers/config.ts?");

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
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.createRouteMap = void 0;\r\nvar warn_1 = __webpack_require__(/*! ./warn */ \"./src/helpers/warn.ts\");\r\nvar utils_1 = __webpack_require__(/*! ./utils */ \"./src/helpers/utils.ts\");\r\nfunction createRouteMap(router, routes) {\r\n    var routesMap = {\r\n        finallyPathList: [],\r\n        finallyPathMap: Object.create(null),\r\n        aliasPathMap: Object.create(null),\r\n        pathMap: Object.create(null),\r\n        vueRouteMap: Object.create(null)\r\n    };\r\n    routes.forEach(function (route) {\r\n        var _a = utils_1.getRoutePath(route), finallyPath = _a.finallyPath, aliasPath = _a.aliasPath, path = _a.path;\r\n        if (path == null) {\r\n            throw new Error(\"\\u8BF7\\u63D0\\u4F9B\\u4E00\\u4E2A\\u5B8C\\u6574\\u7684\\u8DEF\\u7531\\u5BF9\\u8C61\\uFF0C\\u5305\\u62EC\\u4EE5\\u7EDD\\u5BF9\\u8DEF\\u5F84\\u5F00\\u59CB\\u7684 \\u2018path\\u2019 \\u5B57\\u7B26\\u4E32 \" + JSON.stringify(route));\r\n        }\r\n        if (finallyPath instanceof Array) {\r\n            if (!router.options.h5.vueRouterDev && router.options.platform === 'h5') {\r\n                throw new Error(\"\\u975E vueRouterDev \\u6A21\\u5F0F\\u4E0B\\uFF0Croute.alias \\u76EE\\u524D\\u65E0\\u6CD5\\u63D0\\u4F9B\\u6570\\u7EC4\\u7C7B\\u578B\\uFF01 \" + JSON.stringify(route));\r\n            }\r\n        }\r\n        var strFinallyPath = finallyPath;\r\n        var strAliasPath = aliasPath;\r\n        if (router.options.platform !== 'h5') {\r\n            if (strFinallyPath.indexOf('/') !== 0) {\r\n                warn_1.warn(\"\\u5F53\\u524D\\u8DEF\\u7531\\u5BF9\\u8C61\\u4E0B\\uFF0Croute\\uFF1A\" + route + \" \\u662F\\u5426\\u7F3A\\u5C11\\u4E86\\u524D\\u7F00 \\u2018/\\u2019\", router, true);\r\n            }\r\n        }\r\n        if (!routesMap.finallyPathMap[strFinallyPath]) {\r\n            routesMap.finallyPathMap[strFinallyPath] = route;\r\n            routesMap.aliasPathMap[strAliasPath] = route;\r\n            routesMap.pathMap[path] = route;\r\n            routesMap.finallyPathList.push(strFinallyPath);\r\n        }\r\n    });\r\n    return routesMap;\r\n}\r\nexports.createRouteMap = createRouteMap;\r\n\n\n//# sourceURL=webpack://Router/./src/helpers/createRouteMap.ts?");

/***/ }),

/***/ "./src/helpers/lifeCycle.ts":
/*!**********************************!*\
  !*** ./src/helpers/lifeCycle.ts ***!
  \**********************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export registerHook [provided] [no usage info] [missing usage info prevents renaming] */
/*! export registerRouterHooks [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.registerRouterHooks = exports.registerHook = void 0;\r\nfunction registerHook(list, fn) {\r\n    list.push(fn);\r\n    return function () {\r\n        var i = list.indexOf(fn);\r\n        if (i > 0)\r\n            list.splice(i, 1);\r\n    };\r\n}\r\nexports.registerHook = registerHook;\r\nfunction registerRouterHooks(cycleHooks, options) {\r\n    registerHook(cycleHooks.routerBeforeHooks, function (rule) {\r\n        return new Promise(function (resolve) {\r\n            options.routerBeforeEach(rule, resolve);\r\n        });\r\n    })();\r\n    registerHook(cycleHooks.routerAfterHooks, function (rule) {\r\n        options.routerAfterEach(rule);\r\n    })();\r\n    registerHook(cycleHooks.routerErrorHooks, function (error) {\r\n        options.routerErrorEach(error);\r\n    })();\r\n    return cycleHooks;\r\n}\r\nexports.registerRouterHooks = registerRouterHooks;\r\n\n\n//# sourceURL=webpack://Router/./src/helpers/lifeCycle.ts?");

/***/ }),

/***/ "./src/helpers/mixins.ts":
/*!*******************************!*\
  !*** ./src/helpers/mixins.ts ***!
  \*******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:16-20 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.initMixins = exports.getMixins = void 0;\r\nvar hooks_1 = __webpack_require__(/*! ../public/hooks */ \"./src/public/hooks.ts\");\r\nvar createRouteMap_1 = __webpack_require__(/*! ../helpers/createRouteMap */ \"./src/helpers/createRouteMap.ts\");\r\nvar buildRouter_1 = __webpack_require__(/*! ../H5/buildRouter */ \"./src/H5/buildRouter.ts\");\r\nvar mpPlatform = /(^mp-weixin$)|(^mp-baidu$)|(^mp-alipay$)|(^mp-toutiao$)|(^mp-qq$)|(^mp-360$)/gi;\r\nfunction getMixins(router) {\r\n    var platform = router.options.platform;\r\n    if (mpPlatform.test(platform)) {\r\n        platform = 'app-lets';\r\n    }\r\n    var toggleHooks = {\r\n        h5: {\r\n            beforeCreate: function () {\r\n                if (this.$options.router) {\r\n                    router.$route = this.$options.router; // 挂载vue-router到路由对象下\r\n                    var vueRouteMap = createRouteMap_1.createRouteMap(router, this.$options.router.options.routes).finallyPathMap;\r\n                    router.routesMap.vueRouteMap = vueRouteMap;\r\n                    buildRouter_1.buildVueRoutes(router, vueRouteMap);\r\n                    buildRouter_1.buildVueRouter(router, this.$options.router, vueRouteMap);\r\n                    console.log(this.$options.router);\r\n                    var currentRoute = this.$options.router.currentRoute;\r\n                    var navRule = {\r\n                        path: currentRoute.path,\r\n                        query: currentRoute.query\r\n                    };\r\n                    hooks_1.transitionTo(router, navRule);\r\n                }\r\n            }\r\n        },\r\n        'app-plus': {\r\n            beforeCreate: function () {\r\n                console.log('beforeCreate---app');\r\n                // transitionTo(router);\r\n            },\r\n            onLoad: function () {\r\n                console.log('onLoad---app');\r\n            }\r\n        },\r\n        'app-lets': {\r\n            onLaunch: function () {\r\n                console.log('beforeCreate----app-lets');\r\n            }\r\n        }\r\n    };\r\n    return toggleHooks[platform];\r\n}\r\nexports.getMixins = getMixins;\r\nfunction initMixins(Vue, router) {\r\n    var routesMap = createRouteMap_1.createRouteMap(router, router.options.routes);\r\n    router.routesMap = routesMap; // 挂载自身路由表到路由对象下\r\n    Vue.mixin(__assign({}, getMixins(router)));\r\n}\r\nexports.initMixins = initMixins;\r\n\n\n//# sourceURL=webpack://Router/./src/helpers/mixins.ts?");

/***/ }),

/***/ "./src/helpers/utils.ts":
/*!******************************!*\
  !*** ./src/helpers/utils.ts ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __assign = (this && this.__assign) || function () {\r\n    __assign = Object.assign || function(t) {\r\n        for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n            s = arguments[i];\r\n            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n                t[p] = s[p];\r\n        }\r\n        return t;\r\n    };\r\n    return __assign.apply(this, arguments);\r\n};\r\nvar __spreadArrays = (this && this.__spreadArrays) || function () {\r\n    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;\r\n    for (var r = Array(s), k = 0, i = 0; i < il; i++)\r\n        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)\r\n            r[k] = a[j];\r\n    return r;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.mergeConfig = exports.routesForMapRoute = exports.assertNewOptions = exports.getRoutePath = void 0;\r\nvar config_1 = __webpack_require__(/*! ../helpers/config */ \"./src/helpers/config.ts\");\r\nvar Regexp = __webpack_require__(/*! path-to-regexp */ \"./node_modules/path-to-regexp/index.js\");\r\nfunction getRoutePath(route) {\r\n    var finallyPath = route.aliasPath || route.alias || route.path;\r\n    return {\r\n        finallyPath: finallyPath,\r\n        aliasPath: route.aliasPath || route.path,\r\n        path: route.path,\r\n        alias: route.alias\r\n    };\r\n}\r\nexports.getRoutePath = getRoutePath;\r\nfunction assertNewOptions(options) {\r\n    var platform = options.platform, routes = options.routes;\r\n    if (platform == null) {\r\n        throw new Error(\"\\u4F60\\u5728\\u5B9E\\u4F8B\\u5316\\u8DEF\\u7531\\u65F6\\u5FC5\\u987B\\u4F20\\u9012 'platform'\");\r\n    }\r\n    if (routes == null || routes.length === 0) {\r\n        throw new Error(\"\\u4F60\\u5728\\u5B9E\\u4F8B\\u5316\\u8DEF\\u7531\\u65F6\\u5FC5\\u987B\\u4F20\\u9012 routes \\u4E3A\\u7A7A\\uFF0C\\u8FD9\\u662F\\u65E0\\u610F\\u4E49\\u7684\\u3002\");\r\n    }\r\n    var mergeOptions = mergeConfig(config_1.baseConfig, options);\r\n    return mergeOptions;\r\n}\r\nexports.assertNewOptions = assertNewOptions;\r\nfunction routesForMapRoute(routes, path) { }\r\nexports.routesForMapRoute = routesForMapRoute;\r\nfunction mergeConfig(baseConfig, userConfig) {\r\n    var config = Object.create(null);\r\n    var baseConfigKeys = Object.keys(baseConfig);\r\n    for (var i = 0; i < baseConfigKeys.length; i += 1) {\r\n        var key = baseConfigKeys[i];\r\n        if (userConfig[key] != null) {\r\n            if (userConfig[key].constructor === Object) {\r\n                config[key] = __assign(__assign({}, baseConfig[key]), userConfig[key]);\r\n            }\r\n            else if (key === 'routes') {\r\n                config[key] = __spreadArrays(baseConfig[key], userConfig[key]);\r\n            }\r\n            else {\r\n                config[key] = userConfig[key];\r\n            }\r\n        }\r\n        else {\r\n            config[key] = baseConfig[key];\r\n        }\r\n    }\r\n    return config;\r\n}\r\nexports.mergeConfig = mergeConfig;\r\n\n\n//# sourceURL=webpack://Router/./src/helpers/utils.ts?");

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
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.warnLock = exports.log = exports.warn = exports.err = exports.isLog = void 0;\r\nfunction isLog(type, dev, errText, enforce) {\r\n    if (enforce === void 0) { enforce = false; }\r\n    if (!enforce) {\r\n        var isObject = dev.toString() === '[object Object]';\r\n        if (dev === false) {\r\n            return false;\r\n        }\r\n        else if (isObject) {\r\n            if (dev[type] === false) {\r\n                return false;\r\n            }\r\n        }\r\n    }\r\n    console[type](errText);\r\n    return true;\r\n}\r\nexports.isLog = isLog;\r\nfunction err(errText, router, enforce) {\r\n    var dev = router.options.debugger;\r\n    isLog('error', dev, errText, enforce);\r\n}\r\nexports.err = err;\r\nfunction warn(errText, router, enforce) {\r\n    var dev = router.options.debugger;\r\n    isLog('warn', dev, errText, enforce);\r\n}\r\nexports.warn = warn;\r\nfunction log(errText, router, enforce) {\r\n    var dev = router.options.debugger;\r\n    isLog('log', dev, errText, enforce);\r\n}\r\nexports.log = log;\r\nfunction warnLock(errText) {\r\n    console.warn(errText);\r\n}\r\nexports.warnLock = warnLock;\r\n\n\n//# sourceURL=webpack://Router/./src/helpers/warn.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! flagged exports */
/*! export RouterMount [provided] [maybe used in main (runtime-defined)] [usage prevents renaming] */
/*! export __esModule [provided] [maybe used in main (runtime-defined)] [usage prevents renaming] */
/*! export createRouter [provided] [maybe used in main (runtime-defined)] [usage prevents renaming] */
/*! other exports [not provided] [maybe used in main (runtime-defined)] */
/*! runtime requirements: __webpack_exports__, __webpack_require__ */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.createRouter = exports.RouterMount = void 0;\r\nvar config_1 = __webpack_require__(/*! ./helpers/config */ \"./src/helpers/config.ts\");\r\nvar utils_1 = __webpack_require__(/*! ./helpers/utils */ \"./src/helpers/utils.ts\");\r\nvar lifeCycle_1 = __webpack_require__(/*! ./helpers/lifeCycle */ \"./src/helpers/lifeCycle.ts\");\r\nvar mixins_1 = __webpack_require__(/*! ./helpers/mixins */ \"./src/helpers/mixins.ts\");\r\nfunction createRouter(params) {\r\n    var options = utils_1.assertNewOptions(params);\r\n    var router = {\r\n        options: options,\r\n        mount: [],\r\n        $route: null,\r\n        routesMap: {},\r\n        lifeCycle: lifeCycle_1.registerRouterHooks(config_1.lifeCycle, options),\r\n        push: function () {\r\n            return new Promise(function (resolve) { return resolve(); });\r\n        },\r\n        replace: function () {\r\n            return new Promise(function (resolve) { return resolve(); });\r\n        },\r\n        replaceAll: function () {\r\n            return new Promise(function (resolve) { return resolve(); });\r\n        },\r\n        pushTab: function () {\r\n            return new Promise(function (resolve) { return resolve(); });\r\n        },\r\n        beforeEach: function (guard) { },\r\n        afterEach: function (guard) { },\r\n        install: function (Vue) {\r\n            mixins_1.initMixins(Vue, this);\r\n            Object.defineProperty(Vue.prototype, '$Router', {\r\n                get: function () {\r\n                    return 11;\r\n                }\r\n            });\r\n            Object.defineProperty(Vue.prototype, '$Route', {\r\n                get: function () {\r\n                    return 22;\r\n                }\r\n            });\r\n        }\r\n    };\r\n    return router;\r\n}\r\nexports.createRouter = createRouter;\r\nfunction RouterMount(Vim, router, el) {\r\n    if (el === void 0) { el = '#app'; }\r\n    if (router.mount instanceof Array) {\r\n        router.mount.push({\r\n            app: Vim,\r\n            el: el\r\n        });\r\n    }\r\n    else {\r\n        throw new Error(\"\\u6302\\u8F7D\\u8DEF\\u7531\\u5931\\u8D25\\uFF0Crouter.app \\u5E94\\u8BE5\\u4E3A\\u6570\\u7EC4\\u7C7B\\u578B\\u3002\\u76EE\\u524D\\u662F \" + typeof router.mount);\r\n    }\r\n    Vim.$mount();\r\n}\r\nexports.RouterMount = RouterMount;\r\n\n\n//# sourceURL=webpack://Router/./src/index.ts?");

/***/ }),

/***/ "./src/public/hooks.ts":
/*!*****************************!*\
  !*** ./src/public/hooks.ts ***!
  \*****************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export callHook [provided] [no usage info] [missing usage info prevents renaming] */
/*! export transitionTo [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.transitionTo = exports.callHook = void 0;\r\nfunction callHook(hook) {\r\n    return new Promise(function (resolve) {\r\n        if (hook != null && hook instanceof Function) {\r\n            hook(resolve);\r\n        }\r\n        else {\r\n            resolve();\r\n        }\r\n    });\r\n}\r\nexports.callHook = callHook;\r\nvar hookList = [\r\n    function (router) { return callHook(router.lifeCycle.routerBeforeHooks[0]); },\r\n    function (router) {\r\n        var page = window.getCurrentPages()[0];\r\n        if (page != null) {\r\n            return callHook(page.$options.beforeRouteLeave[0]);\r\n        }\r\n        return callHook(undefined);\r\n    },\r\n    function (router) { return callHook(router.lifeCycle.beforeHooks[0]); },\r\n    function (router, navRule) { return callHook(navRule.beforeEnter); },\r\n    function (router) { return callHook(router.lifeCycle.afterHooks[0]); },\r\n    function (router) { return callHook(router.lifeCycle.routerAfterHooks[0]); }\r\n];\r\nfunction transitionTo(router, navRule) {\r\n    console.log(navRule);\r\n    for (var i = 0; i < hookList.length; i++) {\r\n        // const hook = hookList[i];\r\n        // hook(router, );\r\n    }\r\n}\r\nexports.transitionTo = transitionTo;\r\n\n\n//# sourceURL=webpack://Router/./src/public/hooks.ts?");

/***/ }),

/***/ "./src/types/index.ts":
/*!****************************!*\
  !*** ./src/types/index.ts ***!
  \****************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\n\n\n//# sourceURL=webpack://Router/./src/types/index.ts?");

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