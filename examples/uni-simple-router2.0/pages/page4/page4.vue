<template>
	<view>
		<h1>page4</h1>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(options){
			console.log(options)
			console.log(this.$Route);
			
			  // #ifdef APP-NVUE
			  const eventChannel = this.$scope.eventChannel; // 兼容APP-NVUE
			  // #endif
			  // #ifndef APP-NVUE
			  const eventChannel = this.getOpenerEventChannel();
			  // #endif
			 
			  eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
			 eventChannel.on('acceptDataFromOpenerPage', function(data) {
			     console.log(data)
			   })
			   
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
