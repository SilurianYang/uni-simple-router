(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/uni-simple-router/component/router-link"],{

/***/ 206:
/*!********************************************************************************************************!*\
  !*** E:/Git/MY-GIT-INFO/uni-simple-router/examples/common/uni-simple-router/component/router-link.vue ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _router_link_vue_vue_type_template_id_82664ee0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router-link.vue?vue&type=template&id=82664ee0& */ 207);
/* harmony import */ var _router_link_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./router-link.vue?vue&type=script&lang=js& */ 209);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _router_link_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _router_link_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 14);

var renderjs




/* normalize component */

var component = Object(_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _router_link_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _router_link_vue_vue_type_template_id_82664ee0___WEBPACK_IMPORTED_MODULE_0__["render"],
  _router_link_vue_vue_type_template_id_82664ee0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _router_link_vue_vue_type_template_id_82664ee0___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "E:/Git/MY-GIT-INFO/uni-simple-router/examples/common/uni-simple-router/component/router-link.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 207:
/*!***************************************************************************************************************************************!*\
  !*** E:/Git/MY-GIT-INFO/uni-simple-router/examples/common/uni-simple-router/component/router-link.vue?vue&type=template&id=82664ee0& ***!
  \***************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_router_link_vue_vue_type_template_id_82664ee0___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./router-link.vue?vue&type=template&id=82664ee0& */ 208);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_router_link_vue_vue_type_template_id_82664ee0___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_router_link_vue_vue_type_template_id_82664ee0___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_router_link_vue_vue_type_template_id_82664ee0___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_router_link_vue_vue_type_template_id_82664ee0___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 208:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/Git/MY-GIT-INFO/uni-simple-router/examples/common/uni-simple-router/component/router-link.vue?vue&type=template&id=82664ee0& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 209:
/*!*********************************************************************************************************************************!*\
  !*** E:/Git/MY-GIT-INFO/uni-simple-router/examples/common/uni-simple-router/component/router-link.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_router_link_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./router-link.vue?vue&type=script&lang=js& */ 210);
/* harmony import */ var _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_router_link_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_router_link_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_router_link_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_router_link_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_Program_Files_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_router_link_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 210:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/Git/MY-GIT-INFO/uni-simple-router/examples/common/uni-simple-router/component/router-link.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; //
//
//
//

var navType = {
  push: 'push',
  replace: 'replace',
  replaceAll: 'replaceAll',
  pushTab: 'pushTab' };var _default =

