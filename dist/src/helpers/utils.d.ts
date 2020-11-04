import { InstantiateConfig } from '../options/config';
import { RoutesRule, routesMapKeysRule, Router, totalNextRoute, objectAny } from '../options/base';
export declare function voidFun(): void;
export declare function mergeConfig<T extends InstantiateConfig>(baseConfig: T, userConfig: T): T;
export declare function getRoutePath(route: RoutesRule, router: Router): {
    finallyPath: string | string[];
    aliasPath: string;
    path: string;
    alias: string | string[] | undefined;
};
export declare function assertNewOptions<T extends InstantiateConfig>(options: T): T | never;
export declare function routesForMapRoute(router: Router, path: string, mapArrayKey: Array<routesMapKeysRule>): RoutesRule | never;
export declare function getDataType<T>(data: T): string;
export declare function copyData<T>(object: T): T;
export declare function getUniCachePage<T extends objectAny>(pageIndex?: number): T | [];
export declare function urlToJson(url: string): {
    path: string;
    query: objectAny;
};
export declare function forMatNextToFrom<T extends totalNextRoute>(router: Router, to: T, from: T): {
    matTo: T;
    matFrom: T;
};
export declare function paramsToQuery(router: Router, toRule: totalNextRoute | string): totalNextRoute | string;
export declare function assertDeepObject(object: objectAny): boolean;
export declare function baseClone<T extends {
    [key: string]: any;
}, K extends keyof T>(source: T, target: Array<any> | objectAny): void;
export declare function deepClone<T>(source: T): T;
export declare function lockDetectWarn(router: Router, next: Function, passiveType?: 'beforeHooks' | 'afterHooks'): void;
export declare function replaceHook(router: Router, vueVim: any, proxyHookKey: 'appProxyHook' | 'appletsProxyHook', pageType: 'app' | 'index'): void;
//# sourceMappingURL=utils.d.ts.map