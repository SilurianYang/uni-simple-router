<template>
	<view>
		<h1>页面4</h1>
		<button type="default" @click="back">返回</button>
		<button type="default" @click="switchTab">switchTab</button>
		<button type="default" @click="reLaunch">reLaunch</button>
		<button type="default" @click="redirectTo">redirectTo</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			redirectTo(){
				uni.redirectTo({
				    url: '/pages/page3/page3',
					success:()=>{
						console.log('跳转成功---redirectTo')
					},
					complete:()=>{
						console.log('complete 跳转ok---redirectTo')
					}
				});
			},
			reLaunch(){
				uni.reLaunch({
				    url: '/pages/page3/page3',
					success:()=>{
						console.log('跳转成功')
					},
					complete:()=>{
						console.log('complete 跳转ok')
					}
				});
			},
			back(){
				uni.navigateBack({
					delta:1
				});
			},
			switchTab(){
				uni.switchTab({
				    url: '/pages/index/index',
					success:()=>{
						console.log('跳转成功')
					},
					complete:()=>{
						console.log('complete 跳转ok')
					}
				});
			}
		}
	}
</script>

<style>

</style>
