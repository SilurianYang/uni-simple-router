<template>
	<view>
		<button 
			type="primary" 
			@click="gotoPage('../builtIn/builtIn')"
		>../builtIn/builtIn</button>
		<button
			type="primary" 
			@click="gotoPage('../builtIn/builtIn?id=4')"
		>../builtIn/builtIn?id=4</button>
		<button 
			type="primary" 
			@click="gotoPage('./relativePath2')"
		>./relativePath2</button>
		<button
			type="primary" 
			@click="gotoPage('./relativePath2?id=5')"
		>./relativePath2?id=5</button>
		<button
			type="primary" 
			@click="gotoPage('../relativePathP?id=3')"
		>../relativePathP?id=3</button>
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
