
import {debuggerConfig, debuggerArrayConfig} from '../options/config'
import {Router} from '../options/base'

type callType='error'|'warn'|'log';

export function isLog(type:callType, dev:debuggerConfig, errText:any, enforce:boolean = false):boolean {
    if (!enforce) {
        const isObject = dev.toString() === '[object Object]';
        if (dev === false) {
            return false
        } else if (isObject) {
            if ((dev as debuggerArrayConfig)[type] === false) {
                return false;
            }
        }
    }
    console[type](errText);
    return true;
}
export function err(errText:any, router:Router, enforce?:boolean):void {
    const dev = (router.options.debugger as debuggerConfig);
    isLog('error', dev, errText, enforce);
}

export function warn(errText:any, router:Router, enforce?:boolean):void {
    const dev = (router.options.debugger as debuggerConfig);
    isLog('warn', dev, errText, enforce);
}

export function log(errText:any, router:Router, enforce?:boolean):void {
    const dev = (router.options.debugger as debuggerConfig);
    isLog('log', dev, errText, enforce);
}
export function warnLock(errText:any):void {
    console.warn(errText);
}
