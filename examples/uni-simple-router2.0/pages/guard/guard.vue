<template>
	<view>
		<button type="default" @click="$Router.back()">返回上一级</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
				beforeRouteLeave(to, from, next) {   
					uni.showModal({
					    title: '提示',
					    content: '您确定要离开？',
					    success: function (res) {
					        if (res.confirm) {
					            next();
					        } else if (res.cancel) {
					            next(false);
					        }
					    }
					});
				},
		methods: {
			
		}
	}
</script>

<style>

</style>
