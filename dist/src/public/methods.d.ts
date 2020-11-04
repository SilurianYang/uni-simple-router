import { NAVTYPE, Router, totalNextRoute, routeRule } from '../options/base';
export declare function lockNavjump(to: string | totalNextRoute, router: Router, navType: NAVTYPE): void;
export declare function navjump(to: string | totalNextRoute, router: Router, navType: NAVTYPE, nextCall?: {
    from: totalNextRoute;
    next: Function;
}): void;
export declare function navBack(router: Router, level: number, navType: NAVTYPE): void;
export declare function forceGuardEach(router: Router, navType?: NAVTYPE | undefined): void;
export declare function createRoute(router: Router, level?: number | undefined, orignRule?: totalNextRoute): routeRule | never;
