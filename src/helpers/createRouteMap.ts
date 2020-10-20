import {RoutesRule, Router} from '../options/base';
import {H5Config} from '../options/config';

const Regexp = require('path-to-regexp');

export function createRouteMap(
    router: Router,
    routes: RoutesRule[],
    oldPathList?: Array<string>,
    oldpathMap?: {[propName: string]: any}
): {
	pathList: string[];
	pathMap: {[propName: string]: any};
}|never {
    const pathList = oldPathList || [];
    const pathMap = oldpathMap || Object.create(null);
    routes.forEach(route => {
        let path = route.aliasPath || route.alias || route.path;
        if (path instanceof Array) {
            if (!(router.options.h5 as H5Config).vueRouterDev && router.options.platform === 'h5') {
                throw new Error(`非 vueRouterDev 模式下，route.alias 目前无法提供数组类型！ ${JSON.stringify(route)}`);
            }
        }
        path = (path as string);
        if (!pathMap[path]) {
            pathList.push(path);
            pathMap[path] = route;
        }
    })

    return {
        pathList,
        pathMap
    };
}
