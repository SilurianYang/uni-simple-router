import { Global } from './config';


const isLog = function (type, errText) {
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
    /* eslint no-console:"off" */
    console[type](errText);
};
export const err = function (errInfo) {
    isLog('error', errInfo);
};

export const warn = function (errInfo) {
    isLog('warn', errInfo);
};

export const log = function (errInfo) {
    isLog('log', errInfo);
};
export const warnLock = function (errInfo) {
    console.warn(errInfo);
};
