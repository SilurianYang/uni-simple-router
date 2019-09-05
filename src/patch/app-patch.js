export const completeVim=function(Vim,BUILTIN){
	// #ifdef APP-PLUS
		if(Vim.constructor.name=='Vue'&&Reflect.get(Vim.$mp, 'app')&&Reflect.get(Vim.$mp.app, 'onUniNViewMessage')){
			return false;
		}
	// #endif
	
	BUILTIN.currentVim=Vim;
}