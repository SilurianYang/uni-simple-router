<template>
	<view>
		<h1>路由4</h1>
		<p>{{msg}}</p>
		<p>3秒后返回上一级</p>
		<button type="primary" @click="gotoPage">路由6</button>
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
			console.log('路由4')
			this.msg=JSON.stringify(this.$Route.query)
			setTimeout(()=> {
					this.$Router.back()
			}, 3000);
		},
		methods: {
			gotoPage(){
				this.$Router.push({name:'router6'})
			}
		}
	}
</script>

<style>

</style>
