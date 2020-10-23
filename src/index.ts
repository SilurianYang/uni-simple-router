import {Router} from './options/base';
import {InstantiateConfig, LifeCycleConfig} from './options/config';
import {lifeCycle} from './helpers/config';
import {assertNewOptions, getDataType} from './helpers/utils';
import {registerRouterHooks, registerEachHooks} from './helpers/lifeCycle';
import {initMixins} from './helpers/mixins'
import {navjump} from './public/methods'
import {proxyH5Mount} from './H5/proxyHook'

function createRouter(params: InstantiateConfig):Router {
    const options = assertNewOptions<InstantiateConfig>(params);
    const router:Router = {
        options,
        mount: [],
        $route: null,
        routesMap: {},
        lifeCycle: registerRouterHooks<LifeCycleConfig>(lifeCycle, options),
        push(to, from) {
            navjump(to, router, 'push', from);
        },
        replace(to, from) {
            navjump(to, router, 'replace', from);
        },
        replaceAll(to, from) {
            navjump(to, router, 'replaceAll', from);
        },
        pushTab(to, from) {
            navjump(to, router, 'pushTab', from);
        },
        beforeEach(userGuard):void {
            registerEachHooks(router, 'beforeHooks', userGuard);
        },
        afterEach(userGuard):void {
            registerEachHooks(router, 'afterHooks', userGuard);
        },
        install(Vue:any):void{
            initMixins(Vue, this);
            Object.defineProperty(Vue.prototype, '$Router', {
                get() {
                    return router;
                }
            });
            Object.defineProperty(Vue.prototype, '$Route', {
                get() {
                    return 22;
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

    default:
        console.warn('其他端还没实现')
        break;
    }
}

export {
    RouterMount,
    createRouter
}
