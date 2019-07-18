<template>
	<view>
		这是tabbar-1的子组件里的子组件
		<button type="primary" @click="gotoPage">子组件的子按钮</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		created(){
			//console.log(this.$Route)
		},
		methods:{
			gotoPage() {
				this.$Router.push({
					name: 'router1',
					params: {
						name: '我是你爸爸',
						ages: 21
					}
				})
			},
		}
	}
</script>

<style lang="scss">

</style>
