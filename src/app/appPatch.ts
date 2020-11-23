import { Router } from '../options/base';
import { AppConfig } from '../options/config';

let quitBefore:number|null = null;

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

export function runtimeQuit(
    title:string|undefined = '再按一次退出应用'
):void{
    const nowTime = +new Date();
    if (!quitBefore) {
        quitBefore = nowTime;
        uni.showToast({
            title,
            icon: 'none',
            position: 'bottom',
            duration: 1000
        });
        setTimeout(() => { quitBefore = null }, 1000);
    } else {
        if (nowTime - quitBefore < 1000) {
            plus.runtime.quit();
        }
    }
}
