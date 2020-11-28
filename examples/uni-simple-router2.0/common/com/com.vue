<template>
	<view>
		<h1>组件1</h1>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		beforeCreate(){
			console.log('index--beforeCreate----onload')
		},
		created(){
			console.log('index--created----onload')
		},
		mounted(){
			console.log('index--mounted----onload')
		},
		onLoad() {
			console.log('index-child-----onload')
		},
		onShow() {
			console.log('index-child-----onShow')
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
