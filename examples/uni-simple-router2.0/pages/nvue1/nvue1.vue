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
		methods: {
			back(){
				uni.navigateBack();
			}
		}
	}
</script>

<style>

</style>
