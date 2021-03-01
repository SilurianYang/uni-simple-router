<template>
	<view>
		<h1>当前页为app端测试跳转动画页面</h1>
		<button type="default" @click="gotoPage">去测试页面</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			gotoPage(){
				// this.$Router.push({
				// 	animationType:'slide-in-left',
				// 	animationDuration:500,
				// 	name:'routerLink'
				// })
				
				// this.$Router.push({
				// 	animation:{
				// 		animationType:'slide-in-left',
				// 		animationDuration:500,
				// 	},
				// 	name:'routerLink'
				// })
				
				uni.navigateTo({
					url:'/pages/routerlink/routerlink',
					animationType:'slide-in-left',
					animationDuration:300,
				})
			}
		}
	}
</script>

<style>

</style>
