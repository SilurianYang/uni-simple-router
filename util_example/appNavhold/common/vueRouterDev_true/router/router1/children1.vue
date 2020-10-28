<template>
  <div>
      <h1>vueRouterDev:true</h1>
      <h3>router1下的子组件children1</h3>
	  <button type="default" @click="gotoPage">去route1/children2</button>
	  <button type="default" @click="gotoPage1">去/router5/:id</button>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created(){
	alert(554154)
  },
  methods: {
	gotoPage(){
		this.$router.push({
			path:'/route1/children2'
		})
	},
	gotoPage1(){
		this.$router.push({
			name:'router5',
			params:{
				id:6666
			}
		})	
	},
  },
  components: {

  }
}
</script>

<style>

</style>
