<template>
	<view>
		<h1>组件1</h1>
		<comChild></comChild>
	</view>
</template>

<script>
	import comChild from '../comChild/comChild.vue'
	export default {
		components:{
			comChild
		},
		data() {
			return {
				
			}
		},
		beforeMount(){
			console.log('index-child-----beforeMount')
		},
		created(){
			console.log('index-child----created')
		},
		mounted(){
			console.log('index-child----mounted')
		},
		onLoad() {
			console.log('index-child-----onload');
		},
		onShow() {
			console.log('index-child-----onShow');
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