{
  props: {
    to: {
      type: [String, Object] },

    stopNavto: {
      type: Boolean,
      default: false },

    navType: {
      type: String,
      default: 'push' },

    level: {
      type: Number,
      default: 1 },

    append: {
      type: Boolean,
      default: false } },


  methods: {
    formatNav: function formatNav(text) {
      if (text != null && text.constructor === String) {
        text = text.replace(/\'/g, '');
        text = text.replace(/(\w+)(?=:)/g, function (val) {
          return "\"".concat(val, "\"");
        });
        text = text.replace(/:\s*([^,{}\s"]+)/g, function (val) {
          var arr = val.split(':');
          return ":\"".concat(arr[1].trim(), "\"");
        });
        try {
          text = JSON.parse(text);
        } catch (e) {}
      }
      if (this.append) {
        var pathArr = this.$Route.path.split('/');
        pathArr.splice(pathArr.length - this.level, this.level);
        pathArr = pathArr.join('/');
        if (text.constructor === Object) {
          if (text.path) {
            text.path = pathArr + text.path;
          }
        } else {
          text = pathArr + text;
        }
      }
      return text;
    },
    gotoPage: function gotoPage() {
      if (this.stopNavto) {
        return true;
      }
      var type = navType[this.navType];
      if (type == null) {
        return console.error(" \"navType\" unknown type \n\n value\uFF1A".concat(Object.values(navType).join('、')));
      }
      var navInfo = this.formatNav(this.to);

      this.$Router[type](navInfo);
    } } };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vRTovR2l0L01ZLUdJVC1JTkZPL3VuaS1zaW1wbGUtcm91dGVyL2V4YW1wbGVzL2NvbW1vbi91bmktc2ltcGxlLXJvdXRlci9jb21wb25lbnQvcm91dGVyLWxpbmsudnVlPzk2ZDgiLCJ3ZWJwYWNrOi8vL0U6L0dpdC9NWS1HSVQtSU5GTy91bmktc2ltcGxlLXJvdXRlci9leGFtcGxlcy9jb21tb24vdW5pLXNpbXBsZS1yb3V0ZXIvY29tcG9uZW50L3JvdXRlci1saW5rLnZ1ZT8zZDMyIiwid2VicGFjazovLy9FOi9HaXQvTVktR0lULUlORk8vdW5pLXNpbXBsZS1yb3V0ZXIvZXhhbXBsZXMvY29tbW9uL3VuaS1zaW1wbGUtcm91dGVyL2NvbXBvbmVudC9yb3V0ZXItbGluay52dWU/YTU2ZCIsIndlYnBhY2s6Ly8vRTovR2l0L01ZLUdJVC1JTkZPL3VuaS1zaW1wbGUtcm91dGVyL2V4YW1wbGVzL2NvbW1vbi91bmktc2ltcGxlLXJvdXRlci9jb21wb25lbnQvcm91dGVyLWxpbmsudnVlP2U0MzYiLCJ3ZWJwYWNrOi8vL0U6L0dpdC9NWS1HSVQtSU5GTy91bmktc2ltcGxlLXJvdXRlci9leGFtcGxlcy9jb21tb24vdW5pLXNpbXBsZS1yb3V0ZXIvY29tcG9uZW50L3JvdXRlci1saW5rLnZ1ZSJdLCJuYW1lcyI6WyJuYXZUeXBlIiwicHVzaCIsInJlcGxhY2UiLCJyZXBsYWNlQWxsIiwicHVzaFRhYiIsInByb3BzIiwidG8iLCJ0eXBlIiwiU3RyaW5nIiwiT2JqZWN0Iiwic3RvcE5hdnRvIiwiQm9vbGVhbiIsImRlZmF1bHQiLCJsZXZlbCIsIk51bWJlciIsImFwcGVuZCIsIm1ldGhvZHMiLCJmb3JtYXROYXYiLCJ0ZXh0IiwiY29uc3RydWN0b3IiLCJ2YWwiLCJhcnIiLCJzcGxpdCIsInRyaW0iLCJKU09OIiwicGFyc2UiLCJlIiwicGF0aEFyciIsIiRSb3V0ZSIsInBhdGgiLCJzcGxpY2UiLCJsZW5ndGgiLCJqb2luIiwiZ290b1BhZ2Ui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QUF6QixFQUFpQztBQUNoQyxjQUFJUyxJQUFJLENBQUNXLElBQVQsRUFBZTtBQUNkWCxnQkFBSSxDQUFDVyxJQUFMLEdBQVlGLE9BQU8sR0FBR1QsSUFBSSxDQUFDVyxJQUEzQjtBQUNBO0FBQ0QsU0FKRCxNQUlPO0FBQ05YLGNBQUksR0FBR1MsT0FBTyxHQUFHVCxJQUFqQjtBQUNBO0FBQ0Q7QUFDRCxhQUFPQSxJQUFQO0FBQ0EsS0E1Qk87QUE2QlJlLFlBN0JRLHNCQTZCRztBQUNWLFVBQUksS0FBS3ZCLFNBQVQsRUFBb0I7QUFDbkIsZUFBTyxJQUFQO0FBQ0E7QUFDRCxVQUFNSCxJQUFJLEdBQUdQLE9BQU8sQ0FBQyxLQUFLQSxPQUFOLENBQXBCO0FBQ0EsVUFBSU8sSUFBSSxJQUFJLElBQVosRUFBa0I7QUFDakIsZUFBTzJCLE9BQU8sQ0FBQ0MsS0FBUixxREFBb0QxQixNQUFNLENBQUMyQixNQUFQLENBQWNwQyxPQUFkLEVBQXVCZ0MsSUFBdkIsQ0FBNEIsR0FBNUIsQ0FBcEQsRUFBUDtBQUNBO0FBQ0QsVUFBTUssT0FBTyxHQUFHLEtBQUtwQixTQUFMLENBQWUsS0FBS1gsRUFBcEIsQ0FBaEI7O0FBRUEsV0FBS2dDLE9BQUwsQ0FBYS9CLElBQWIsRUFBbUI4QixPQUFuQjtBQUNBLEtBeENPLEVBdEJLLEUiLCJmaWxlIjoiY29tbW9uL3VuaS1zaW1wbGUtcm91dGVyL2NvbXBvbmVudC9yb3V0ZXItbGluay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zLCByZWN5Y2xhYmxlUmVuZGVyLCBjb21wb25lbnRzIH0gZnJvbSBcIi4vcm91dGVyLWxpbmsudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTgyNjY0ZWUwJlwiXG52YXIgcmVuZGVyanNcbmltcG9ydCBzY3JpcHQgZnJvbSBcIi4vcm91dGVyLWxpbmsudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9yb3V0ZXItbGluay52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIUQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx2dWUtbG9hZGVyXFxcXGxpYlxcXFxydW50aW1lXFxcXGNvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsLFxuICBmYWxzZSxcbiAgY29tcG9uZW50cyxcbiAgcmVuZGVyanNcbilcblxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJFOi9HaXQvTVktR0lULUlORk8vdW5pLXNpbXBsZS1yb3V0ZXIvZXhhbXBsZXMvY29tbW9uL3VuaS1zaW1wbGUtcm91dGVyL2NvbXBvbmVudC9yb3V0ZXItbGluay52dWVcIlxuZXhwb3J0IGRlZmF1bHQgY29tcG9uZW50LmV4cG9ydHMiLCJleHBvcnQgKiBmcm9tIFwiLSFEOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx2dWUtY2xpLXBsdWdpbi11bmlcXFxccGFja2FnZXNcXFxcdnVlLWxvYWRlclxcXFxsaWJcXFxcbG9hZGVyc1xcXFx0ZW1wbGF0ZUxvYWRlci5qcz8/dnVlLWxvYWRlci1vcHRpb25zIUQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx3ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyXFxcXGluZGV4LmpzPz9yZWYtLTE2LTAhRDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcd2VicGFjay11bmktbXAtbG9hZGVyXFxcXGxpYlxcXFx0ZW1wbGF0ZS5qcyFEOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx2dWUtY2xpLXBsdWdpbi11bmlcXFxccGFja2FnZXNcXFxcd2VicGFjay11bmktYXBwLWxvYWRlclxcXFxwYWdlLW1ldGEuanMhRDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHZ1ZS1sb2FkZXJcXFxcbGliXFxcXGluZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhRDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcd2VicGFjay11bmktbXAtbG9hZGVyXFxcXGxpYlxcXFxzdHlsZS5qcyEuL3JvdXRlci1saW5rLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD04MjY2NGVlMCZcIiIsInZhciBjb21wb25lbnRzXG52YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbn1cbnZhciByZWN5Y2xhYmxlUmVuZGVyID0gZmFsc2VcbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5cbmV4cG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zLCByZWN5Y2xhYmxlUmVuZGVyLCBjb21wb25lbnRzIH0iLCJpbXBvcnQgbW9kIGZyb20gXCItIUQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcYmFiZWwtbG9hZGVyXFxcXGxpYlxcXFxpbmRleC5qcyFEOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEhCdWlsZGVyWFxcXFxwbHVnaW5zXFxcXHVuaWFwcC1jbGlcXFxcbm9kZV9tb2R1bGVzXFxcXEBkY2xvdWRpb1xcXFx2dWUtY2xpLXBsdWdpbi11bmlcXFxccGFja2FnZXNcXFxcd2VicGFjay1wcmVwcm9jZXNzLWxvYWRlclxcXFxpbmRleC5qcz8/cmVmLS0xMi0xIUQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHdlYnBhY2stdW5pLW1wLWxvYWRlclxcXFxsaWJcXFxcc2NyaXB0LmpzIUQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx2dWUtbG9hZGVyXFxcXGxpYlxcXFxpbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIUQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHdlYnBhY2stdW5pLW1wLWxvYWRlclxcXFxsaWJcXFxcc3R5bGUuanMhLi9yb3V0ZXItbGluay52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hRDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxiYWJlbC1sb2FkZXJcXFxcbGliXFxcXGluZGV4LmpzIUQ6XFxcXFByb2dyYW0gRmlsZXNcXFxcSEJ1aWxkZXJYXFxcXHBsdWdpbnNcXFxcdW5pYXBwLWNsaVxcXFxub2RlX21vZHVsZXNcXFxcQGRjbG91ZGlvXFxcXHZ1ZS1jbGktcGx1Z2luLXVuaVxcXFxwYWNrYWdlc1xcXFx3ZWJwYWNrLXByZXByb2Nlc3MtbG9hZGVyXFxcXGluZGV4LmpzPz9yZWYtLTEyLTEhRDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcd2VicGFjay11bmktbXAtbG9hZGVyXFxcXGxpYlxcXFxzY3JpcHQuanMhRDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcdnVlLWNsaS1wbHVnaW4tdW5pXFxcXHBhY2thZ2VzXFxcXHZ1ZS1sb2FkZXJcXFxcbGliXFxcXGluZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhRDpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxIQnVpbGRlclhcXFxccGx1Z2luc1xcXFx1bmlhcHAtY2xpXFxcXG5vZGVfbW9kdWxlc1xcXFxAZGNsb3VkaW9cXFxcd2VicGFjay11bmktbXAtbG9hZGVyXFxcXGxpYlxcXFxzdHlsZS5qcyEuL3JvdXRlci1saW5rLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsIi8vXHJcbi8vXHJcbi8vXHJcbi8vXHJcblxyXG5jb25zdCBuYXZUeXBlID0ge1xyXG5cdHB1c2g6ICdwdXNoJyxcclxuXHRyZXBsYWNlOiAncmVwbGFjZScsXHJcblx0cmVwbGFjZUFsbDogJ3JlcGxhY2VBbGwnLFxyXG5cdHB1c2hUYWI6ICdwdXNoVGFiJ1xyXG59O1xyXG5leHBvcnQgZGVmYXVsdCB7XHJcblx0cHJvcHM6IHtcclxuXHRcdHRvOiB7XHJcblx0XHRcdHR5cGU6IFtTdHJpbmcsIE9iamVjdF0sXHJcblx0XHR9LFxyXG5cdFx0c3RvcE5hdnRvOiB7XHJcblx0XHRcdHR5cGU6IEJvb2xlYW4sXHJcblx0XHRcdGRlZmF1bHQ6IGZhbHNlXHJcblx0XHR9LFxyXG5cdFx0bmF2VHlwZToge1xyXG5cdFx0XHR0eXBlOiBTdHJpbmcsXHJcblx0XHRcdGRlZmF1bHQ6ICdwdXNoJ1xyXG5cdFx0fSxcclxuXHRcdGxldmVsOiB7XHJcblx0XHRcdHR5cGU6IE51bWJlcixcclxuXHRcdFx0ZGVmYXVsdDogMVxyXG5cdFx0fSxcclxuXHRcdGFwcGVuZDoge1xyXG5cdFx0XHR0eXBlOiBCb29sZWFuLFxyXG5cdFx0XHRkZWZhdWx0OiBmYWxzZVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0bWV0aG9kczoge1xyXG5cdFx0Zm9ybWF0TmF2KHRleHQpIHtcclxuXHRcdFx0aWYgKHRleHQgIT0gbnVsbCAmJiB0ZXh0LmNvbnN0cnVjdG9yID09PSBTdHJpbmcpIHtcclxuXHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC9cXCcvZywgJycpO1xyXG5cdFx0XHRcdHRleHQgPSB0ZXh0LnJlcGxhY2UoLyhcXHcrKSg/PTopL2csIGZ1bmN0aW9uKHZhbCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIGBcIiR7dmFsfVwiYDtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHR0ZXh0ID0gdGV4dC5yZXBsYWNlKC86XFxzKihbXix7fVxcc1wiXSspL2csIGZ1bmN0aW9uKHZhbCkge1xyXG5cdFx0XHRcdFx0Y29uc3QgYXJyID0gdmFsLnNwbGl0KCc6Jyk7XHJcblx0XHRcdFx0XHRyZXR1cm4gYDpcIiR7YXJyWzFdLnRyaW0oKX1cImA7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRcdHRleHQgPSBKU09OLnBhcnNlKHRleHQpO1xyXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHt9XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKHRoaXMuYXBwZW5kKSB7XHJcblx0XHRcdFx0bGV0IHBhdGhBcnIgPSB0aGlzLiRSb3V0ZS5wYXRoLnNwbGl0KCcvJyk7XHJcblx0XHRcdFx0cGF0aEFyci5zcGxpY2UocGF0aEFyci5sZW5ndGggLSB0aGlzLmxldmVsLCB0aGlzLmxldmVsKTtcclxuXHRcdFx0XHRwYXRoQXJyID0gcGF0aEFyci5qb2luKCcvJyk7XHJcblx0XHRcdFx0aWYgKHRleHQuY29uc3RydWN0b3IgPT09IE9iamVjdCkge1xyXG5cdFx0XHRcdFx0aWYgKHRleHQucGF0aCkge1xyXG5cdFx0XHRcdFx0XHR0ZXh0LnBhdGggPSBwYXRoQXJyICsgdGV4dC5wYXRoO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHR0ZXh0ID0gcGF0aEFyciArIHRleHQ7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0ZXh0O1xyXG5cdFx0fSxcclxuXHRcdGdvdG9QYWdlKCkge1xyXG5cdFx0XHRpZiAodGhpcy5zdG9wTmF2dG8pIHtcclxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0XHRjb25zdCB0eXBlID0gbmF2VHlwZVt0aGlzLm5hdlR5cGVdO1xyXG5cdFx0XHRpZiAodHlwZSA9PSBudWxsKSB7XHJcblx0XHRcdFx0cmV0dXJuIGNvbnNvbGUuZXJyb3IoYCBcIm5hdlR5cGVcIiB1bmtub3duIHR5cGUgXFxuXFxuIHZhbHVl77yaJHtPYmplY3QudmFsdWVzKG5hdlR5cGUpLmpvaW4oJ+OAgScpfWApO1xyXG5cdFx0XHR9XHJcblx0XHRcdGNvbnN0IG5hdkluZm8gPSB0aGlzLmZvcm1hdE5hdih0aGlzLnRvKTtcclxuXHJcblx0XHRcdHRoaXMuJFJvdXRlclt0eXBlXShuYXZJbmZvKTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'common/uni-simple-router/component/router-link-create-component',
    {
        'common/uni-simple-router/component/router-link-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('1')['createComponent'](__webpack_require__(206))
        })
    },
    [['common/uni-simple-router/component/router-link-create-component']]
]);
