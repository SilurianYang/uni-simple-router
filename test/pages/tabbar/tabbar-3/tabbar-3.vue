<template>
	<view class="content" >
		<button type="primary">去路由页面3</button>
	</view>
</template> 

<script>
export default {
	data() {
		return {
			active: false
		};
	},
	onLoad() {},
	onHide() {
		
	},
	methods: {
		goToPage(url) {
			if (!url) return;
			uni.navigateTo({
				url
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	text-align: center;
	height: 400upx;
	margin-top: 200upx;
}
</style>
