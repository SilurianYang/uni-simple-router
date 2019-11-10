# uni-simple-router

### 一个更为简洁的[Vue-router](https://router.vuejs.org/zh/)，专为 uni-app 量身打造

### 简介说明:

> 是否你也曾感叹过为啥官方就不搞一个类似 **[Vue-router](https://router.vuejs.org/zh/)** 一样的路由管理器？苦苦寻找。搜遍百度？社区？以及 Google？甚至是官方的各大 QQ 群？难受没找到！**直到此插件出来之前也没有一个更好的解决方法**。于是**它**，没错，就是**它**，它诞生了。**只要你会使用 **[Vue-router](https://router.vuejs.org/zh/)** 即可马上上手，下面文档的完全不用看。它保留了 **[Vue-router](https://router.vuejs.org/zh/)** 完全相似的书写风格，让你 [倍感亲切](https://hanyu.baidu.com/zici/s?wd=%E5%80%8D%E6%84%9F%E4%BA%B2%E5%88%87&ptype=char) !**

### 大纲

1. #### [安装](#anchor0)
1. #### [组件式的导航](#anchor11) <sup>1.2.2+</sup>
1. #### [编程式的导航](#anchor1)
1. #### [命名式路由](#anchor2)
1. #### [路由传参](#anchor3)  <sup>1.2.2+</sup>
1. #### [全局前置守卫](#anchor4)
1. #### [全局后置钩子](#anchor5)
1. #### [路由独享守卫](#anchor6)
1. #### [路由元信息](#anchor7)
1. #### [H5路由跳转进度条](#anchor12) <sup>1.2.2+</sup>
1. #### [完整的导航解析流程](#anchor8)
1. #### [首次触发生命钩子注意事项](#anchor10) <sup>1.2.2+</sup>
1. #### [NAVTYPE取值类型](#NAVTYPE) <sup>1.1.0+</sup>
1. #### [注意事项](#anchor9)

## <div id="anchor0">安装</div>

#### NPM

```javaScript
npm install uni-simple-router
```

##### 如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：

```javaScript
import Vue from 'vue'
import Router from 'uni-simple-router'

Vue.use(Router)
```

---

## <div id="anchor11">组件式的导航 <sup>1.2.2+</sup> </div>

这是一个很难抉择的问题？加还是不加这是一个问题！为了让开发者更快捷，最后还是封装上了 **router-link** 组件。为了能满足多端这里必须批评下 **微信小程序**，它要搞特殊。没得办法的！所以没法帮你们注册组件。它那玩意只能在 **main.js** 中才能注册组件！！！！ 不多说了，直接上代码。
##### 注册组件：
```javaScript
// main.js

import routerLink from './node_modules/uni-simple-router/component/router-link.vue'
Vue.component('router-link',routerLink)

```

##### 使用组件：
```javaScript
// xxxx.vue

<router-link to="{name: tabbar-4,params: {name: '我只想去tab5的router-link'}}" navType="pushTab">
  <button type="primary">使用name对象跳转</button>
</router-link>

<router-link to="{path: '/pages/tabbar/tabbar-4/tabbar-4',query: {name: '我只想去tab5的router-link'}}" navType="pushTab">
  <button type="primary">使用path对象跳转</button>
</router-link>

<router-link to="{path: '/tabbar-4/tabbar-4,query': {name: '我只想去tab5的router-link'}}" navType="pushTab" :level="2" :append="true">
  <button type="primary">使用path对象继承父路径跳转</button>
</router-link>

<router-link to="/pages/tabbar/tabbar-4/tabbar-4" navType="pushTab">
  <button type="warn">通过路由path直接跳转</button>
</router-link>

<router-link to="/tabbar-4/tabbar-4" navType="pushTab" :level="2" :append="true">
  <button type="warn">通过路由path继承父路径跳转</button>
</router-link>

<router-link to="/tabbar-4/tabbar-4" navType="pushTab" :level="2" :append="true" :stopNavto="true">
  <button type="default">阻止组件事件,不会跳转</button>
</router-link>
```

### prop：

参数  | 类型  | 必填  | 默认值  | 描述  
--- | ----  | ----  | ----  |   ----
to  | String  | **是**  | | 需要跳转的路径。可以是字符串对象，也可以是一个绝对路径，也可以是一个相对路径  
stopNavto |   Boolean | 否  | false | 默认绑定事件为点击事件，不阻止。
navType |   String  | 否  | push  | 需要跳转的 [NAVTYPE类型](#NAVTYPE)
level | Number  | 否  | 1 |  相对于当前页面路径，以 **/** 从后往前裁切的层级。append 为true时生效
append  | Boolean | 否  | false | 是否相对于当前页面路径跳转。根据 level 层级截取的路径 拼接 to 。 **只针对使用path跳转的情况**



## <div id="anchor1">编程式的导航</div>

废弃所有 [uni-app 路由与页面跳转 Api](https://uniapp.dcloud.io/api/router?id=relaunch),拥抱编程式导航。

### router.push(location, onComplete?, onAbort?) 等同于 [uni.navigateTo()](https://uniapp.dcloud.io/api/router?id=navigateto) <div id="push"></div>

##### 注意：在 Vue 实例内部，你可以通过 \$Router 访问路由实例。因此你可以调用 this.\$Router.push。

想要导航到不同的 URL，则使用 **this.\$Router.push** 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击后退按钮时，则回到之前的 URL。

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：

```javaScript

// 字符串
this.$Router.push('/pages/router/router1')

// 对象
this.$Router.push({path:'/pages/router/router1'})

// 命名的路由
this.$Router.push({ name: 'router1', params: { userId: '123' }})

// 带查询参数，变成 /router1?plan=private
this.$Router.push({ path: 'router1', query: { plan: 'private' }})

```

##### 注意：如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。所以字符串时必须是绝对的路径，name 时传递的参数必须为 params，相反 path 必须对应 query。

------

### router.replace(location, onComplete?, onAbort?) 等同于 [uni.redirectTo()](https://uniapp.dcloud.io/api/router?id=redirectto)

跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

```javaScript

this.$Router.replace(...)
```

------

### router.replaceAll(location, onComplete?, onAbort?) 等同于 [uni.reLaunch()](https://uniapp.dcloud.io/api/router?id=redirectto)

跟 router.replace 很像，唯一的不同就是，它不会向 history 添加新记录，而是将所有的页面都关掉，打开一个新的页面。

```javaScript

this.$Router.replaceAll(...)
```

---

### router.pushTab(location, onComplete?, onAbort?) 等同于  [uni.switchTab()](https://uniapp.dcloud.io/api/router?id=switchtab)

<div id="pushTab">跟 router.push 很像，打开指定的 tab 菜单。</div>

##### 注意：router.pushTab 在传递参数的时候 H5 暂时不支持，需要开发者自行处理下，这是官方的一个 bug,后续会修复。不过可以使用此一个变通的方法获取到,临时解决！

```javaScript

this.$Router.pushTab(...)


//变通方法获取参数 H5端

const router = new Router({
    routes:[
        {
                path: "/pages/tabbar/tabbar-4/tabbar-4",
                name: 'tabbar-4',
                H5Params:{
                    H5Name:''       //使用一个临时变量来存储
                },
                beforeEnter:(to,from,next)=>{   
                    to.H5Params.H5Name=to.query.name
                    next();
                }
        },
    ]
})

//获取方式
this.$Route.H5Params.H5Name

```
##### 注意:使用变通方法时可以在临时变量上复制，虽然this.$Route.query无法获取到，但是禁用路由守卫时是携带完整参数的，所有可以再此做一些手脚。页面刷新后参数将会丢失。

---

### **router.back(n) 等同于 [uni.navigateBack()](https://uniapp.dcloud.io/api/router?id=navigateback)**

这个方法的参数是一个整数，意思是在 history 记录中后退多少步，类似 window.history.go(n)。

##### 例子

```javaScript

// 后退 2 步记录
this.$Router.back(2)

// 如果 history 记录不够用，那就默默地失败呗
this.$Router.back(100)
```

---

## <div id="anchor2">命名路由</div>

##### 有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 routes 配置中给某个路由设置名称。

```javaScript
const router = new Router({
	routes: [
		{
			path: "/pages/router/router1/router1",
			name: 'router1'
		}, {
			path: "/pages/router/router2/router2",
			name: 'router2',
			beforeEnter:(to,from,next)=>{
				next({name:'router3',params:{msg:'我是从router2路由拦截过来的'}});
			}
		}, {
			path: "/pages/router/router3/router3",
			name: 'router3',
			beforeEnter:(to,from,next)=>{
				next();
			}
		}
	]
});

```

要链接到一个命名路由，可以给 router.push() 属性传一个对象：

```javaScript

this.$Router.push({ name: 'router1', params: { userId: '123' }})
```

---

## <div id="anchor3">路由传参</div>

##### 在组件中使用 $Route 来获取当前路由表中的配置及参数。因为路由传值方面官方目前仅提供了query的方式进行传参，所以到目前为止uni-simple-router也仅支持query的获取方式。为了兼容H5手动刷新后参数丢失的问题。其次在 \$Route 对象中 依然保留了 params 选项后续会补上。

##### ~~数据传参时尽量不要传递深度对象，虽然中间有做一层操作。始终不能百分百还原。在深度对象传递的过程中，深度对象将会抹平成一个大对象。而且在参数传递的过程中传递的数据将会变成字符串~~

##### 深度对象可传递 <sup>1.2.2+</sup>

##### 例子

```javaScript

// 假如你是通过name 来进行跳转。
this.$Router.push({ name: 'router1', params: { userId: '123' }})

// 获取方式
this.$Route.query.userId;


// 同样 等同于
this.$Router.push({ path: '/pages/router/router1/router1', query: { userId: '123' }})

// 获取方式
this.$Route.query.userId;

```

---

# 导航守卫

##### 正如其名，uni-simple-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的。

##### 记住参数或查询的改变并不会触发进入/离开的导航守卫。你可以通过观察 \$Route 对象来应对这些变化。

## <div id="anchor4">全局前置守卫</div>

##### 你可以使用 router.beforeEach 注册一个全局前置守卫：

```javaScript
const router = new Router({....})

router.beforeEach((to, from, next) => {
  // ...
})
```

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 **等待中** 。

每个守卫方法接收三个参数：

- **to: Route:** 即将要进入的目标 路由对象
- **from: Route:** 当前导航正要离开的路由
- **next: Function:** 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  - **next():** 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
  - **next(false):** 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
  - **next('/') 或者 next({ path: '/' }):** 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象

##### 确保要调用 next 方法，否则钩子就不会被 resolved，同时在使用 next() 时，如果想导航到新的地址，这时就需要在 next() 传递一个NAVTYPE指定类型跳转。


#### 例子

```javaScript

router.beforeEach((to, from, next) => {
	if (to.name == 'tabbar-5') {
		next({
			name: 'router4',
			params: {
				msg: '我拦截了tab5并重定向到了路由4页面上',
			},
			NAVTYPE: 'push'
		});
	} else{
    next();
  }
})
```
##### 很显然这是一个全局的生命钩子函数，当发现跳转的路由名称为 'tabbar-5' 时，中间进行拦截并重定向到名为 'router4' 的路由下,而显然易见的是 'tabbar-5' 是通过 [pushTab](#pushTab) Api进行跳转的，而 'router4' 则是一个普通的页面，应该使用 [push](#push) 方法进行跳转。所有这时的我们需要提供一个 [NAVTYPE](#NAVTYPE) 来指定 此次跳转需要使用什么方法。如果地址为同一类型时无需传递此参数。

---

## <div id="anchor5">全局后置钩子</div>

##### 你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身：

```javaScript

router.afterEach((to, from) => {
  // ...
})
```

---

## <div id="anchor6">路由独享守卫</div>

##### 你可以在路由配置上直接定义 beforeEnter 守卫：

```javaScript
const router = new Router({
	routes: [
		 {
			path: "/pages/router/router2/router2",
			name: 'router2',
			beforeEnter:(to,from,next)=>{
				next({name:'router3',params:{msg:'我是从router2路由拦截过来的'}});
			}
		}, {
			path: "/pages/router/router3/router3",
			name: 'router3',
			beforeEnter:(to,from,next)=>{
				next();
			}
		}
	]
});
```

这些守卫与全局前置守卫的方法参数是一样的。

---

## <div id="anchor7">路由元信息</div>

定义路由的时候可以**配置任何自己需要的参数**

```javaScript

const router = new Router({
	routes: [{
        path: "/pages/router/router1/router1"",
        name: 'router1',
        meta:{
            title:'H5中需要的title',
            disable:true
        },
        //xxxxx
    }]
});
```
首先，我们称呼 routes 配置中的每个路由对象为 路由记录。一个路由匹配到的所有路由记录会暴露为 $Route 对象 (还有在导航守卫中的路由对象)下。因此，需要的时候可以自行获取。

##### 下面例子展示在全局导航守卫中检查元字段：

```javaScript


router.beforeEach((to, from, next) => {
  if (to.meta&&to.disable) {
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.meta.title }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```
----------

## <div id="anchor12">H5路由跳转进度条 <sup>1.2.2+</sup></div>
``` javaScript

import Vue from 'vue'
import Router from 'uni-simple-router';

Vue.use(Router);

const router = new Router({
    loading:false,  //默认为开启状态，可不传递。
    routes: [{
      path: "/pages/tabbar/tabbar-1/tabbar-1",
      name: 'tabbar-1'
    },
    {
      path: "/pages/tabbar/tabbar-2/tabbar-2",
      name: 'tabbar-2'
    },
    ]
});

```
------


## <div id="anchor8">完整的导航解析流程</div>

1. 导航被触发。
1. 调用全局的 beforeEach 守卫。
1. 在路由配置里调用 beforeEnter。
1. 导航被确认。
1. 调用全局的 afterEach 钩子。
1. 触发 DOM 更新。

----------

## <div id="anchor10">首次触发生命钩子注意事项 <sup>1.2.2+</sup> </div>
1. 首次启动依次触发全局钩子、组件独享钩子。
1. 在app.vue 中跳转时会获得 ONLAUNCH: true 的标识，回显在每个钩子的同to、from 下。同时你也可以通过 this.\$Route 获取到。
1. 在next() 中拦截跳转时必须明确的给出标识[NAVTYPE](#NAVTYPE),否则无法跳转。在页面同类型时可以忽视。

----------

## <div id="NAVTYPE">NAVTYPE取值类型 <sup>1.1.0+</sup> </div>
##### 1. push 
> 跳转到普通页面，新开保留历史记录

##### 2. replace 
> 动态的导航到一个新 URL 关闭当前页面，跳转到的某个页面。

##### 3. replaceAll 
> 动态的导航到一个新 URL 关闭所有页面，打开到应用内的某个页面

##### 4. pushTab 
> 动态的导航到一个新 url 关闭所有页面，打开到应用内的某个tab

----------

## <div id="anchor9">注意事项</div>

1. 内置对象名称差异 **\$Router** 非 \$router，**$Route** 非 \$route
1. [pushTab](#pushTab) api在跳转到tab时，H5端使用 **\$Route** 无法访问到传递的参数，可以使用一种变通的方式 [相关测试案例](https://github.com/SilurianYang/uni-simple-router/tree/master/test)
1. APP、微信小程序、百度小程序、H5测试通过，其他端未测试。


--------

#### 相关连接
###  1. [uni-app-tools工具集合](https://github.com/SilurianYang/uni-app-tools)
###  2. [uni-simple-router github地址](https://github.com/SilurianYang/uni-simple-router)
### 3. [uni-app官方路由文档](https://uniapp.dcloud.io/api/router?id=navigateto)