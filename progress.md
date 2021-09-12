## Fixes bug
* 

## Revise
* 

## Add
* 新增 `beforeProxyHooks` 选项，可提前享用页面生命周期。

## Known Issues
* `APP` 端启动页为tab时，拦截到其他页面后底部tabbar 还依然存在，请避免把原生 `tabbar` 页设置成启动页。你可以在 `beforeEach` 中使用 next 到tabbar页效果一致