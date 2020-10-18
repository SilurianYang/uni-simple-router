import {uni} from '../types';
import {uniNavApiRule} from '../options/base'

const rewrite: Array<string> = [
    'navigateTo',
    'redirectTo',
    'reLaunch',
    'switchTab',
    'navigateBack',
    'preloadPage'
];

export function rewriteMethod(): void {
    rewrite.forEach(name => {
        const oldMethod: Function = uni[name];
        uni[name] = function(params:uniNavApiRule|{from:string}):void {
            transitionTo(params, oldMethod, name);
        };
    })
}
function transitionTo(option: uniNavApiRule|{from:string}, oldMethod:Function, funName:string): void {
    console.log(option);
}
