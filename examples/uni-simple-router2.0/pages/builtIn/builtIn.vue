<template>
	<view>
		<button type="default" @click="chooseLocation">选择地理位置</button>
		<button type="primary" @click="getLocation">打开地图</button>
		<button type="warn" @click="previewImage">预览图片</button>
		<button type="default" @click="back">返回上两级路径</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			back(){
				this.$Router.back(2);
				
				//uni.navigateBack();
			},
			chooseLocation(){
				uni.chooseLocation({
				    success: function (res) {
				        console.log('位置名称：' + res.name);
				        console.log('详细地址：' + res.address);
				        console.log('纬度：' + res.latitude);
				        console.log('经度：' + res.longitude);
				    }
				});
			},
			getLocation(){
				uni.getLocation({
				    type: 'wgs84', //返回可以用于uni.openLocation的经纬度
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
			previewImage(){
				uni.chooseImage({
				    count: 6,
				    sizeType: ['original', 'compressed'],
				    sourceType: ['album'],
				    success: function(res) {
				        // 预览图片
				        uni.previewImage({
				            urls: res.tempFilePaths,
				            longPressActions: {
				                itemList: ['发送给朋友', '保存图片', '收藏'],
				                success: function(data) {
				                    console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
				                },
				                fail: function(err) {
				                    console.log(err.errMsg);
				                }
				            }
				        });
				    }
				    });
			}
		}
	}
</script>

<style>

</style>
