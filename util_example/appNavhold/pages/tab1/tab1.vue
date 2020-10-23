<template>
	<view>
		<h1>tab1</h1>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageName:'tab1'
			}
		},
		beforeRouteLeave(to,from,next){
			console.log('-------------------------tab1++++beforeRouteLeave-------------------------------------')
			console.log(to)
			console.log(from)
			next();
			console.log('-------------------------tab1++++beforeRouteLeave结束-------------------------------------')
		},
		methods: {
			dasdhsaudjsahdasj(){
				alert(66666)
			}
		}
	}
</script>

<style>

</style>
