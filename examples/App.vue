<script>
	export default {
		onLaunch: function() {
			return new Promise(resolve => {
				setTimeout(() => {
					console.log("onLaunch");
					resolve();
				}, 1000)
			})
		},
		onShow: function() {
			console.log("onShow");
		},
	};
</script>

<style>
	/*每个页面公共css */
</style>
