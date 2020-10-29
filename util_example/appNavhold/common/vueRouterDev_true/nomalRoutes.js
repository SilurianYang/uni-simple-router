export const namalRoutes=[{
			aliasPath:'/',
			path: '/pages/index/index',
			name: 'index',
			style: {
				navigationBarTitleText: 'uni-app'
			},
			  beforeEnter: (to, from, next) => {
				console.log('-------------------------beforeEnter-------------------------------------')
				console.log(to);
				console.log(from);
				console.log('-------------------------beforeEnter结束-------------------------------------')
				setTimeout(()=>{
					next();
				},1500)
			  },
		},
		{
			path: '/pages/tab1/tab1',
			// alias:'/tab1',
			name: 'tab1',
			style: {
				navigationBarTitleText: '',
				enablePullDownRefresh: false
			},
		},
		{
			path: '/pages/tab2/tab2',
			//alias:'/tab2',
			name:'tab2',
			style: {
				navigationBarTitleText: '',
				enablePullDownRefresh: false
			},
		},
		{
			path:'/pages/page2/page2',
			name:'page2',
			meta:{
				enablePullDownRefresh:true
			},
			style: {
				navigationBarTitleText: '',
				enablePullDownRefresh: false
			},
			//alias:'/pages/:name',
		},
		{
			path:'/pages/page3/page3',
			name:'page3',
			//alias:'/page3'
		},
		// {
		// 	path:'*',
		// 	redirect:to=>{
		// 		if(whitelist[to]){
		// 			return {
		// 				name:whitelist[to]
		// 			}
		// 		}
		// 	}
		// }
	]