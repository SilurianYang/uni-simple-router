<template>
	<view class="content">
		<button type="primary" @click="gotoPage">去路由页面1</button>
		<button type="primary" @click="gotoPage1">去tab5被拦截到路由4</button>
		<button type="primary" @click="gotoTab">跳转到tab4页面</button>

		<navigator url="/pages/router/router1/router1" hover-class="navigator-hover">
			<button type="default">跳转到新页面</button>
		</navigator>

		<router-link class="best-list-item" to="{name: 'router5',params: {name: '/tabbar-5'}}">
			<button type="primary">router-link</button>
		</router-link>

		<router-link to="{path:'/pages/router/router5/router5',query:{name:'hhyang'}}" navType="push">
			<button type="warn">点我试试</button>
		</router-link>
		
		<button type="primary" @click="userOut">退出去登陆</button>

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
				title: 'Hello'
			};
		},
		computed: {
			query() {
				return this.$Route.query
			}
		},
		created() {},
		methods: {
			userOut(){
				this.$Router.replaceAll('/pages/login/login')
			},
			gotoPage() {
				 //this.$Router.push('/router5')
				
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
