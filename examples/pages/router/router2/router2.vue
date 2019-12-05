<template>
	<view>
		<h1>路由2</h1>
		
		<button type="primary" @click="gotoPage">去下一个页面</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			console.log('onload')
		},
		onUnload() {
			console.log('onUnload')
		},
		beforeDestroy() {
			console.log('beforeDestroy')
		},
		methods: {
			gotoPage(){
				this.$Router.push({
					name:'router6'
				})
			}
		}
	}
</script>

<style>

</style>
