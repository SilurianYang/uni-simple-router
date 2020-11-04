import { appletsVueHookConfig, appVueHookConfig, InstantiateConfig, LifeCycleConfig } from '../options/config';
import { appVueSortHookRule, indexVueSortHookRule, notCallProxyHookRule } from '../options/base';
export declare const mpPlatformReg: RegExp;
export declare const baseConfig: InstantiateConfig;
export declare const lifeCycle: LifeCycleConfig;
export declare const appProxyHook: {
    app: appVueHookConfig;
};
export declare const indexProxyHook: appletsVueHookConfig;
export declare const proxyVueSortHookName: {
    app: Array<appVueSortHookRule>;
    index: Array<indexVueSortHookRule>;
};
export declare const notCallProxyHook: Array<notCallProxyHookRule>;
//# sourceMappingURL=config.d.ts.map