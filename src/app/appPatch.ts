import { Router } from '../options/base';
import { AppConfig } from '../options/config';

export function registerLoddingPage(
    router:Router,
):void{
    const { loddingPageHook, loddingPageStyle } = router.options.APP as AppConfig;	// 获取app所有配置
    const view = new plus.nativeObj.View('router-loadding', {
        top: '0px',
        left: '0px',
        height: '100%',
        width: '100%',
        ...(loddingPageStyle as Function)()
    });
    (loddingPageHook as Function)(view);	// 触发等待页面生命周期
}
