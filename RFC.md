```flow

st=>start: 开始跳转
e=>end: 跳转结束
platform=>operation: 平台选择
H5=>condition: H5
APP=>condition: APP
applets=>condition: 小程序
routerBeforeEach=>operation: routerBeforeEach
lock=>condition: 跳转加锁

runH5=>operation: H5
runAPP=>parallel: APP
runapplets=>parallel: 小程序

beforeRouteLeave=>condition: beforeRouteLeave
beforeEach=>condition: beforeEach 
beforeEnter=>condition: beforeEnter
afterEach=>operation: afterEach
runJump=>condition: 执行跳转成功或者失败
stopJump=>operation: next(false) 停止跳转
errorJump=>operation: 跳转失败
routerErrorEach=>operation: routerErrorEach
routerAfterEach=>operation: routerAfterEach

st->platform(right)->applets(yes)->routerBeforeEach
applets(no)->APP(yes)->routerBeforeEach
APP(no)->H5(yes)->routerBeforeEach
routerBeforeEach->lock(yes)->runAPP(path1)->runapplets(path1)->beforeRouteLeave
lock(no)->runH5->beforeRouteLeave(no)->stopJump->routerErrorEach
beforeRouteLeave(yes)->beforeEach(no)->stopJump->routerErrorEach
beforeEach(yes)->beforeEnter(no)->stopJump->routerErrorEach
beforeEnter(yes)->runJump(no)->errorJump->routerErrorEach
runJump(yes)->afterEach->routerAfterEach
routerAfterEach->e
routerErrorEach->e

```