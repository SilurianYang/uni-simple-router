import {Router} from './options/base';
import {InstantiateConfig, LifeCycleConfig} from './options/config';
import {lifeCycle} from './helpers/config';
import {assertNewOptions} from './helpers/utils';
import {registerRouterHooks} from './helpers/lifeCycle';
import {initMixins} from './helpers/mixins'

function createRouter(params: InstantiateConfig):Router {
    const options = assertNewOptions<InstantiateConfig>(params);
    const router:Router = {
        options,
        mount: [],
        lifeCycle: registerRouterHooks<LifeCycleConfig>(lifeCycle, options),
        push: () => {
            return new Promise(resolve => resolve())
        },
        replace: () => {
            return new Promise(resolve => resolve())
        },
        replaceAll: () => {
            return new Promise(resolve => resolve())
        },
        pushTab: () => {
            return new Promise(resolve => resolve())
        },
        beforeEach(guard: Function): void {},
        afterEach(guard: Function): void {},
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
        throw new Error(`挂载路由失败，router.app 应该为数组类型。目前是 ${typeof router.mount}`);
    }
    Vim.$mount();
}

export {
    RouterMount,
    createRouter
}
