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
		},
		onShow() {
			console.log('index-----onShow')
			console.log(this.Route)
		},
		computed:{
			Route(){
				return this.$Route
			}
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
				this.$Router.back(1,{
					success:(...arg)=>{
						console.log(arg)
						console.log('$Router.back-page2返回成功')
					},
					fail:(...err)=>{
						console.log(err)
						console.log('$Router.back-page2返回成功')
					}
				})
			},
			goBack2(){
				uni.navigateBack({
					delta:9,
					success:(...arg)=>{
						console.log(arg)
						console.log('navigateBack-page2返回成功')
					},
					fail:(...err)=>{
						console.log(err)
						console.log('navigateBack-page2返回成功')
					}
				})
			}
		}
	}
</script>

<style>

</style>
