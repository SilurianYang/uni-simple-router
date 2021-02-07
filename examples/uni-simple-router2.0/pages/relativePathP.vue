<template>
	<view>
		<h1>相对路径的顶级页面</h1>
		
		<button
			type="primary" 
			@click="gotoPage('./relativePath/relativePath?id=3')"
		>./relativePath/relativePath?id=3</button>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			gotoPage(path){
				uni.navigateTo({
					url:path
				})
			}
		}
	}
</script>

<style>

</style>
