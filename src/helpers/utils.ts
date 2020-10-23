import {InstantiateConfig} from '../options/config';
import {RoutesRule, routesMapRule} from '../options/base';
import {baseConfig} from '../helpers/config';
import { getCurrentPages } from '../types';
const Regexp = require('path-to-regexp');

export function mergeConfig<T extends InstantiateConfig>(baseConfig: T, userConfig: T): T {
    const config: {[key: string]: any} = Object.create(null);
    const baseConfigKeys: Array<string> = Object.keys(baseConfig);
    for (let i = 0; i < baseConfigKeys.length; i += 1) {
        const key = baseConfigKeys[i];
        if (userConfig[key] != null) {
            if (userConfig[key].constructor === Object) {
                config[key] = {
                    ...baseConfig[key],
                    ...userConfig[key]
                };
            } else if (key === 'routes') {
                config[key] = [
                    ...baseConfig[key],
                    ...userConfig[key]
                ];
            } else {
                config[key] = userConfig[key];
            }
        } else {
            config[key] = baseConfig[key];
        }
    }
    return config as T;
}

export function getRoutePath(route: RoutesRule): {
    finallyPath: string | string[];
    aliasPath: string;
    path: string;
    alias: string | string[] | undefined;
} {
    const finallyPath = route.aliasPath || route.alias || route.path;
    return {
        finallyPath,
        aliasPath: route.aliasPath || route.path,
        path: route.path,
        alias: route.alias
    }
}

export function assertNewOptions<T extends InstantiateConfig>(
    options: T
): T | never {
    const {platform, routes} = options;
    if (platform == null) {
        throw new Error(`你在实例化路由时必须传递 'platform'`);
    }
    if (routes == null || routes.length === 0) {
        throw new Error(`你在实例化路由时必须传递 routes 为空，这是无意义的。`);
    }
    const mergeOptions = mergeConfig<T>(baseConfig as T, options);
    return mergeOptions;
}

export function routesForMapRoute(routesMap: routesMapRule, path: string):RoutesRule|never {
    const {finallyPathMap} = routesMap;
    for (const [key, value] of Object.entries(finallyPathMap)) {
        const pathRule:RegExp = Regexp(key);
        const result = pathRule.exec(path);
        if (result != null) {
            return (value as RoutesRule)
        }
    }
    throw new Error(`${path} 路径无法在路由表中找到！检查跳转路径及路由表`);
}

export function getDataType<T>(data:T):string {
    return Object.prototype.toString.call(data)
}

export function getUniCachePage<T extends Array<{[propName:string]:any}>>(pageIndex?:number):T|{[propName:string]:any} {
    const pages:T = getCurrentPages();
    if (pageIndex == null) {
        return pages
    }
    return pages.reverse()[pageIndex];
}
