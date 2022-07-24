<template>
	<view>
		<h2>页面2</h2>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(){
			console.log(`---------------------index2---onload--------------`)
		},
		onShow(options){
			console.log(options) 
			console.log(`---------------------index2---onShow--------------`)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
