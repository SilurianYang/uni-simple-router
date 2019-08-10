export const queryInfo=function(Vim){
		// #ifndef MP-BAIDU
		return {
			route:{
				path: "/" + Vim.page.route || '',
				ONLAUNCH: Vim.ONLAUNCH || false,
			},
			query:JSON.parse(Vim.query.query|| '{}')
		}
		// #endif
		
		// #ifdef MP-BAIDU
			return {
				route:{
					path: "/" + Vim.page.pageinstance.route || '',
					ONLAUNCH: Vim.ONLAUNCH || false,
				},
				query:JSON.parse(Vim.query.query|| '{}') 
			}
		// #endif
		
	}
