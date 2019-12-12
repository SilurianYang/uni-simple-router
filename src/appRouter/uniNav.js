
import {methods,baseConfig} from '../helpers/config'
import {noop} from '../helpers/util'
import {err} from '../helpers/warn'

let stop=null;

/**
 * @param {Object} finalRoute 格式化后的路由跳转规则
 * @param {Object} NAVTYPE 需要调用的跳转方法
 */
export const uniPushTo = function(finalRoute,NAVTYPE) {
	return new Promise(resolve=>{
		const APP=baseConfig.APP;
		stop=setTimeout(()=> {
			resolve();
			resolve=noop;	//执行完了就没了 确保不会被下一次执行
		}, APP.switchPageOutTime);
		const url=finalRoute.uniRoute.url;
		uni[methods[NAVTYPE]]({
			url,
			...finalRoute.route.animation,
			complete:()=>{
				clearTimeout(stop);
				resolve();
				resolve=noop;	//执行完了就没了 确保不会被下一次执行
			}
		});
	})
}
