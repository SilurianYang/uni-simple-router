import { Router } from '../options/base';
import { InstantiateConfig } from '../options/config';
declare function createRouter(params: InstantiateConfig): Router;
declare function RouterMount(Vim: any, router: Router, el?: string | undefined): void | never;
export { RouterMount, createRouter };
