<script>
	export default {
		beforeCreate(){
			console.log('appvue--beforeCreate----onload')
		},
		created(){
			console.log('appvue--created----onload')
		},
		mounted(){
			console.log('appvue--mounted----onload')
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
