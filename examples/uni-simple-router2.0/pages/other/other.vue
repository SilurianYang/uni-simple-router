<template>
	<view>
		<h1>其他页面</h1>
		<button type="default" @click="gotoPage">去页面2</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			gotoPage(){
				this.$Router.push({
					name:'page2',
					params:{
						id:1244
					}
				})
			}
		}
	}
</script>

<style>

</style>
