## Fixes bug
* 组件式导航解析字符串错误Bug [#227](https://github.com/SilurianYang/uni-simple-router/issues/227)
* `APP` 端使用 `vue` 页面过渡到 `nvue` tabbar 页面时，启动页空白的Bug [#334](https://github.com/SilurianYang/uni-simple-router/issues/334)

## Revise
* 

## Known Issues
* `APP` 端启动页为tab时，拦截到其他页面后底部tabbar 还依然存在，请避免把原生 `tabbar` 页设置成启动页。你可以在 `beforeEach` 中使用 next 到tabbar页效果一致