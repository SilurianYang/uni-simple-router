// #ifdef H5
import {
	html
} from '../component/h5-dom.js';
// #endif
class Patch {
	constructor(h5) {
		this.H5 = h5;
		this.isLoading = true;
		this.loadingCount = 0; //在APP.vue中进行跳转时，DOMContentLoaded过慢。使用索引来判断
		this.vueLifeHooks = { //vueRouter的原始生命周期
			beforeHooks: [],
			afterHooks: [],
			loadded: false
		};
		this.VueRouterBuiltIn=['/preview-image','/choose-location','/open-location'];	//uni-app内置路由
		this.appended = new Promise(resolve => {
			this.appendHTML(resolve);
		})
	}
	on(fun, args, callback) {
		if (this.H5) {
			return this[fun](args);
		}
		callback && callback();
	}
	/**
	 * H5 专属 history.back API
	 * @param {Object} num	需要返回的层级必须是正整数
	 */
	historyBack(num) {
		history.go(num);
	}
	/**
	 * H5端调用uni.previewImage 出现的 'url' of undefined 
	 */
	previewImagePatch(Vim) {
		try {
			if (Vim.route == '/preview-image') {
				return true
			}
		} catch (e) {}
		return false;
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
			this.toogle('startLodding', true);
			resolve();
		})
		// #endif
	}
	/**
	 * 页面是否加载完毕触发对应事件
	 */
	async toogle(toogle, DOMContentLoaded = false) {
		if (DOMContentLoaded && this.loadingCount !== 0) {
			this.loadingCount++;
			return false;
		}
		this.loadingCount++;
		if (this.isLoading) {
			await this.appended;
			window[toogle]();
		}
	}
	async setLoadingStatus(show = true) {
		this.isLoading = show;
		if (!show) {
			await this.appended;
			this.toogle('stopLodding');
			document.querySelector('#HHYANG_style').remove();
			document.querySelector('#router-loadding').remove();
			document.querySelector('#HHYANG_script').remove();
		}
	}
	defineProperty(vueRouter, key) {
		const that=this;
		const vueOldHooks = this.vueLifeHooks[key];
		const hookFun = this[key];
		return new Proxy([], {
			get: (target, prop) => {
				return prop in target ? target[prop] : undefined
			},
			set: (target, prop, value) => {
				if (typeof value == 'function') {
					vueOldHooks.splice(0,1,value);
					target[prop] = hookFun.bind(that);
				} else {
					target[prop] = value;
				}
				return true
			}
		})
	}
	afterHooks(to, from) {
		// if(this.vueLifeHooks.loadded){
		// 	console.log('afterHooks')
		// }
		// this.vueLifeHooks.loadded=false;
	}
	beforeHooks(to, from, next) {
		console.log(to)
		console.log(from)
		this.vueLifeHooks.beforeHooks[0](to,from,(res)=>{
			next();
		})
		// if(!this.vueLifeHooks.loadded){
		// 	console.log('beforeHooks')
		// }
		// this.vueLifeHooks.loadded=true
	}
	registerHook(Router, vueRouter) {
		
		const constantRouterMap=[];
		vueRouter.options.routes.forEach(((item,index)=>{
			if(item.meta&&item.meta.isTabBar){
				constantRouterMap.push(item)
			}
		}))
		
		const createRouter = () => new vueRouter.constructor({
		    mode: vueRouter.mode,
		    base: './',
		    routes: [...constantRouterMap,
				{
					path:'/404',
					name:'404',
					component: {
						                    render: (createElement)=> {
						                        return createElement('Page', {
						                            props: (0,
						                            Object.assign)({},
						                            __uniConfig.globalStyle, {})
						                        },
						                        [createElement('pages-test-404', {
						                            slot: 'page'
						                        })]);
						
						                    }
						// render:(fun)=>{
						// 	console.log(fun)
						// 	console.log(84848)
						// 	return import('@/pages/test/404.vue')
						// }
					},
					// beforeEnter:function(to,from,next){
					// 	setTimeout(function() {
					// 		next();
					// 	}, 2000);
					// }
				},
				{
					path:'*',
					redirect: {name:'404'}
				}
			]
		});
		const router = createRouter();
		vueRouter.matcher = router.matcher;
		// console.log(router)
		
		
		
		vueRouter.beforeHooks = this.defineProperty(vueRouter, 'beforeHooks');
		vueRouter.afterHooks = this.defineProperty(vueRouter, 'afterHooks');
		

		
		
		vueRouter.addRoutes([
			{
				path:'/router1',
				component:()=>import('@/pages/router/router1/router1.vue')
			}
			
		])
		//console.log(Router)
		console.log(vueRouter)
	}

}
export default Patch;
