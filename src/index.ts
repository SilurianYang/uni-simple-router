import {RouterDescribe, navtoRule} from './declare/base';
import {InstantiateConfig} from './declare/config';
import {appPlatform} from './helpers/utils'

class Router extends RouterDescribe {
	constructor(options: InstantiateConfig) {
		super();
		console.log(options);
	}
	push(rule: navtoRule | string): void {
		console.log('这是push函数');
	}
	replace(rule: navtoRule | string): void {}
	replaceAll(rule: navtoRule | string): void {}
	pushTab(rule: navtoRule | string): void {}
	beforeEach(guard: Function): void {}
	afterEach(guard: Function): void {}
}

// const router = new Router({
// 	routes: [
// 		{
// 			aliasPath: '/',
//             path: '/pages/index/index',
//             name:'index',
//             style: {navigationBarTitleText: 'uni-app'},
//             children:[
//                 {
//                     aliasPath: '/',
//                     path: '/pages/index/index',
//                     name:'index',
//                     style: {navigationBarTitleText: 'uni-app'},
//                 }
//             ]
// 		},
// 		{
// 			path: '/pages/tab1/tab1',
// 			style: {navigationBarTitleText: '', enablePullDownRefresh: false},
// 		},
// 		{
// 			path: '/pages/tab2/tab2',
// 			style: {navigationBarTitleText: '', enablePullDownRefresh: false},
// 		},
// 	],
// });

 function RouterMount(Vim:any, el:string) :void {
     console.log(appPlatform())
};

export {
    RouterMount,
    Router
}