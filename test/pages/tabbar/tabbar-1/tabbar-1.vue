<template>
	<view class="content">
		<button type="primary" @click="gotoPage">去路由页面1</button>
		<button type="primary" @click="gotoPage1">去tab5被拦截到路由4</button>
		<button type="primary" @click="gotoTab">跳转到tab4页面</button>

		<navigator url="/pages/router/router1/router1" hover-class="navigator-hover">
			<button type="default">跳转到新页面</button>
		</navigator>

		<router-link class="best-list-item" to="{name: 'router5',params: {name: 'http://192.168.1.160:8082/#/pages/tabbar/tabbar-5/tabbar-5'}}">
			<button type="primary">router-link</button>
		</router-link>

		<router-link to="{path:'/pages/router/router5/router5',query:{name:'hhyang'}}" navType="push">
			<button type="warn">点我试试</button>
		</router-link>


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
		onLoad() {
			console.log('tab1')
		},
		computed: {
			query() {
				return this.$Route.query
			}
		},
		created() {},
		methods: {
			gotoPage() {
				this.$Router.push({
					name: 'router5',
					params: {
						name: 'mynameishhyang',
						ages:22,
						info:{
							number:6666,
							ip:7777,
							kk:{
								lll:9999
							}
						}
					}
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
