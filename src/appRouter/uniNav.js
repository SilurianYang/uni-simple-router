
import {methods} from '../helpers/config'
import {err} from '../helpers/warn'

/**
 * @param {Object} finalRoute 格式化后的路由跳转规则
 * @param {Object} NAVTYPE 需要调用的跳转方法
 */
export const uniPushTo = function(finalRoute,NAVTYPE) {
	return new Promise(resolve=>{
		const url=finalRoute.uniRoute.url;
		uni[methods[NAVTYPE]]({
			url,
			complete:()=>{
				resolve();
			}
		});
	})
}
