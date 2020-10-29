import { appProxyNameRule, hookObjectRule, Router } from '../options/base';
import { AppConfig, appVueHookConfig } from '../options/config';
import {getDataType} from '../helpers/utils'

export function registerLoddingPage(
    router:Router,
    next:()=>void
):void{
    const { loddingPageHook, loddingPageStyle } = router.options.APP as AppConfig;	// 获取app所有配置
    const view = new plus.nativeObj.View('router-loadding', {
        top: '0px',
        left: '0px',
        height: '100%',
        width: '100%',
        ...(loddingPageStyle as Function)()
    });
    (loddingPageHook as Function)(view, next);	// 触发等待页面生命周期
}

export function proxyLaunchHook(
    appVue:appVueHookConfig,
    router:Router
):void {
    const proxyHook = Object.keys(router.appProxyHook) as Array<appProxyNameRule>;
    for (let i = 0; i < proxyHook.length; i++) {
        const name = proxyHook[i];
        const hooList = appVue[name] as Array<Function>|undefined;
        if (getDataType<Array<Function>|undefined>(hooList) === '[object Array]') {
            const proxyInfo:hookObjectRule = {
                options: [],
                hook: Function
            };
            proxyInfo.hook = (hooList as Array<Function>).splice((hooList as Array<Function>).length - 1, 1, (...options:Array<any>) => (proxyInfo.options = options))[0]
            router.appProxyHook[name] = [proxyInfo];
        }
    }
}

export function proxyAppMount(Vim:any, router:Router) {
    Vim.$mount()
}
