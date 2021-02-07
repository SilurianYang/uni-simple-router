<template>
	<view>
		<h1>其他页面</h1>
		<button type="default" @click="gotoPage">去页面2</button>
		<router-link1 to="{name:'routerLink'}"><button type="primary">去内置link组件页面</button></router-link1>
		<router-link1 to="{path:'/pages/relativePath/relativePath'}">
				<button type="warn">link组件去相对路径跳转页</button>
		</router-link1>
		<router-link1 to="{name:'dynamicPage'}">
			<button type="primary">去动态路由跳转页面</button>
		</router-link1>
		<router-link1 to="{name:'guard'}">
			<button type="primary">去路由守卫页面</button>
		</router-link1>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		gotoPage() {
			this.$Router.push({
				name: 'page2',
				params: {
					id: 1244
				}
			});
		}
	}
};
</script>

<style></style>
