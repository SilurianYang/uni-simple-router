<template>
	<view>
		<h1>页面3</h1>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		beforeRouteLeave(to,from,next){
			console.log('-------------------------page3++++beforeRouteLeave-------------------------------------')
			console.log(to)
			console.log(from)
			next();
			console.log('-------------------------page3++++beforeRouteLeave结束-------------------------------------')
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
