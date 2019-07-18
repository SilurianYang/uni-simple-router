<template>
	<view>
		<h1>路由4</h1>
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
			this.msg=JSON.stringify(this.$Route.query)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
