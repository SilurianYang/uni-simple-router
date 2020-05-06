<template>
	<view class="content">
		两秒之后看到的这个页面？没错吧! 自己去路由守卫里面改
		<button type="default" @click="$Router.push('/pages/router1/router1')">去router1页面</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style>
.content {
	text-align: center;
	height: 400upx;
	margin-top: 200upx;
}
</style>
