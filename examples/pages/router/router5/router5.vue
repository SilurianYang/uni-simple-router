<template>
	<view>
			<p>这是一个检测参数的页面</p>
			<textarea :value="value" placeholder="" />
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
			this.value=JSON.stringify(this.$Route.query)
		},
		onShow(){
			console.log('show')
		},
		onHide(){
			console.log(`onHide`)
		},
		onUnload(){
			console.log('onUnload')
		}
	}
</script>

<style lang="scss">

</style>
