<template>
	<view>
		<router-link1
			v-for="(item,index) in navlist"
			:key="'obj'+index"
			:to="item" 
		>
		  <button type="primary">去{{item.name}}对象形式</button>
		</router-link1>
		<h1>----------分割线--------</h1>
		<router-link1
			v-for="(item,index) in navlist"
			:key="index"
			:to="`{name:${item.name},params:${JSON.stringify(item.params)}}`" 
		>
		  <button type="primary">去{{item.name}}字符串拼接</button>
		</router-link1>
		
		<h1>----------分割线--------</h1>
		<router-link1
			to="{name:'404',params:{id:'1'}}" 
		>
		  <button type="primary">纯name跳转字符串</button>
		</router-link1>
		<router-link1
			to="{path:'/pages/404/404',query:{id:'1'}}" 
		>
		  <button type="primary">纯path跳转字符串(绝对路径)</button>
		</router-link1>
		<h1>----------分割线--------</h1>
		
		
		<router-link1 
			to="/404/404" 
			:level="2" 
			:append="true"
		>
		  <button type="warn">通过路由path继承父路径跳转</button>
		</router-link1>
		
		<h1>----------分割线--------</h1>
		
		<router-link1 to="/pages/404/404"  :stopNavto="true">
		  <button type="default">阻止组件事件,不会跳转</button>
		</router-link1>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navlist:[
					{
						name:'404',
						params:{
							name:'hhyang',
							id:1
						}
					},
					{
						name:'404',
						params:{
							id:1
						}
					},
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
