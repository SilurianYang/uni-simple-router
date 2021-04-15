<script>
	export default {
		created(){
			console.log('appvue--created----created')
		},
		mounted(){
			console.log('appvue--mounted----mounted')
		},
		onLaunch: function() {
			console.log('App Launch')
			this.$AppReady.then(()=>{
				console.log(this.$Route)	
			})
		},
		onShow: function() {
			this.$AppReady.then(()=>{
				console.log(this.$Route)	
			})
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
