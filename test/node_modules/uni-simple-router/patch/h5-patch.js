// #ifdef H5
import {html} from '../component/h5-dom.js';
// #endif
class Patch {
	constructor(h5) {
		this.H5 = h5;
		this.isLoading = true;
		this.appended=new Promise(resolve=>{
			this.appendHTML(resolve);
		})
	}
	on(fun, args, callback) {
		if (this.H5) {
			return this[fun](args);
		}
		callback&&callback();
	}
	/**
	 * H5 专属 history.back API
	 * @param {Object} num	需要返回的层级必须是正整数
	 */
	historyBack(num) {
		history.go(num);
	}
	/**
	 * 把加载动画添加到dom下面,为什么一定要先添加，后移除。保证动画的连续性
	 */
	appendHTML(resolve) {
		// #ifdef H5
		window.addEventListener('DOMContentLoaded', () => {
			const body = document.querySelector('body');
			body.appendChild(html.style);
			body.appendChild(html.DOM);
			body.appendChild(html.script);
			this.toogle();
			resolve();
		})
		// #endif
	}
	/**
	 * 页面是否加载完毕触发对应事件
	 */
	async toogle(toogle = 'startLodding') {
		if(this.isLoading){
			await this.appended;
			window[toogle]();
		}
	}
	async setLoadingStatus(show=true){
		this.isLoading=show;			
		if(!show){
			await this.appended;
			this.toogle('stopLodding');
			document.querySelector('#HHYANG_style').remove();
			document.querySelector('#router-loadding').remove();
			document.querySelector('#HHYANG_script').remove();
		}
	}

}
export default Patch;
