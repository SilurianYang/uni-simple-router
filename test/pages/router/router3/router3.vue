<template>
	<view>
		<h1>路由3</h1>
		<p>提示信息：</p>
		<p>{{msg}}</p>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg:''
			}
		},
		onLoad() {
			console.log('路由3')
			this.msg=this.$Route.query.msg;
			setTimeout(()=>{
					this.$Router.back()
			},3000)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
