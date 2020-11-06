<template>
  <div>
      <h1>vueRouterDev:true</h1>
      <h3>router1</h3>
      <!-- 通过vue-router全局组件router-view来挂载视图 -->
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created(){
	  
  },
    beforeRouteEnter (to, from, next) {
		next();
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当守卫执行前，组件实例还没被创建
    },
    beforeRouteUpdate (to, from, next) {
		next();
      // 在当前路由改变，但是该组件被复用时调用
      // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
      // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
      // 可以访问组件实例 `this`
    },
    beforeRouteLeave (to, from, next) {
		next()
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
    },
  methods: {

  },
  components: {

  }
}
</script>

<style>

</style>
