import {InstantiateConfig} from '../options/config';
import {RoutesRule, routesMapRule, routesMapKeysRule} from '../options/base';
import {baseConfig} from '../helpers/config';
import { getCurrentPages } from '../types';
const Regexp = require('path-to-regexp');

export function voidFun():void{}

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

export function routesForMapRoute(
    routesMap: routesMapRule,
    path: string,
    mapKey:routesMapKeysRule
):RoutesRule|never {
    const mapList = routesMap[mapKey];
    for (const [key, value] of Object.entries(mapList)) {
        const route:string|RoutesRule = value;
        let rule:string = key;
        if (getDataType<Array<string>|{[propName: string]: any}>(mapList) === '[object Array]') {
            rule = (route as string);
        }
        const pathRule:RegExp = Regexp(rule);
        const result = pathRule.exec(path);
        if (result != null) {
            if (getDataType<string|RoutesRule>(route) === '[object String]') {
                return routesMap.finallyPathMap[(route as string)];
            }
            return (route as RoutesRule);
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

export function urlToJson(url :string):{
    path:string;
    query:{[propName: string]: any}
} {
    const query:{[propName: string]: any} = {};
    const [path, params] = url.split('?');
    if (params != null) {
        const parr = params.split('&');
        for (const i of parr) {
            const arr = i.split('=');
            query[arr[0]] = arr[1];
        }
    }
    return {
        path,
        query
    }
}
