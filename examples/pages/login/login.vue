<template>
	<view>
		<h1>登陆页面</h1>
		<button type="primary" @click="gotoPage">登陆一下</button>
		<button type="primary" @click="gotoPageG">官方api登录下</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onShow(){
			console.log('login----onshow')
		},
		onLoad(){
			console.log(this.$Route)
		},
		methods: {
			gotoPage(){
				this.$Router.pushTab({name:'tabbar-1'})
			},
			gotoPageG(){
				uni.switchTab({
					url:'/pages/tabbar/tabbar-1/tabbar-1'
				})
			}
		}
	}
</script>

<style>

</style>
