import { objectAny, Router, RoutesRule, totalNextRoute } from '../options/base';
export declare function queryPageToMap(toRule: string | totalNextRoute, router: Router): {
    rule: totalNextRoute;
    route: RoutesRule;
    query: objectAny;
};
export declare function resolveQuery(toRule: totalNextRoute, router: Router): totalNextRoute;
export declare function parseQuery(query: objectAny, router: Router): objectAny;
export declare function stringifyQuery(obj: objectAny): string;
//# sourceMappingURL=query.d.ts.map