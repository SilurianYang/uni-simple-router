<script>
	
	import {interVal} from '@/common/test.js'
	
export default {
	onLaunch: function() {
		// this.$Router.push({
		// 	name:'router4',
		// 	params:{
		// 		name:'hhyang ** % &&*7',
		// 		ages:21
		// 	}
		// })
		
		 console.log(this.$Route)
		
		
		// setTimeout(()=>{
		// 	interVal();
		// },5000)
		//console.log(this)
		
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
	}
};
</script>

<style>
/*每个页面公共css */ 
</style>
