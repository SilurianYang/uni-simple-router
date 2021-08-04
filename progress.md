## Fixes bug
* `小程序` 端 `onLoad`、`onShow` 执行不标准的问题。(#206,#224,#291)
* `小程序` 端 启动页必须写 `onLoad` 才会执行的问题
* H5端设置 `aliasPath` 后，无法使用 `aliasPath` 跨端跳转 (#302)

## Revise
* 参数可以直接传递 `null`。但是需要注意：**在非深度对象传参的情况下，小程序会将 `null` 解析为字符串`undefined`** 
* 多端情况下自定义启动参数不仅限制于 `query` 传递深度参数，任何组合都可以 (#307,#301)
* 去除 `keyword` 白名单字段

## Known Issues
* `APP` 端启动页为tab时，拦截到其他页面后底部tabbar 还依然存在，请避免把原生 `tabbar` 页设置成启动页。你可以在 `beforeEach` 中使用 next 到tabbar页效果一致
* `APP` 端 tab 拦截后无法自动还原 选中区域，现需要开发者自行设置。