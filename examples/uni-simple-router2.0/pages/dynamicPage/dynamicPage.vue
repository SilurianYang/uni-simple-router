<template>
	<view>
		<router-link1 to="{name:'page2',params:{id:666}}">
			<button type="primary">去规则/page2/:id的页面</button>
		</router-link1>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(){
			console.log('-----dynamicPage----onLoad')
		},
		onShow(){
			console.log('-----dynamicPage----onShow')
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
