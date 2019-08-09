<script>
export default {
	onLaunch: function() {
		// this.$Router.push({
		// 	name:'router4',
		// 	params:{
		// 		name:'hhyang',
		// 		ages:21
		// 	}
		// })
		
		//console.log(this.$Route)
		

		
		setTimeout(() => {
			uni.setTabBarBadge({
				index: 1,
				text: '31'
			});
			uni.showTabBarRedDot({
				index: 3
			});
		}, 1000);
	},
	onShow: function() {
		
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */ 
</style>
