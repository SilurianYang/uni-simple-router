<template>
	<view class="content">
		<button type="primary" @click="gotoPage">去路由页面1</button>
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
			console.log(this.$Route)
			//console.log(this)
		},
		created() {
			//console.log(this)
		},
		methods: {
			gotoPage() {
				this.$Router.push({
					name: 'router1',
					params: {
						name: '我是你爸爸',
						ages: 21
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
