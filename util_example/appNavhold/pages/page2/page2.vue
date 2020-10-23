<template>
	<view>
		<h1>这是page2</h1>
		<button type="primary" @click="gotoPage1">去第三方页面</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onBackPress(){
			console.log('返回')
		},
		onLoad(){
			console.log(this.$route)
		},
		methods: {
			gotoPage1(){
				location.href='https://www.baidu.com/'
			}
		}
	}
</script>

<style>

</style>
