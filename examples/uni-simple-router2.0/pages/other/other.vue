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
		<router-link1 to="{name:'animation'}">
			<button type="warn">去跳转动画页面</button>
		</router-link1>
		<router-link1 to="{name:'beforeRouteLeave'}">
			<button type="primary">去beforeRouteLeave页面</button>
		</router-link1>
		<router-link1 to="{name:'events'}">
			<button type="primary">去events页面</button>
		</router-link1>
		<router-link1 to="{name:'webView'}">
			<button type="warn">内置web-view组件页</button>
		</router-link1>
		<button type="warn" @click="$Router.push({path:'/dynamicPage'})">跳转H5-path别名</button>
		<button type="warn" @click="$Router.push({name:'dynamicPage'})">跳转H5-name别名</button>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onTabItemTap(...e){
		console.log(e);
		console.log('@@@@@@@@@@@@@-----tab2页面被点击------@@@@@@@@@@@@')
	},
	onShow() {
		console.log('other-----onShow')
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
