<template>
	<view class="content" >
		<button type="primary">去路由页面3</button>
		<button type="primary" @click="chooseLocation()">获取坐标</button>
		<button type="primary" @click="getLocation()">查看位置</button>
	</view>
</template> 

<script>
export default {
	data() {
		return {
			active: false
		};
	},
	onLoad() {},
	onHide() {
		
	},
	methods: {
		chooseLocation(){
			uni.chooseLocation({
			    success:  (res) =>{
			        console.log('位置名称：' + res.name);
			        console.log('详细地址：' + res.address);
			        console.log('纬度：' + res.latitude);
			        console.log('经度：' + res.longitude);
			    }
			});
		},
		getLocation(){
			uni.getLocation({
			    type: 'gcj02', //返回可以用于uni.openLocation的经纬度
			    success: function (res) {
			        const latitude = res.latitude;
			        const longitude = res.longitude;
			        uni.openLocation({
			            latitude: latitude,
			            longitude: longitude,
			            success: function () {
			                console.log('success');
			            }
			        });
			    }
			});
		},
		goToPage(url) {
			if (!url) return;
			uni.navigateTo({
				url
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	text-align: center;
	height: 400upx;
	margin-top: 200upx;
}
</style>
