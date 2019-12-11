
import {methods} from '../helpers/config'
import {err} from '../helpers/warn'

let stop=null;

/**
 * @param {Object} finalRoute 格式化后的路由跳转规则
 * @param {Object} NAVTYPE 需要调用的跳转方法
 */
export const uniPushTo = function(finalRoute,NAVTYPE) {
	return new Promise(resolve=>{
		stop=setTimeout(()=> {
			resolve();
		}, 1000);
		const url=finalRoute.uniRoute.url;
		uni[methods[NAVTYPE]]({
			url,
			animationType:'none',
			animationDuration:0,
			complete:()=>{
				clearTimeout(stop);
				resolve();
			}
		});
	})
}
