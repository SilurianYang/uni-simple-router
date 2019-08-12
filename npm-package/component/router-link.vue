<template>
	<view @click="gotoPage()">
		<slot>
			<button type="primary">{{btnText}}</button>
		</slot>
	</view>
</template>

<script>
	const navType={
		push:'push',
		replace:'replace',
		replaceAll:'replaceAll',
		pushTab:'pushTab'
	}
	export default {
		props: {
			to: {
				type: String,
				default: '',
			},
			navType: {
				type: String,
				default: 'push',
			},
			append: {
				type: Boolean,
				default: false,
			},
			btnText:{
				type: String,
				default: '去其他页面啦',
			}
		},
		methods: {
			gotoPage() {
				const type=navType[this.navType];
				if(type==null){
					return console.error(` "navType" unknown type \n\n value：${Object.values(navType).join('、')}`)
				}
				let navInfo='';
				let path=this.$Route.path;
				console.log(path)
				console.log(this.append)
				try{
					navInfo=new Function(`return ${this.to}`)();
				}catch(e){
					navInfo=this.to;
				}
				this.$Router[type](navInfo);
			}
		}
	}
</script>

<style>
</style>
