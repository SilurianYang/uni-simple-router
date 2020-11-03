<script>
	export default {
		beforeCreate:function(){
			console.log('App beforeCreate')
		},
		created:function(){
			console.log('App created')
		},
		beforeMount:function(){
			console.log('App beforeMount')
		},
		mounted:function(){
			console.log('App mounted')
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
		methods:{
			aaaa(){}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
