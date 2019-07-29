<template>
	<view class="content">
		<button type="primary" @click="gotoPage">去路由页面5</button>
		<button type="primary" @click="gotoPage1">去路由页面5 官方路由</button>
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
		},
		methods: {
			gotoPage(){
				this.$Router.push({
					name:'router5',
					params:{
						type:true,
						info:{
							name:'hhyang',
							ages:21,
							info:{
								name1:'hhyang',
								ages1:21
							},
							info2:{
								name2:'hhyang',
								ages2:21
							}
						}
					}
				})
			},
			gotoPage1(){
				uni.navigateTo({
					url:'/pages/router/router5/router5'
				})
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}
</style>
