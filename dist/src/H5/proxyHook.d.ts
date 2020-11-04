import { Router } from '../options/base';
export declare class MyArray extends Array {
    private router;
    private vueEachArray;
    private myEachHook;
    private hookName;
    constructor(router: Router, vueEachArray: Array<Function>, myEachHook: Function, hookName: 'beforeHooks' | 'afterHooks');
    push(v: any): any;
}
export declare function proxyEachHook(router: Router, vueRouter: any): void;
export declare function proxyH5Mount(Vim: any, router: Router): void;
