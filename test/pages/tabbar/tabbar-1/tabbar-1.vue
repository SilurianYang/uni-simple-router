<template>
	<view class="content">
		<button type="primary" @click="gotoPage">去路由页面1</button>
		<button type="primary" @click="gotoPage1">去tab5被拦截到路由4</button>
		<button type="primary" @click="gotoTab">跳转到tab4页面</button>
		<Child></Child>
		<Child1></Child1>
		
		
		
		<h3 style="margin: 40px 0 10px 0; text-align: left;">路由组件：</h3>
		<router-link to="{name: tabbar-4,params: {name: '我只想去tab5的router-link'}}" navType="pushTab">
			<button type="primary">使用name对象跳转</button>
		</router-link>
		<router-link to="{path: '/pages/tabbar/tabbar-4/tabbar-4',query: {name: '我只想去tab5的router-link'}}" navType="pushTab">
			<button type="primary">使用path对象跳转</button>
		</router-link>
		<router-link to="{path: '/tabbar-4/tabbar-4,query': {name: '我只想去tab5的router-link'}}" navType="pushTab" :level="2" :append="true">
			<button type="primary">使用path对象继承父路径跳转</button>
		</router-link>
		
		<router-link to="/pages/tabbar/tabbar-4/tabbar-4" navType="pushTab">
			<button type="warn">通过路由path直接跳转</button>
		</router-link>
		<router-link to="/tabbar-4/tabbar-4" navType="pushTab" :level="2" :append="true">
			<button type="warn">通过路由path继承父路径跳转</button>
		</router-link>
		
		<router-link to="/tabbar-4/tabbar-4" navType="pushTab" :level="2" :append="true" :stopNavto="true">
			<button type="default">阻止组件事件,不会跳转</button>
		</router-link>
		
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
