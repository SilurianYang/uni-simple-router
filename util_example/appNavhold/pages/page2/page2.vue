<template>
	<view>
		<h1>这是page2</h1>
		<button type="primary" @click="gotoPage1">去第三方页面</button>
		<button type="default" @click="backPage">返回上一页</button>
		<button type="warn" @click="gotoNext">去下一个页面</button>
		<div class="box">1</div>
		<div class="box">2</div>
		<div class="box">3</div>
		<div class="box">4</div>
		<div class="box">5</div>
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
			console.log('-------------page2-----------onLoad')
		},
		methods: {
			gotoPage1(){
				location.href='https://www.baidu.com/'
			},
			backPage(){
				uni.navigateBack({
					delta:1,
					animationType:'pop-out',
					animationDuration:300
				})
			},
			gotoNext(){
				uni.navigateTo({
					url:'/pages/page3/page3',
					success:()=>{
						console.log('成功')
					},
					fail:()=>{
						console.log('失败')
					}
				})
			}
		}
	}
</script>

<style>
.box{
	height: 300rpx;
	background-color: #F0AD4E;
	margin-bottom: 30rpx;
}
</style>
