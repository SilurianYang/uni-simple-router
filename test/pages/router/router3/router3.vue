<template>
	<view>
		<h1>路由3</h1>
		<p>提示信息：</p>
		<p>{{msg}}</p>
		<p>3秒后返回首页</p>
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
			this.msg=this.$Route.query.msg;
			setTimeout(()=>{
					this.$Router.back(2)
			},3000)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
