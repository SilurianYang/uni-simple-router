import { getDataType, getUniCachePage, routesForMapRoute } from '../helpers/utils';
import { objectAny, Router, totalNextRoute } from '../options/base';
import {createRoute} from './methods'
const {cloneDeep} = require('lodash')

export function createToFrom(
    to:totalNextRoute,
    router:Router,
):totalNextRoute {
    const page = getUniCachePage<Array<any>|objectAny>(0);
    if (getDataType<Array<any>|objectAny>(page) === '[object Array]') {
        const from = cloneDeep(to)
        return from;
    } else {
        // const fromRoute =createRoute(router);
        // return fromRoute;
    }
}
