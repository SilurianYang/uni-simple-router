import { Router} from '../options/base';

export const addKeepAliveInclude = function(
    router:Router
):void{
    // 【Fixe】 https://github.com/SilurianYang/uni-simple-router/issues/316  2021年12月10日14:30:13
    const app = getApp();
    const keepAliveInclude:Array<string> = app.keepAliveInclude;
    if (router.runId === 0 && keepAliveInclude.length === 0) {
        const cacheId = app.$route.meta.name + '-' + app.$route.params.__id__;
        app.keepAliveInclude.push(cacheId)
    }
}
