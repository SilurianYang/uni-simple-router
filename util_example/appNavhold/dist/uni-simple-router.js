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
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/declare/base.ts":
/*!*****************************!*\
  !*** ./src/declare/base.ts ***!
  \*****************************/
/*! flagged exports */
/*! export RouterDescribe [provided] [no usage info] [missing usage info prevents renaming] */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.RouterDescribe = void 0;\r\nvar RouterDescribe = /** @class */ (function () {\r\n    function RouterDescribe() {\r\n    }\r\n    return RouterDescribe;\r\n}());\r\nexports.RouterDescribe = RouterDescribe;\r\n\n\n//# sourceURL=webpack://Router/./src/declare/base.ts?");

/***/ }),

/***/ "./src/helpers/utils.ts":
/*!******************************!*\
  !*** ./src/helpers/utils.ts ***!
  \******************************/
/*! flagged exports */
/*! export __esModule [provided] [no usage info] [missing usage info prevents renaming] */
/*! export appPlatform [provided] [no usage info] [missing usage info prevents renaming] */
/*! other exports [not provided] [no usage info] */
/*! runtime requirements: __webpack_exports__ */
/***/ ((__unused_webpack_module, exports) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.appPlatform = void 0;\r\nfunction appPlatform() {\r\n    return process.env.VUE_APP_PLATFORM;\r\n}\r\nexports.appPlatform = appPlatform;\r\n\n\n//# sourceURL=webpack://Router/./src/helpers/utils.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: top-level-this-exports, __webpack_exports__, __webpack_require__ */
/*! CommonJS bailout: this is used directly at 2:17-21 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.Router = exports.RouterMount = void 0;\r\nvar base_1 = __webpack_require__(/*! ./declare/base */ \"./src/declare/base.ts\");\r\nvar utils_1 = __webpack_require__(/*! ./helpers/utils */ \"./src/helpers/utils.ts\");\r\nvar Router = /** @class */ (function (_super) {\r\n    __extends(Router, _super);\r\n    function Router(options) {\r\n        var _this = _super.call(this) || this;\r\n        console.log(options);\r\n        return _this;\r\n    }\r\n    Router.prototype.push = function (rule) {\r\n        console.log('这是push函数');\r\n    };\r\n    Router.prototype.replace = function (rule) { };\r\n    Router.prototype.replaceAll = function (rule) { };\r\n    Router.prototype.pushTab = function (rule) { };\r\n    Router.prototype.beforeEach = function (guard) { };\r\n    Router.prototype.afterEach = function (guard) { };\r\n    return Router;\r\n}(base_1.RouterDescribe));\r\nexports.Router = Router;\r\n// const router = new Router({\r\n// \troutes: [\r\n// \t\t{\r\n// \t\t\taliasPath: '/',\r\n//             path: '/pages/index/index',\r\n//             name:'index',\r\n//             style: {navigationBarTitleText: 'uni-app'},\r\n//             children:[\r\n//                 {\r\n//                     aliasPath: '/',\r\n//                     path: '/pages/index/index',\r\n//                     name:'index',\r\n//                     style: {navigationBarTitleText: 'uni-app'},\r\n//                 }\r\n//             ]\r\n// \t\t},\r\n// \t\t{\r\n// \t\t\tpath: '/pages/tab1/tab1',\r\n// \t\t\tstyle: {navigationBarTitleText: '', enablePullDownRefresh: false},\r\n// \t\t},\r\n// \t\t{\r\n// \t\t\tpath: '/pages/tab2/tab2',\r\n// \t\t\tstyle: {navigationBarTitleText: '', enablePullDownRefresh: false},\r\n// \t\t},\r\n// \t],\r\n// });\r\nfunction RouterMount(Vim, el) {\r\n    console.log(utils_1.appPlatform());\r\n}\r\nexports.RouterMount = RouterMount;\r\n;\r\n\n\n//# sourceURL=webpack://Router/./src/index.ts?");

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