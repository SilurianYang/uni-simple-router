import {RouterDescribe, navtoRule} from './options/base';
import {InstantiateConfig} from './options/config';
import {baseConfig} from './helpers/config';
import {assertStrOptions} from './helpers/utils';

class Router extends RouterDescribe {
    public CONFIG:InstantiateConfig = baseConfig;
    constructor(options: InstantiateConfig) {
        super();
        this.CONFIG = assertStrOptions<InstantiateConfig>(options);
        console.log(this.CONFIG)
    }
    push(rule: navtoRule | string): void {
        console.log('这是push函数');
    }
    replace(rule: navtoRule | string): void {}
    replaceAll(rule: navtoRule | string): void {}
    pushTab(rule: navtoRule | string): void {}
    beforeEach(guard: Function): void {}
    afterEach(guard: Function): void {}
}

function RouterMount(Vim:any, el:string) :void {
}

export {
    RouterMount,
    Router
}
