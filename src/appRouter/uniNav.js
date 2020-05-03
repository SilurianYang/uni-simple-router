
import { methods, baseConfig, Global } from '../helpers/config';
import { noop, formatURLQuery } from '../helpers/util';

let stop = null;

/**
 * 验证页面是否跳转完成
 * @param {Object} type 是用怎么样的方式进行跳转的
 * @param {Object} path 当前切换完成的页面路径
 */
export const pageNavFinish = function (type, path) {
    const { $holdTab, Router } = Global;
    if (Router.CONFIG.APP.holdTabbar === false) {	// 没有开启不必处理
        return false;
    }
    let tabbarList = [];
    if (__uniConfig.tabBar && __uniConfig.tabBar.list) {	// 有tabbar才触发
        tabbarList = __uniConfig.tabBar.list;
    } else {
        return false;
    }
    for (let i = 0; i < tabbarList.length; i += 1) {
        const { pagePath } = tabbarList[i];
        if (pagePath == `${path}.html` || `/${pagePath}` == `${path}.html`) {	// 在当前tabbar下
            return $holdTab.showHoldTab();
        }
    }
    if ($holdTab.isVisible === true) {
        return $holdTab.hideHoldTab();
    }
};
/**
 * @param {Object} finalRoute 格式化后的路由跳转规则
 * @param {Object} NAVTYPE 需要调用的跳转方法
 */
export const uniPushTo = function (finalRoute, NAVTYPE) {
    const promise = new Promise((resolve) => {
        const query = formatURLQuery(`?${finalRoute.uniRoute.query}`);
        const { APP } = baseConfig;
        const { url } = finalRoute.uniRoute;
        stop = setTimeout(() => {
            resolve(url);
            resolve = noop;	// 执行完了就没了 确保不会被下一次执行
            Global.LockStatus = false; // 跳转完成解锁状态
        }, APP.switchPageOutTime);

        uni[methods[NAVTYPE]]({
            url: url + query,
            ...finalRoute.route.animation,
            complete: () => {
                clearTimeout(stop);
                resolve(url);
                resolve = noop;	// 执行完了就没了 确保不会被下一次执行
                Global.LockStatus = false; // 跳转完成解锁状态
            },
        });
    });
    promise.then((url) => {
        pageNavFinish('NAV', url);
    });
    return promise;
};
