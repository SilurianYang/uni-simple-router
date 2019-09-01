export const queryInfo=function(Vim){
		let query='{}';
		if(Vim.ONLAUNCH==null){		//非APP.vue 跳转
			query=JSON.parse(Vim.query.query|| '{}')
		}else{
			query={};
		}
		// #ifndef MP-BAIDU
		return {
			route:{
				path: "/" + Vim.page.route || '',
				ONLAUNCH: Vim.ONLAUNCH || false,
			},
			query
		}
		// #endif
		
		// #ifdef MP-BAIDU
			return {
				route:{
					path: "/" + Vim.page.pageinstance.route || '',
					ONLAUNCH: Vim.ONLAUNCH || false,
				},
				query
			}
		// #endif
		
	}
