import { Router, routesMapRule, RoutesRule, pageTypeRule} from '../options/base';
import {createRouteMap} from '../helpers/createRouteMap'
import {buildVueRoutes, buildVueRouter} from '../H5/buildRouter'
import {proxyEachHook} from '../H5/proxyHook'
import {mpPlatformReg} from './config'
import {registerLoddingPage} from '../app/appPatch';
import { proxyPageHook } from '../public/page';
import { forceGuardEach } from '../public/methods';
import { assertParentChild } from './utils';
import { getEnterPath } from '../applets/appletPatch';

let registerRouter:boolean = false;
let onloadProxyOk:boolean = false;
const appletProxy:{
    app:boolean;
    page:string;
} = {
    app: false,
    page: ''
}

export function getMixins(Vue:any, router: Router):{
    beforeCreate(this: any): void;
} | {
    beforeCreate(): void;
} | {
    onLaunch(): void;
} {
    let platform = router.options.platform;
    if (mpPlatformReg.test(platform)) {
        platform = 'app-lets';
    }
    const toggleHooks = {
        h5: {
            beforeCreate(this: any): void {
                if (this.$options.router) {
                    router.$route = this.$options.router; // 挂载vue-router到路由对象下
                    let vueRouteMap:RoutesRule[]|RoutesRule = [];
                    if (router.options.h5?.vueRouterDev) {
                        vueRouteMap = router.options.routes;
                    } else {
                        vueRouteMap = createRouteMap(router, this.$options.router.options.routes).finallyPathMap;
                        (router.routesMap as routesMapRule).vueRouteMap = vueRouteMap;
                        buildVueRoutes(router, vueRouteMap);
                    }
                    buildVueRouter(router, this.$options.router, vueRouteMap);
                    proxyEachHook(router, this.$options.router);
                }
            }
        },
        'app-plus': {
            beforeCreate(this: any): void {
                if (!registerRouter) {
                    registerRouter = true;
                    proxyPageHook(this, router, 'appProxyHook', 'app');
                    registerLoddingPage(router);
                }
            }
        },
        'app-lets': {
            beforeCreate(this: any): void {
                const pageType:pageTypeRule = this.$options.mpType;
                if (pageType === 'component' && !onloadProxyOk) {
                    const isProxy = assertParentChild(appletProxy['page'], this);
                    if (isProxy) {
                        proxyPageHook(this, router, 'appletsProxyHook', pageType)
                    }
                } else if (pageType !== 'component') {
                    if (!appletProxy[pageType]) { // 没有处理
                        if (pageType === 'page') {
                            appletProxy[pageType] = getEnterPath(this, router);
                            router.enterPath = appletProxy[pageType]; // 我不确定在不同端是否都是同样的变现？可能有的为非绝对路径？
                        } else {
                            appletProxy[pageType] = true;
                        }
                        proxyPageHook(this, router, 'appletsProxyHook', pageType)
                    }
                }
            },
            onLoad(this: any):void{
                if (!onloadProxyOk && assertParentChild(appletProxy['page'], this)) {
                    onloadProxyOk = true;
                    forceGuardEach(router);
                }
            }
        }
    };
    return toggleHooks[(platform as 'h5'|'app-plus'|'app-lets')];
}
export function initMixins(Vue: any, router: Router) {
    const routesMap = createRouteMap(router, router.options.routes);
    router.routesMap = routesMap; // 挂载自身路由表到路由对象下
    // Vue.util.defineReactive(router, '_Route', createRoute(router, 19970806))
    Vue.mixin({
        ...getMixins(Vue, router)
    });
}
