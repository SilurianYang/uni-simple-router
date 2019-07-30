<template>
	<view class="content">
		<button type="primary" @click="gotoPage">去路由页面1</button>
		<button type="primary" @click="gotoPage1">去tab5被拦截到路由4</button>
		<button type="primary" @click="gotoTab">跳转到tab4页面</button>
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
		},
		created() {
		},
		methods: {
			gotoPage() {
				this.$Router.push('/pages/router/router1/router1')
			},
			gotoPage1(){
				this.$Router.push({
					name: 'tabbar-5',
					params: {
						name: '我只想去tab5',
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
