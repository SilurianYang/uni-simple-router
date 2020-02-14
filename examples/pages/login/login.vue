<template>
	<view>
		<h1>登陆页面</h1>
		<button type="primary" @click="gotoPage">登陆一下</button>
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
			}
		}
	}
</script>

<style>

</style>
