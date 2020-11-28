<template>
	<view>
		<h1>页面2</h1>
		<button type="default" @click="goOtherWeb">去其第三方页面</button>
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
			goOtherWeb(){
				location.href='https://www.baidu.com/'
			},
		}
	}
</script>

<style>

</style>
