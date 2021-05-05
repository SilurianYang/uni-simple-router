<template>
	<view>
		<h1>nvue1</h1>
		<button type="default" @click="back">api返回被阻止</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onBackPress(...e){
			console.log(e)
		},
		methods: {
			back(){
				uni.navigateBack();
			}
		}
	}
</script>

<style>

</style>
