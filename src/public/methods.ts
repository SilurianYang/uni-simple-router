import { NAVTYPE, Router, totalNextRoute} from '../options/base'
import {queryPageToMap} from './page'
// import {transitionTo, HOOKLIST} from './hooks'
import {voidFun} from '../helpers/utils'

export function navjump(
    to:string|totalNextRoute,
    router:Router,
    navType:NAVTYPE,
    from?:totalNextRoute
) {
    const {rule: toRule} = queryPageToMap(to, router);
    if (router.options.platform === 'h5') {
        if (navType !== 'push') {
            navType = 'replace';
        }
        (router.$route as any)[navType](toRule, (toRule as totalNextRoute).success || voidFun, (toRule as totalNextRoute).fail || voidFun)
    } else {
        // transitionTo(router, toRule, from, navType, HOOKLIST, function() {
        //     console.log('跳转完成')
        // })
        console.log('非h5端跳转TODO')
    }
}

