<template>
	<div>
		<h1>子组件的子组件</h1>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		beforeMount(){
			console.log('comChild-----beforeMount')
		},
		created(){
			console.log('comChild----created')
		},
		mounted(){
			console.log('comChild----mounted')
		},
		onLoad() {
			console.log('comChild-----onload')
		},
		onShow() {
			console.log('comChild-----onShow')
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
