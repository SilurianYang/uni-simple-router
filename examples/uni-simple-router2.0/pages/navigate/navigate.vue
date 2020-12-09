<template>
	<view>
		<button type="default" @click="back(1)">原生返回不带参数</button>
		<button type="default" @click="back(2)">原生返回带参数</button>
		<button type="default" @click="back(3)">插件返回不带参数</button>
		<button type="default" @click="back(4)">插件返回带参数</button>
		<button type="default" @click="back(5)">插件返回带动画</button>
		
		<button type="primary" @click="switchTab(1)">原生switchTab</button>
		<button type="primary" @click="switchTab(2)">插件switchTab对象path跳转</button>
		<button type="primary" @click="switchTab(3)">插件switchTab对象name跳转</button>
		<button type="primary" @click="switchTab(4)">插件switchTab字符串跳转</button>
		
		<button type="warn" @click="reLaunch(1)">原生reLaunch</button>
		<button type="warn" @click="reLaunch(2)">插件reLaunch对象path跳转</button>
		<button type="warn" @click="reLaunch(3)">插件reLaunch对象name跳转</button>
		<button type="warn" @click="reLaunch(4)">插件reLaunch字符串跳转</button>
		
		<button type="default" @click="redirectTo(1)">原生redirectTo</button>
		<button type="default" @click="redirectTo(2)">插件redirectTo对象path跳转</button>
		<button type="default" @click="redirectTo(3)">插件redirectTo对象name跳转</button>
		<button type="default" @click="redirectTo(4)">插件redirectTo字符串跳转</button>
		
		<button type="primary" @click="navigateTo(1)">原生navigateTo</button>
		<button type="primary" @click="navigateTo(2)">插件navigateTo对象path跳转</button>
		<button type="primary" @click="navigateTo(3)">插件navigateTo对象name跳转</button>
		<button type="primary" @click="navigateTo(4)">插件navigateTo字符串跳转</button>
		<button type="primary" @click="navigateTo(5)">插件navigateTo带动画跳转</button>
	</view>
</template>

<script>
	const openAnimation=['slide-in-right','slide-in-left','slide-in-top','slide-in-bottom','pop-in','fade-in','zoom-out','zoom-fade-out','none'];
	const closeAnimation=['slide-out-right','slide-out-left','slide-out-top','slide-out-bottom','pop-out','fade-out','zoom-in','zoom-fade-in','none'];
	const eventHook=function(pl,type){
		return {
			success:()=>{
				console.log(`${pl}-------跳转成功---${type}`)
			},
			complete:()=>{
				console.log(`${pl}----complete 跳转ok---${type}`)
			}
		}
	}
	export default {
		data() {
			return {
				
			}
		},
		onShow(){
			console.log('navigate-----onShow')
		},
		onLoad(){
			console.log('navigate-----onLoad')
		},
		methods: {
			navigateTo(type){
				switch (type){
					case 1:
						uni.navigateTo({
							url: '/pages/page3/page3',
							...eventHook('原生','navigateTo')
						});
						break;
					case 2:
						this.$Router.push({
							path: '/pages/page3/page3',
							query:{
								name:'navigateTo',
								id:110
							},
							...eventHook('插件','navigateTo')
						});
						break;
					case 3:
						this.$Router.push({
							name:'page3',
							params:{
								name:'navigateTo',
								id:110
							},
							...eventHook('插件','navigateTo')
						});
						break;
					case 4:
						this.$Router.push('/pages/page3/page3')
					break
					case 5:
						this.$Router.push({
							name:'page3',
							animationDuration:500,
							animationType:openAnimation[~~(Math.random()*openAnimation.length-1)],
							params:{
								name:'动画navigateTo',
								id:110
							},
							...eventHook('插件','navigateTo')
						})
					break
				}
			},
			redirectTo(type){
				switch (type){
					case 1:
						uni.redirectTo({
							url: '/pages/page3/page3',
							...eventHook('原生','redirectTo')
						});
						break;
					case 2:
						this.$Router.replace({
							path: '/pages/page3/page3',
							query:{
								name:'redirectTo',
								id:10010
							},
							...eventHook('插件','redirectTo')
						});
						break;
					case 3:
						this.$Router.replace({
							name:'page3',
							params:{
								name:'redirectTo',
								id:10010
							},
							...eventHook('插件','redirectTo')
						});
						break;
					case 4:
						this.$Router.replace('/pages/page3/page3')
					break
				}
			},
			reLaunch(type){
				switch (type){
					case 1:
						uni.reLaunch({
							url: '/pages/page3/page3',
							...eventHook('原生','reLaunch')
						});
						break;
					case 2:
						this.$Router.replaceAll({
							path:'/pages/page3/page3',
							query:{
								name:'reLaunch',
								id:1008611
							},
							...eventHook('插件','reLaunch')
						})
					break
					case 3:
						this.$Router.replaceAll({
							name:'page3',
							params:{
								name:'reLaunch',
								id:1008611
							},
							...eventHook('插件','reLaunch')
						})
					break
					case 4:
						this.$Router.replaceAll('/pages/page3/page3')
					break
				}
			},
			back(type){
				switch (type){
					case 1:
						uni.navigateBack();
						break;
					case 2:
						uni.navigateBack({
							delta:1
						});
						break
					case 3:
						this.$Router.back()
						break
					case 4:
						this.$Router.back(1)
						break
					case 5:
						this.$Router.back(1,{
							animationDuration:1000,
							animationType:closeAnimation[~~(Math.random()*closeAnimation.length-1)],
						});
					break
				}
			},
			switchTab(type){
				switch (type){
					case 1:
						uni.switchTab({
							url: '/pages/index/index',
							...eventHook('原生','switchTab')
						});
						break;
					case 2:
						this.$Router.pushTab({
							path:'/pages/index/index',
							...eventHook('插件','switchTab')
						})
						break
					case 3:
						this.$Router.pushTab({
							name:'index',
							...eventHook('插件','switchTab')
						})
						break
					case 4:
						this.$Router.pushTab('/pages/index/index')
						break
				}
			}
		}
	}
</script>

<style>

</style>
