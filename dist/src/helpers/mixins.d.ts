import { Router } from '../options/base';
export declare function getMixins(router: Router): {
    beforeCreate(this: any): void;
} | {
    beforeCreate(): void;
} | {
    onLaunch(): void;
};
export declare function initMixins(Vue: any, router: Router): void;
