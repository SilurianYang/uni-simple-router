
import {methods,baseConfig} from '../helpers/config'
import {noop,formatURLQuery} from '../helpers/util'
import {transitionTo} from './hooks'
import {APPGetPageRoute} from './util'
import {err} from '../helpers/warn'

let stop=null;

/**
 * @param {Object} finalRoute 格式化后的路由跳转规则
 * @param {Object} NAVTYPE 需要调用的跳转方法
 */
export const uniPushTo = function(finalRoute,NAVTYPE) {
	return new Promise(resolve=>{
		const query=formatURLQuery(`?${finalRoute.uniRoute.query}`);
		const APP=baseConfig.APP;
		stop=setTimeout(()=> {
			resolve();
			resolve=noop;	//执行完了就没了 确保不会被下一次执行
		}, APP.switchPageOutTime);
		const url=finalRoute.uniRoute.url;
		uni[methods[NAVTYPE]]({
			url:url+query,
			...finalRoute.route.animation,
			complete:()=>{
				clearTimeout(stop);
				resolve();
				resolve=noop;	//执行完了就没了 确保不会被下一次执行
			}
		});
	})
}

/**
 * 重写掉uni-app的某些方法
 */
export const rewriteUniFun = function(page,Router) {
	const webview=page.$getAppWebview();
	const oldClose=webview.close;
	webview.canBack((e)=>{
		console.log(e.canBack)
	})
	webview.back=function(){
		console.log(11111)
	}
	webview.close=function(...args){
		console.log(548484)
		const route=APPGetPageRoute([page]);	//获取下当前页面的route信息
		transitionTo.call(Router,{path:route.path,query:route.query},'back',()=>{
			//oldClose.call(webview);
		});
	}
}
