<template>
	<view>
		<h1>页面3</h1>
		<button type="default" @click="$Router.push('/pages/nvue1/nvue1?msg=我来自page3')">去nvue1页面</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(){
			console.log('onLoad-------page3')
		},
		onShow() {
			console.log('onShow-------page3')
		},
		onReady() {
			console.log('onReady-------page3')
		},
		onHide() {
			console.log('onHide-------page3')
		},
		onUnload() {
			console.log('onUnload-------page3')
		},
		onResize() {
			console.log('onResize-------page3')
		},
		beforeRouteLeave(to,from,next){
			console.log('-------------------------page3++++beforeRouteLeave-------------------------------------')
			console.log(to)
			console.log(from)
			setTimeout(()=>{
				console.log('-------------------------page3++++beforeRouteLeave结束-------------------------------------')
				next();
			},3000)
		},
		methods: {
		}
	}
</script>

<style>

</style>
