import {RoutesRule} from '../options/base';

const Regexp = require('path-to-regexp');

export function createRouteMap(
    routes: RoutesRule[],
    oldPathList?: Array<string>,
    oldpathMap?: {[propName: string]: any}
): {
	pathList: string[];
	pathMap: {[propName: string]: any};
} {
    const pathList = oldPathList || [];
    const pathMap = oldpathMap || Object.create(null);
    routes.forEach(route => {
        const path = route.path;
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
