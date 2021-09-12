import { voidFun } from '../helpers/utils';
import { warn } from '../helpers/warn';
import { Router, vueHookNameRule } from '../options/base';

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
    const keyArray = Object.keys(beforeProxyHooks) as Array<vueHookNameRule>;
    for (let i = 0; i < keyArray.length; i++) {
        const key = keyArray[i];
        const hooksArray:Array<Function>|null = hookOptions[key];
        if (hooksArray) {
            const beforeProxyFun = beforeProxyHooks[key];
            for (let j = 0; j < hooksArray.length; j++) {
                const hookFun = hooksArray[j];
                if (hookFun.toString().includes($npm_package_name)) {
                    continue
                }
                const [oldHook] = hooksArray.splice(j, 1, (...args:Array<any>) => {
                    // 保证这个函数不再重写
                    const pluginMark = $npm_package_name;
                    voidFun(pluginMark);

                    if (beforeProxyFun) {
                        beforeProxyFun.call(Vim, args, (options) => {
                            oldHook.apply(Vim, options)
                        }, router);
                    } else {
                        oldHook.apply(Vim, args)
                    }
                })
            }
        } else {
            warn(`beforeProxyHooks ===> 当前组件不适合${key}，或者 hook: ${key} 不存在，已为你规避处理，可以忽略。`, router)
        }
    }
    return true
}
