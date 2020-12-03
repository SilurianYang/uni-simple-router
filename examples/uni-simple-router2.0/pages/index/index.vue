<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<div>
			<com></com>
		</div>
		<button type="default" @click="gotoPage">点我去page2</button>
		<!-- #ifdef MP-WEIXIN -->
		<button type="default" @click="forceEach">微信小程序看到我，强制触发</button>
		<!-- #endif -->
	</view>
</template>

<script>
	import com from '@/common/com/com.vue'
	export default {
		components:{
			com
		},
		data() {	
			return {
				title: 'Hello'
			}
		},
		watch:{
			$Route:{
				handler: function(val){
					console.log(val)
				},
				//immediate: true
			}
		},
		beforeCreate(){
			console.log('index-----beforeCreate')
		},
		created(){
			console.log('index-----created')
		},
		mounted(){
			console.log('index-----mounted')
		},
		onLoad() {
			console.log('index-----onload')
		},
		onShow() {
			console.log('index-----onShow')
		},
		methods: {
			forceEach(){
				this.$Router.forceGuardEach();
			},
			gotoPage(){
				// this.$Router.push({
				// 	path:'/pages/404/404',
				// 	query:{
				// 		status:true,
				// 		list:[
				// 			{
				// 				id:1
				// 			},
				// 		]
				// 	}
				// })
				// this.$Router.push({
				// 	success:()=>{
				// 		console.log('跳转成功')
				// 	},
				// 	complete:()=>{
				// 		console.log('跳转结束')
				// 	},
				// 	fail:()=>{
				// 		console.log('跳转失败')
				// 	},
				// 	name:'page2',
				// 	params:{
				// 		id:12
				// 	}
				// })
				uni.navigateTo({
					url:'/pages/navigate/navigate?id=555&name=hhyang',
					success:()=>{
						console.log('跳转成功')
					},
				})
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
