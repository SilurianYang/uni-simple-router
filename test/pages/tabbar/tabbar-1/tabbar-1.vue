<template>
	<view class="content">
		<button type="primary" @click="gotoPage">去路由页面1</button>
		<button type="primary" @click="gotoPage1">去tab5被拦截到路由4</button>
		<button type="primary" @click="gotoTab">跳转到tab4页面</button>
		
		<navigator url="/pages/router/router1/router1" hover-class="navigator-hover">
		                    <button type="default">跳转到新页面</button>
		</navigator>
		
		<router-link to="{name: 'tabbar-5',params: {name: '我只想去tab5的router-link'}}"></router-link>
		
		<router-link to="/pages/tabbar/tabbar-5/tabbar-5" navType="push" :append="true">
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
			//console.log(this)
		},
		created() {
		},
		methods: {
			gotoPage() {
				this.$Router.push('/pages/router/router1/router1')
			},
			gotoPage1(){
				this.$Router.pushTab({
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
