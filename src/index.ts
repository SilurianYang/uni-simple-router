import {Router} from './options/base';
import {InstantiateConfig, LifeCycleConfig} from './options/config';
import {lifeCycle} from './helpers/config';
import {assertNewOptions} from './helpers/utils';
import {registerRouterHooks, registerEachHooks} from './helpers/lifeCycle';
import {initMixins} from './helpers/mixins'

function createRouter(params: InstantiateConfig):Router {
    const options = assertNewOptions<InstantiateConfig>(params);
    const router:Router = {
        options,
        mount: [],
        $route: null,
        routesMap: {},
        lifeCycle: registerRouterHooks<LifeCycleConfig>(lifeCycle, options),
        push() {
            return new Promise(resolve => resolve())
        },
        replace() {
            return new Promise(resolve => resolve())
        },
        replaceAll() {
            return new Promise(resolve => resolve())
        },
        pushTab() {
            return new Promise(resolve => resolve())
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
                    return 11;
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
    if (router.mount instanceof Array) {
        router.mount.push({
            app: Vim,
            el
        })
    } else {
        throw new Error(`挂载路由失败，router.app 应该为数组类型。当前类型：${typeof router.mount}`);
    }
    console.log(1111)
    Vim.$mount();
}

export {
    RouterMount,
    createRouter
}
