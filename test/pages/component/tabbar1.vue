<template>
  <div>
        <h1>配置项useUniConfig:false</h1>
        <h3>我是tabbar1</h3>
        <button @click="$Router.push({name:'tabbar-2'})">去tabbar2页面</button>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created(){
      console.log(666666)
  },
  methods: {

  },
  components: {

  }
}
</script>

<style>

</style>
