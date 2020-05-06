<template>
	<view>
		<h1>路由6</h1>
		<button type="primary" @click="gotoPage">去下一个页面</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		beforeRouteLeave(to, from, next) {
			console.log(to)
			console.log(from)
			next();
			// next({
			// 	path:'/pages/router/router2/router2',
			// 	NAVTYPE:'push'
			// });
		},
	}
</script>

<style lang="scss">

</style>
