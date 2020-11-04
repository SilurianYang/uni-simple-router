import { Router, hooksReturnRule, hookListRule, navtoRule, totalNextRoute, hookToggle, NAVTYPE, navErrorRule } from '../options/base';
export declare const ERRORHOOK: Array<(error: navErrorRule, router: Router) => void>;
export declare const HOOKLIST: hookListRule;
export declare function callBeforeRouteLeave(router: Router, to: totalNextRoute, from: totalNextRoute): hooksReturnRule;
export declare function callHook(hook: Function | undefined, to: totalNextRoute, from: totalNextRoute, router: Router, hookAwait?: boolean | undefined): hooksReturnRule;
export declare function onTriggerEachHook(to: totalNextRoute, from: totalNextRoute, router: Router, hookType: hookToggle, next: (rule?: navtoRule | false) => void): void;
export declare function transitionTo(router: Router, to: totalNextRoute, from: totalNextRoute, navType: NAVTYPE, callHookList: hookListRule, hookCB: Function): void;
export declare function loopCallHook(hooks: hookListRule, index: number, next: Function, router: Router, to: totalNextRoute, from: totalNextRoute, navType: NAVTYPE): void | Function;
//# sourceMappingURL=hooks.d.ts.map