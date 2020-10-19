
type callType='error'|'warn'|'log';
declare const Global:any;

export function isLog(type:callType, errText:any, enforce:boolean) {
    if (!enforce) {
        const dev = Global.Router.CONFIG.debugger;
        const isObject = dev.toString() === '[object Object]';
        if (dev === false) {
            return false;
        } if (dev === false) {
            return false;
        } if (isObject) {
            if (dev[type] === false) {
                return false;
            }
        }
    }
    console[type](errText);
}
export function err(errText:any, enforce:boolean = false) {
    isLog('error', errText, enforce);
}

export function warn(errText:any, enforce:boolean = false) {
    isLog('warn', errText, enforce);
}

export function log(errText:any, enforce:boolean = false) {
    isLog('log', errText, enforce);
}
export function warnLock(errText:any) {
    console.warn(errText);
}
