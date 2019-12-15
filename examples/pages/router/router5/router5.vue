<template>
	<view>
			<p>这是一个检测参数的页面</p>
			<textarea :value="value" placeholder="" />
			
			<button type="primary" @click="gotoPage">去下一个页面</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:''
			};
		},
		onLoad(){
			console.log('onLoad')
			this.value=JSON.stringify(this.$Route)
			// console.log(this.$Router)
		},
		onShow(){
			console.log('show')
		},
		onHide(){
			console.log(`onHide`)
		},
		onUnload(){
			console.log('onUnload')
		},
		onBackPress(){
		},
		methods:{
			gotoPage(){
				this.$Router.push({
					name:'router2'
				})
				// uni.navigateTo({
				// 	url:'/pages/router/router2/router2'
				// })
			}
		}
	}
</script>

<style lang="scss">

</style>
