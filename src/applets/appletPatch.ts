import { Router} from '../options/base';

export function getEnterPath(
    vueVim:any,
    router:Router,
) :string {
    switch (router.options.platform) {
    case 'mp-alipay':
    case 'mp-weixin':
    case 'mp-toutiao':
    case 'mp-qq':
        return vueVim.$options.mpInstance.route;
    case 'mp-baidu':
        return vueVim.$options.mpInstance.is;
    }
    return vueVim.$options.mpInstance.route; // 这是暂时的 因为除了以上的小程序 其他没测试 先这样写
}
