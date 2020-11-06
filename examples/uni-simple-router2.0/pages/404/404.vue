<template>
	<view>
		<h1>迷路啦，找不到页面</h1>
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
			
		}
	}
</script>

<style>

</style>
