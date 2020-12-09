import {Router, proxyHookName, totalNextRoute, navtoRule} from '../options/base';

export class MyArray extends Array {
    constructor(
        private router:Router,
        private vueEachArray:Array<Function>,
        private myEachHook:Function,
        private hookName:'beforeHooks'| 'afterHooks',
    ) {
        super();
        Object.setPrototypeOf(this, MyArray.prototype)
    }
    push(v:any):any {
        this.vueEachArray.push(v);
        const index = this.length;
        this[this.length] = (to: totalNextRoute, from: totalNextRoute, next:(rule?: navtoRule|false)=>void) => {
            if (index > 0) {
                this.vueEachArray[index](to, from, () => {
                    next && next()
                });
            } else {
                this.myEachHook(to, from, (nextTo?:navtoRule|false) => {
                    this.vueEachArray[index](to, from, (uniNextTo?:navtoRule|false) => {
                        next(nextTo);
                    })
                }, this.router, true);
            }
        };
    }
}

export function proxyEachHook(router:Router, vueRouter:any):void {
    const hookList:Array<'beforeHooks'| 'afterHooks'> = ['beforeHooks', 'afterHooks'];
    for (let i = 0; i < hookList.length; i++) {
        const hookName = hookList[i];
        const myEachHook = router.lifeCycle[(hookName as proxyHookName)][0];
        if (myEachHook) {
            const vueEachArray:Array<Function> = vueRouter[hookName];
            vueRouter[hookName] = new MyArray(router, vueEachArray, myEachHook, hookName);
        }
    }
}
export function proxyH5Mount(router:Router):boolean {
    if (router.mount.length === 0) {
        const uAgent = navigator.userAgent;
        const isIos = !!uAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        if (!isIos) {
            return false;
        }
        const element = document.getElementsByTagName('uni-page');
        if (element.length > 0) {
            return false
        }
        window.location.reload();
        return true
    }
    const [{app}] = router.mount;
    app.$mount();
    router.mount = [];
    return true;
}
