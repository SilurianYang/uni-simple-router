<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<button type="default" @click="gotoPage">去下一个页面</button>
		<button type="primary" @click="gotoPage1">去第三方页面</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			console.log('onLoad');
			console.log(this)
		},
		onShow() {
			console.log('onShow')
		},
		onReady() {
			console.log('onReady')
		},
		onHide() {
			console.log('onHide')
		},
		onUnload() {
			console.log('onUnload')
		},
		onResize() {
			console.log('onResize')
		},
		beforeRouteLeave(to,from,next){
			console.log('-------------------------index++++beforeRouteLeave-------------------------------------')
			console.log(to)
			console.log(from)
			next();
			console.log('-------------------------index++++beforeRouteLeave结束-------------------------------------')
		},
		methods: {
			gotoPage(){
				this.$Router.push({
					name:'page2',
					success:(agrs)=>{
						console.log(agrs)
						console.log('跳转成功')
					},
						fail: ()=>{
							console.log('跳转失败')
						},
						complete:()=>{
							console.log('跳转结束')
						},
						params:{
							name:123,
							ages:10086
						}
				})
				// console.log('-------------------------------')
				// this.$Router.push({
				// 	path:'/pages',
				// 		query:{
				// 			name:123,
				// 			ages:10086
				// 		}
				// })
				// console.log('-------------------------------')
				// this.$Router.push('/1111')
				
				// this.$router.push({
				// 	name:'page2',
				// 	// params:{
				// 	// 	name:123
				// 	// }
				// })
				
				// uni.navigateTo({
				// 	url:'/pages/page2/page2'
				// })
			},
			gotoPage1(){
				location.href='https://www.baidu.com/'
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
