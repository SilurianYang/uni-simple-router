<template>
	<view>
		<h1>页面2</h1>
		<button type="default" @click="goOtherWeb">去其第三方页面</button>
		<button type="default" @click="goToLInk">去lnk组件页面</button>
		<button type="warn" @click="goBack1">返回上一级$Router</button>
		<button type="warn" @click="goBack2">返回上一UNI</button>
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
		onBackPress(...e){
			console.log(e)
			return true
		},
		methods: {
			goOtherWeb(){
				location.href='https://www.baidu.com/'
			},
			goToLInk(){
				this.$Router.push({
					name:'routerLink'
				})
			},
			goBack1(){
				this.$Router.back()
			},
			goBack2(){
				uni.navigateBack()
			}
		}
	}
</script>

<style>

</style>
