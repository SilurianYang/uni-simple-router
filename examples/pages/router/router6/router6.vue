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
		methods:{
			gotoPage(){
				this.$Router.push({
					name:'router3'
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
