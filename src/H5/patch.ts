import { removeSimpleValue } from '../helpers/utils';
import { Router} from '../options/base';

let [dynamicCacheName, __id__] = ['', ''];

export const addKeepAliveInclude = function(
    router:Router
):void{
    // 【Fixe】 https://github.com/SilurianYang/uni-simple-router/issues/316  2021年12月10日14:30:13
    const app = getApp();
    const keepAliveInclude:Array<string> = app.keepAliveInclude;
    if (router.runId === 0 && keepAliveInclude.length === 0) {
        __id__ = app.$route.params.__id__;
        dynamicCacheName = app.$route.meta.name;
        const cacheId = dynamicCacheName + '-' + __id__;
        app.keepAliveInclude.push(cacheId)
    } else {
        if (dynamicCacheName !== '') {
            const arrayCacheId = app.keepAliveInclude;
            for (let i = 0; i < arrayCacheId.length; i++) {
                const cacheId:string = arrayCacheId[i];
                const cacheIdReg = new RegExp(`${dynamicCacheName}-(\\d+)$`);
                const firstCacheId = `${dynamicCacheName}-${__id__}`;
                if (cacheIdReg.test(cacheId) && cacheId !== firstCacheId) {
                    removeSimpleValue(arrayCacheId, firstCacheId);
                    dynamicCacheName = '';
                    break;
                }
            }
        }
    }
}
