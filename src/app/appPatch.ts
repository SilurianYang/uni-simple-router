import { navtoRule, objectAny, Router, totalNextRoute } from '../options/base';
import { AppConfig } from '../options/config';

let quitBefore:number|null = null;
let TABBAR:objectAny|null = null;

export function registerLoddingPage(
    router:Router,
):void{
    if (router.options.APP?.registerLoadingPage) {
        const { loadingPageHook, loadingPageStyle } = router.options.APP as AppConfig;	// 获取app所有配置
        const view = new plus.nativeObj.View('router-loadding', {
            top: '0px',
            left: '0px',
            height: '100%',
            width: '100%',
            ...(loadingPageStyle as Function)()
        });
        (loadingPageHook as Function)(view);	// 触发等待页面生命周期
    }
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

export function HomeNvueSwitchTab(
    router:Router,
    to:navtoRule,
    oldMethod:Function
):Promise<Boolean> {
    return new Promise((
        resolve:(value:boolean)=>void
    ) => {
        if (router.runId !== 0) {
            return resolve(false)
        }
        if (!(__uniConfig.tabBar && Array.isArray(__uniConfig.tabBar.list))) {
            return resolve(false)
        }
        // Fixe https://github.com/SilurianYang/uni-simple-router/issues/373 2022-4-3 19:40:59
        oldMethod({
            url: __uniConfig.entryPagePath,
            animationDuration:0,
            complete: () => resolve(true)
        });
    })
}

export function tabIndexSelect(
    to:totalNextRoute,
    from:totalNextRoute
):boolean {
    if (!(__uniConfig.tabBar && Array.isArray(__uniConfig.tabBar.list))) {
        return false
    }
    const tabBarList = __uniConfig.tabBar.list;
    const routes:Array<totalNextRoute> = [];
    let activeIndex:number = 0;
    for (let i = 0; i < tabBarList.length; i++) {
        const route:totalNextRoute = tabBarList[i];
        if ('/' + route.pagePath === to.path || '/' + route.pagePath === from.path) {
            if (route.pagePath === from.path) {
                activeIndex = i;
            }
            routes.push(route);
        }
        if (routes.length === 2) {
            break
        }
    }
    if (routes.length !== 2) {
        return false
    }
    if (TABBAR == null) {
        TABBAR = uni.requireNativePlugin('uni-tabview')
    }
    (TABBAR as objectAny).switchSelect({
        index: activeIndex
    })
    return true
}
