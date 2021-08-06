<template>
	<view>
		<h2>beforeRouteLeave</h2>
		<button type="default" @click="$Router.push({name:'dynamicPage'})">
			随意进入一个页面
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isBackCount:0
			}
		},
		beforeRouteLeave(to,from,next){
			if(to.name==='tabother'){
				if(this.isBackCount>5){
					next()
				}else{
					this.isBackCount++;
					uni.showToast({
							title: '点5次即可返回'
						});
						next(false);
				}
			}else{
				next();
			}
		},
		onLoad(){
			console.log(this.$Route)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
