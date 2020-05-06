<template>
	<view class="content">
		<button type="primary" @click="gotoPage">去路由页面1</button>
		<button type="primary" @click="gotoPage1">去tab5被拦截到路由4</button>
		<button type="primary" @click="gotoTab">跳转到tab4页面</button>

		<router-link class="best-list-item" :to="{name: 'router5',params}">
			<button type="primary">router-link</button>
		</router-link>

		<router-link :to="{path,query:{name:'hhyang'}}" navType="push">
			<button type="warn">动态router-link path</button>
		</router-link>
		
		<router-link :to="{name:'router5'}" navType="push">
			<button type="warn">点我试试</button>
		</router-link>
		
		<button type="primary" @click="userOut">退出去登陆</button>
		<button type="primary" @click="$Router.push({name:'nvue1',params:{msg:'tabbar1过来的'}})">去nvue1</button>

		<Child></Child>
		<Child1></Child1>
	</view>
</template>

<script>
	import Child from './component.vue'
	import Child1 from './child.vue'
	export default {
		components: {
			Child,
			Child1
		},
		data() {
			return {
				title: 'Hello',
				params:{name: 'tabbar-5'},
				path:'/pages/router/router5/router5'
				
			};
		},
		onLoad(){
			console.log('tabbar ---- onLoad')
			console.log(this)
		},
		onReady(){
			console.log('tabbar ---- onReady')
		},
		onShow(){
			console.log('tabbar ---- onShow')
		},
		beforeRouteLeave (to,from,next){
			console.log(to)
			console.log(from)
			next();
		},
		methods: {
			userOut(){
				this.$Router.replaceAll('/pages/login/login')
			},
			gotoPage() {
				
				// this.$Router.push({
				// 	path: '/pages/router/router5/router5',
				// 	query: {
				// 		userId: '123'
				// 	}
				// })
				
				//this.$Router.push('/pages/router/router5/router5');
				
				// uni.navigateTo({
				// 	url:'/router5'
				// })
				
				// this.$Router.pushTab({
				// 	name:'tabbar-2'
				// })
				
				this.$Router.push({
					name: 'router5',
					params:{
						name: '我只想去router5 /% *& ！',
						key: {
							ages: " sdasd79&)) ^&^^",
							name: '德玛测试'
						}
					},
				})
			},
			gotoPage1() {
				this.$Router.push({
					name: 'router5',
					params: {
						name: '我只想去router5 /% *& ！',
						key: {
							ages: " sdasd79&)) ^&^^",
							name: '德玛测试'
						}
					}
				})
			},
			gotoTab() {
				this.$Router.pushTab({
					name: 'tabbar-4',
					params: {
						name: 'hhyang'
					}
				})
			}
		}
	};
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
		margin-top: 200upx;
	}
</style>
