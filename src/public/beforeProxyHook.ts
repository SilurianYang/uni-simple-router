import { Router } from '../options/base';

export function beforeProxyHook(
    Vim:any,
    router:Router
):boolean {
    const hookOptions = Vim.$options;
    const {beforeProxyHooks} = router.options;
    if (hookOptions == null) {
        return false;
    }
    if (beforeProxyHooks == null) {
        return false;
    }
    const keyArray = Object.keys(beforeProxyHooks);
    for (let i = 0; i < keyArray.length; i++) {
        const key = keyArray[i];
        const hooksArray:Array<Function>|null = hookOptions[key];
        if (hooksArray) {
            for (let j = 0; j < hooksArray.length; j++) {
                const hookFun = hooksArray[j];
                if (hookFun.toString().includes($npm_package_name)) {
                    continue
                }
                hooksArray.splice(j, 1, (...args:Array<any>) => {

                })
            }
        }
    }
    return true
}
