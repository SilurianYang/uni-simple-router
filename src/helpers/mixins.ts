import {Router, routesMapRule} from '../options/base';
import {transitionTo} from '../public/hooks'
import {createRouteMap} from '../helpers/createRouteMap'
import {buildVueRoutes, buildVueRouter} from '../H5/buildRouter'
import {proxyEachHook} from '../H5/proxyHook'

const mpPlatform = /(^mp-weixin$)|(^mp-baidu$)|(^mp-alipay$)|(^mp-toutiao$)|(^mp-qq$)|(^mp-360$)/gi;

export function getMixins(router: Router):{
    beforeCreate(this: any): void;
} | {
    beforeCreate(): void;
} | {
    onLaunch(): void;
} {
    let platform = router.options.platform;
    if (mpPlatform.test(platform)) {
        platform = 'app-lets';
    }
    const toggleHooks = {
        h5: {
            beforeCreate(this: any): void {
                if (this.$options.router) {
                    router.$route = this.$options.router; // 挂载vue-router到路由对象下
                    const {finallyPathMap: vueRouteMap} = createRouteMap(router, this.$options.router.options.routes);
                    (router.routesMap as routesMapRule).vueRouteMap = vueRouteMap;
                    buildVueRoutes(router, vueRouteMap);
                    buildVueRouter(router, this.$options.router, vueRouteMap);
                    proxyEachHook(router, this.$options.router);
                    console.log(this.$options.router)
                    // const {currentRoute} = this.$options.router;
                    // const navRule = {
                    //     path: currentRoute.path,
                    //     query: currentRoute.query
                    // }
                    // transitionTo(router, navRule);
                }
            }
        },
        'app-plus': {
            beforeCreate(): void {
                console.log('beforeCreate---app');
                // transitionTo(router);
            },
            onLoad():void{
                console.log('onLoad---app');
            }
        },
        'app-lets': {
            onLaunch(): void {
                console.log('beforeCreate----app-lets');
            }
        }
    };
    return toggleHooks[(platform as 'h5'|'app-plus'|'app-lets')];
}
export function initMixins(Vue: any, router: Router) {
    const routesMap = createRouteMap(router, router.options.routes);
    router.routesMap = routesMap; // 挂载自身路由表到路由对象下
    Vue.mixin({
        ...getMixins(router)
    });
}
