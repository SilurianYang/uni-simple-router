import {Router} from '../options/base';
import {transitionTo} from '../public/hooks'
import {createRouteMap} from '../helpers/createRouteMap'

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
                    console.log(this.$options.router)
                    const {currentRoute} = this.$options.router;
                    const navRule = {
                        path: currentRoute.path,
                        query: currentRoute.query
                    }
                    transitionTo(router, navRule);
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
    const = createRouteMap(router.options.routes);
    Vue.mixin({
        ...getMixins(router)
    });
}
