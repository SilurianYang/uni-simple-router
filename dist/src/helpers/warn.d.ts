import { debuggerConfig } from '../options/config';
import { Router } from '../options/base';
declare type callType = 'error' | 'warn' | 'log';
export declare function isLog(type: callType, dev: debuggerConfig, errText: any, enforce?: boolean): boolean;
export declare function err(errText: any, router: Router, enforce?: boolean): void;
export declare function warn(errText: any, router: Router, enforce?: boolean): void;
export declare function log(errText: any, router: Router, enforce?: boolean): void;
export declare function warnLock(errText: any): void;
export {};
//# sourceMappingURL=warn.d.ts.map