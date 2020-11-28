<template>
	<view>
		<h1>登录页面</h1>
		<button type="default" @click="gotoPage">去下一个页面</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			console.log('login-----onload')
			console.log(this.$route)
		},
		onShow() {
			console.log('login-----onShow')
			uni.hideTabBar()
		},
		methods: {
			gotoPage(){
				this.$Router.pushTab({
					path:'/pages/index/index'
				})
			}
		}
	}
</script>

<style>

</style>
