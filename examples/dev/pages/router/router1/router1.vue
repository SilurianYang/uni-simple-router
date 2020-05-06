<template>
	<view>
		<h1>路由1</h1>
		<p>3秒后跳转到路由2页面</p>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			//console.log(this.$Route);
			console.log('路由1')
			setTimeout(()=>{
				this.$Router.push({name:'router2'})
			},3000)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
