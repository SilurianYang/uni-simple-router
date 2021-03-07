<template>
	<view>
		<h1>eventsEmit</h1>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(){
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.emit('acceptDataFromOpenedPage', {
				 data: 'eventsEmit页面回传的数据'
			 });
			eventChannel.on('goEventsEmit', data=> {
			     console.log(data)
			})
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
