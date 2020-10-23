import { NAVTYPE, Router, totalNextRoute} from '../options/base'
import {queryPageToMap} from './page'

export function navjump(
    to:string|totalNextRoute,
    router:Router,
    navType:NAVTYPE,
    from?:totalNextRoute
) {
    queryPageToMap(to, router)
}

