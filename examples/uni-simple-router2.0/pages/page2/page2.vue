<template>
	<view>
		<h1>页面2</h1>
		<button type="default" @click="goOtherWeb">去其第三方页面</button>
		<button type="default" @click="goToLInk">去lnk组件页面</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(...options){
			console.log(options)
			console.log(this.$Route)
		},
		methods: {
			goOtherWeb(){
				location.href='https://www.baidu.com/'
			},
			goToLInk(){
				this.$Router.push({
					name:'routerLink'
				})
			}
		}
	}
</script>

<style>

</style>
