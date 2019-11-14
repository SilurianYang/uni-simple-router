type IArgs = {
  h5?: {
    loading?: boolean;
    hinderTab?: boolean;
    vueRouterDev?: boolean;
    useUniConfig?: boolean;
    keepUniIntercept?: boolean;
    vueNext?: boolean;
    replaceStyle?: boolean;
    resetStyle?: () => any;
    mode?: string;
    base?: string;
    linkActiveClass?: string;
    linkExactActiveClass?: string;
    scrollBehavior?: (to: any, from: any, savedPostion: any) => any;
    fallback?: boolean;
  };
  debugger?: boolean;
  encodeURI?: boolean;
  routerBeforeEach?: () => any;
  routerAfterEach?: () => any;
  routes: any[];
  [key: string]: any;
  [key: number]: any;
};

type IRule = {
  path?: string;
  name?: string;
  params?: any;
  query?: any;
};

type IMethods = {
  push: string;
  replace: string;
  replaceAll: string;
  pushTab: string;
  back: string;
};
interface ILifeCycle {
  beforeHooks: any[];
  afterHooks: any[];
  routerHooks: any[];
  routerbeforeHooks: any[];
  routerAfterHooks: any[];
}
interface IRouter extends Router {}
declare class Router {
  static $root: IRouter;
  CONFIG: IArgs;
  loadded: boolean;
  methods: IMethods;
  lifeCycle: ILifeCycle;
  lastVim: any;
  HooksFinish: boolean;
  depEvent: any[];
  static onLaunched: any;
  static onshowed: any;
  static showId: any;
  $route: any;
  static lastVim: any;
  static depShowCount: any;
  static doRouter: boolean;
  static install: (Vue: any) => void;
  constructor(arg: IArgs);
  /**动态的导航到一个新 URL 保留浏览历史
   * navigateTo
   * @param {Object} rule
   */
  push(rule: IRule): void;
  /**动态的导航到一个新 URL 关闭当前页面，跳转到的某个页面。
   * redirectTo
   * @param {Object} rule
   */
  replace(rule: IRule): void;
  /**动态的导航到一个新 URL 关闭所有页面，打开到应用内的某个页面
   * 	reLaunch
   * @param {Object} rule
   */
  replaceAll(rule: IRule): void;
  /**动态的导航到一个新 url 关闭所有页面，打开到应用内的某个tab
   * @param {Object} rule
   */
  pushTab(rule: IRule): void;
  /**
   * 返回到指定层级页面上
   */
  back(delta?: number): void;
  /**
   * @param {Object} Vim
   *
   */
  getQuery(Vim: any): any;
  beforeEach(fn: any): () => void;
  afterEach(fn: any): () => void;
}
export default Router;
/**
 *
 * @param {VueComponent } Vim vue实例对象
 * @param {dom} el	dom节点选择器
 */
export declare const RouterMount: (Vim: any, el: any) => void;
