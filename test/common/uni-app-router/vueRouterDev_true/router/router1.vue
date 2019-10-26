<template>
  <div>
      <h1>vueRouterDev:true</h1>
      <h3>router1</h3>
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
    console.log(this.$route)
  },
  methods: {

  },
  components: {

  }
}
</script>

<style>

</style>
