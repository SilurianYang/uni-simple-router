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
		beforeCreate(){
			console.log('comChild--beforeCreate----beforeCreate')
		},
		created(){
			console.log('comChild--created----created')
		},
		mounted(){
			console.log('comChild--mounted----mounted')
		},
		onLoad() {
			console.log('comChild-onLoad-----onload')
		},
		onShow() {
			console.log('comChild-onLoad-----onShow')
		},
		methods: {
			
		}
	}
</script>

<style>
</style>
