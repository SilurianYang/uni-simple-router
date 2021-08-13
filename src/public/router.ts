import {PromiseResolve, Router, uniBackApiRule, uniBackRule} from '../options/base';
import {InstantiateConfig, LifeCycleConfig} from '../options/config';
import { lifeCycle, proxyHookDeps} from '../helpers/config';
import {assertNewOptions, def, getDataType} from '../helpers/utils';
import {registerRouterHooks, registerEachHooks} from '../helpers/lifeCycle';
import {initMixins} from '../helpers/mixins'
import {lockNavjump, forceGuardEach, createRoute} from '../public/methods'
import {rewriteMethod} from '../public/rewrite'

let AppReadyResolve:PromiseResolve = () => {};
const AppReady:Promise<void> = new Promise(resolve => (AppReadyResolve = resolve));

function createRouter(params: InstantiateConfig):Router {
    const options = assertNewOptions<InstantiateConfig>(params);
    const router:Router = {
        options,
        mount: [],
        Vue: null,
        proxyHookDeps: proxyHookDeps,
        appMain: {},
        enterPath: '',
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
        back(level = 1, animation) {
            if (getDataType(animation) !== '[object Object]') {
                const backRule:uniBackRule = {
                    from: 'navigateBack'
                }
                animation = backRule;
            } else {
                if (!Reflect.has((animation as uniBackRule | uniBackApiRule), 'from')) {
                    animation = {
                        ...animation,
                        from: 'navigateBack'
                    };
                }
            }
            lockNavjump(level + '', router, 'back', undefined, animation)
        },
        forceGuardEach(navType, forceNav) {
            forceGuardEach(router, navType, forceNav)
        },
        beforeEach(userGuard):void {
            registerEachHooks(router, 'beforeHooks', userGuard);
        },
        afterEach(userGuard):void {
            registerEachHooks(router, 'afterHooks', userGuard);
        },
        install(Vue:any):void{
            router.Vue = Vue;
            rewriteMethod(this);
            initMixins(Vue, this);
            Object.defineProperty(Vue.prototype, '$Router', {
                get() {
                    const actualData = router;

                    Object.defineProperty(this, '$Router', {
                        value: actualData,
                        writable: false,
                        configurable: false,
                        enumerable: false
                    });

                    return Object.seal(actualData);
                }
            });
            Object.defineProperty(Vue.prototype, '$Route', {
                get() {
                    return createRoute(router);
                }
            });
            // 【Fixe】  https://github.com/SilurianYang/uni-simple-router/issues/254
            Object.defineProperty(Vue.prototype, '$AppReady', {
                get() {
                    if (router.options.platform === 'h5') {
                        return Promise.resolve();
                    }
                    return AppReady;
                },
                set(value:boolean) {
                    if (value === true) {
                        AppReadyResolve();
                    }
                }
            });
        }
    }
    def(router, 'currentRoute', () => createRoute(router));

    router.beforeEach((to, from, next) => next());
    router.afterEach(() => {});
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
    if (router.options.platform === 'h5') {
        const vueRouter = (router.$route as any);
        vueRouter.replace({
            path: vueRouter.currentRoute.fullPath
        });
    } // 其他端目前不需要做啥
}

export {
    RouterMount,
    createRouter
}
