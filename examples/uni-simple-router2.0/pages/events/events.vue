<template>
	<view>
		<h1>events</h1>
		<button type="default" @click="gotoPage()">去eventsEmit页面</button>
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
				path: '/pages/eventsEmit/eventsEmit',
				events: {
					acceptDataFromOpenedPage: data => {
						console.log(data);
					}
				},
				success: res => {
					console.log(res)
					res.eventChannel.emit('goEventsEmit', { 
						data: 'events页面向eventsEmit传递的数据' 
					});
				}
			});
		}
	}
};
</script>

<style></style>
