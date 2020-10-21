<template>
	<view>
		<h1>这是page2</h1>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onBackPress(){
			console.log('返回')
		},
		onLoad(){
			console.log(this.$route)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
