<script>
	export default {
		beforeMount(){
			console.log('appvue-----beforeMount')
		},
		created(){
			console.log('appvue----created')
		},
		mounted(){
			console.log('appvue----mounted')
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	/*每个页面公共css */
</style>
