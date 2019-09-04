export const queryInfo=function(Vim){
		let query={};
		
		if(Vim.ONLAUNCH==null){
			try{
				query=JSON.parse(decodeURIComponent(Vim.query.query|| encodeURIComponent('{}')))
			}catch(e){
				query=JSON.parse(Vim.query.query)
			}
		}
		
		// #ifndef MP-BAIDU
		return {
			route:{
				path: "/" + Vim.page.route || '',
			},
			query
		}
		// #endif
		
		// #ifdef MP-BAIDU
			return {
				route:{
					path: "/" + Vim.page.pageinstance.route || '',
				},
				query
			}
		// #endif
		
	}
