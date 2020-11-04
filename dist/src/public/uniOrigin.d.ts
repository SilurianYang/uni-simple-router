import { reNavMethodRule, reNotNavMethodRule, Router, uniNavApiRule } from '../options/base';
export declare function uniOriginJump(router: Router, originMethod: Function, funName: reNavMethodRule | reNotNavMethodRule, options: uniNavApiRule, callOkCb?: Function): void;
export declare function formatOriginURLQuery(options: uniNavApiRule): uniNavApiRule;
