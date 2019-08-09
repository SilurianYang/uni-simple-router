export const queryInfo=function(Vim){
		// #ifndef MP-BAIDU
		return {
			route:{
				path: "/" + Vim.page.route || '',
				ONLAUNCH: Vim.ONLAUNCH || false,
			},
			query:Vim.query || {}
		}
		// #endif
		
		// #ifdef MP-BAIDU
			return {
				route:{
					path: "/" + Vim.page.pageinstance.route || '',
					ONLAUNCH: Vim.ONLAUNCH || false,
				},
				query:Vim.query || {}
			}
		// #endif
		
	}
