<template>
	<view>
			<p>这是一个检测参数的页面</p>
			<textarea :value="value" placeholder="" />
			
			<button type="primary" @click="gotoPage">去下一个页面</button>
			<button type="default" @click="$Router.back(1)">用api返回</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value:'666',
				name:'7777'
			};
		},
		onLoad(){
			console.log(this)
			this.value=JSON.stringify(this.$Route)
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
		onBackPress(args){
			console.log(args)
		},
		onBeforeBack(args){
			console.log(`onBeforeBack:---${JSON.stringify(args)}`)
		},
		beforeRouteLeave(to,from,next){
			console.log(to)
			console.log(from)
			console.log(this.value)
			next();
			// next({
			// 	path:'/pages/router/router2/router2',
			// 	NAVTYPE:'push'
			// });
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
