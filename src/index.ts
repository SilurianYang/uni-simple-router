import {Router} from './options/base';
import {InstantiateConfig, LifeCycleConfig} from './options/config';
import {appProxyHook, lifeCycle} from './helpers/config';
import {assertNewOptions, getDataType} from './helpers/utils';
import {registerRouterHooks, registerEachHooks} from './helpers/lifeCycle';
import {initMixins} from './helpers/mixins'
import {navBack, createRoute, lockNavjump} from './public/methods'
import {proxyH5Mount} from './H5/proxyHook'
import {rewriteMethod} from './public/rewrite'
import { proxyAppMount } from './app/proxyHook';

function createRouter(params: InstantiateConfig):Router {
    const options = assertNewOptions<InstantiateConfig>(params);
    const router:Router = {
        options,
        mount: [],
        appProxyHook: appProxyHook,
        $route: null,
        $lockStatus: false,
        routesMap: {},
        lifeCycle: registerRouterHooks<LifeCycleConfig>(lifeCycle, options),
        push(to) {
            lockNavjump(to, router, 'push');
        },
        replace(to) {
            lockNavjump(to, router, 'replace');
        },
        replaceAll(to) {
            lockNavjump(to, router, 'replaceAll');
        },
        pushTab(to) {
            lockNavjump(to, router, 'pushTab');
        },
        back(level = 1) {
            navBack(this, level, 'back')
        },
        beforeEach(userGuard):void {
            registerEachHooks(router, 'beforeHooks', userGuard);
        },
        afterEach(userGuard):void {
            registerEachHooks(router, 'afterHooks', userGuard);
        },
        install(Vue:any):void{
            rewriteMethod(this);
            initMixins(Vue, this);
            Object.defineProperty(Vue.prototype, '$Router', {
                get() {
                    return router;
                }
            });
            Object.defineProperty(Vue.prototype, '$Route', {
                get() {
                    return createRoute(router);
                }
            });
        }
    }
    return router;
}

function RouterMount(Vim:any, router:Router, el:string | undefined = '#app') :void|never {
    if (getDataType<Array<any>>(router.mount) === '[object Array]') {
        router.mount.push({
            app: Vim,
            el
        })
    } else {
        throw new Error(`挂载路由失败，router.app 应该为数组类型。当前类型：${typeof router.mount}`);
    }
    switch (router.options.platform) {
    case 'h5':
        proxyH5Mount(Vim, router);
        break;
    case 'app-plus':
        proxyAppMount(Vim, router);
        break
    }
}

export {
    RouterMount,
    createRouter
}
