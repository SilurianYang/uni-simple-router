import {warn} from './warn.js' 
export const baseConfig={
	h5:{
		loading:true,		//是否显示加载动画
		hinderTab:true, 	//是否拦截uni-app 底部tabbar点击事件
		vueRouter:false,	//使用采用vue-router的开发模式
		useUniConfig:true,	//是否才用在pages.json下的所有页面配置信息
		mode:'hash',
		base:'/',
		linkActiveClass:'router-link-active',
		linkExactActiveClass:'router-link-exact-active',
		scrollBehavior:(to, from, savedPostion)=>savedPostion,
		fallback:true
	},
	routes:[]
}
export const methods = {
  push: "navigateTo",
  replace: "redirectTo",
  replaceAll: "reLaunch",
  pushTab: "switchTab",
  back: "navigateBack"
};
export const lifeCycle = {
  beforeHooks: [],
  afterHooks: [],
  routerHooks: [],
  routerbeforeHooks:[],		//内部跳转前生命周期
  routerAfterHooks:[],	//内部跳转后生命周期
};

export const route = function(object = {}) {
  return {
    ...object,
    params: {},
    query: {}
  };
};