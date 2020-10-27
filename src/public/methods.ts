import { NAVTYPE, Router, uniBackApiRule, totalNextRoute, uniBackRule} from '../options/base'
import {queryPageToMap, resolveQuery} from './query'
import {voidFun, paramsToQuery} from '../helpers/utils'

export function navjump(
    to:string|totalNextRoute,
    router:Router,
    navType:NAVTYPE,
    from?:totalNextRoute
) :void{
    debugger
    const {rule} = queryPageToMap(to, router);
    const toRule = paramsToQuery(router, rule);
    const parseToRule = resolveQuery(toRule as totalNextRoute);
    if (router.options.platform === 'h5') {
        if (navType !== 'push') {
            navType = 'replace';
        }
        (router.$route as any)[navType](parseToRule, (parseToRule as totalNextRoute).success || voidFun, (parseToRule as totalNextRoute).fail || voidFun)
    } else {
        // transitionTo(router, toRule, from, navType, HOOKLIST, function() {
        //     console.log('跳转完成')
        // })
        console.log('非h5端跳转TODO')
    }
}

export function navBack(
    router:Router,
    level:number,
    origin?:uniBackRule|uniBackApiRule
):void{
    if (router.options.platform === 'h5') {
        (router.$route as any).go(-level)
    } else {
        console.log('非h5端返回TODO')
    }
}
