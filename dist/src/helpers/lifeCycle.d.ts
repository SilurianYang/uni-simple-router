import { Router, proxyHookName, guardHookRule } from '../options/base';
import { LifeCycleConfig, InstantiateConfig } from '../options/config';
export declare function registerHook(list: Array<Function>, fn: Function): Function;
export declare function registerRouterHooks<T extends LifeCycleConfig>(cycleHooks: T, options: InstantiateConfig): T;
export declare function registerEachHooks(router: Router, hookType: proxyHookName, userGuard: guardHookRule): void;
//# sourceMappingURL=lifeCycle.d.ts.map