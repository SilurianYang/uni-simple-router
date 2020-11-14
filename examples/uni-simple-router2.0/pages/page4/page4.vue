<template>
	<view>
		<h1>页面4</h1>
		<button type="default" @click="$Rouer.back()">返回</button>
		<button type="default" @click="switchTab">switchTab</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			back(){
				uni.navigateBack();
			},
			switchTab(){
				uni.switchTab({
				    url: '/pages/index/index'
				});
			}
		}
	}
</script>

<style>

</style>
