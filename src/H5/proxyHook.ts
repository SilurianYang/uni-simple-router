import {Router, proxyHookName, totalNextRoute, navtoRule} from '../options/base';

export class MyArray extends Array {
    constructor(private router:Router, private vueEachArray:Array<Function>, private myEachHook:Function) {
        super();
        Object.setPrototypeOf(this, MyArray.prototype)
    }
    push(v:any):any {
        this.vueEachArray.splice(0, 1, v);
        this[this.length] = (to: totalNextRoute, from: totalNextRoute, next:(rule?: navtoRule|false)=>void) => {
            this.myEachHook(to, from, (nextTo?:navtoRule|false) => {
                this.vueEachArray[0](to, from, (uniNextTo?:navtoRule|false) => {
                    next(nextTo);
                })
            }, this.router, true);
        };
    }
}

export function proxyEachHook(router:Router, vueRouter:any):void {
    const hookList:Array<string> = ['beforeHooks', 'afterHooks'];
    for (let i = 0; i < hookList.length; i++) {
        const hookName = hookList[i];
        const myEachHook = router.lifeCycle[(hookName as proxyHookName)][0];
        if (myEachHook) {
            const vueEachArray:Array<Function> = vueRouter[hookName];
            vueRouter[hookName] = new MyArray(router, vueEachArray, myEachHook);
        }
    }
}
export function proxyH5Mount(Vim:any, router:Router) {
    const vueRouter = (router.$route as any);
    vueRouter.replace({
        path: vueRouter.currentRoute.fullPath
    }, function(to:totalNextRoute):void {
        Vim.$mount();
    }, function(abort:any):void {
        console.log(abort)
    });
}
