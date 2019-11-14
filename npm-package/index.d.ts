import Vue, { ComponentOptions, PluginFunction, AsyncComponent } from "vue";

type Component = ComponentOptions<Vue> | typeof Vue | AsyncComponent;
type Dictionary<T> = { [key: string]: T };

export type RouterMode = "hash" | "history" | "abstract";
export type RawLocation = string | Location;
export type RedirectOption = RawLocation | ((to: Route) => RawLocation);
export type NavigationGuard<V extends Vue = Vue> = (
  to: Route,
  from: Route,
  next: (to?: RawLocation | false | ((vm: V) => any) | void) => void
) => any;

type Position = { x: number; y: number };
type PositionResult = Position | { selector: string; offset?: Position } | void;

type RoutePropsFunction = (route: Route) => Object;

export interface PathToRegexpOptions {
  sensitive?: boolean;
  strict?: boolean;
  end?: boolean;
}

export interface RouteConfig {
  path: string;
  name?: string;
  component?: Component;
  components?: Dictionary<Component>;
  redirect?: RedirectOption;
  alias?: string | string[];
  children?: RouteConfig[];
  meta?: any;
  beforeEnter?: NavigationGuard;
  props?: boolean | Object | RoutePropsFunction;
  caseSensitive?: boolean;
  pathToRegexpOptions?: PathToRegexpOptions;
}

export interface RouteRecord {
  path: string;
  regex: RegExp;
  components: Dictionary<Component>;
  instances: Dictionary<Vue>;
  name?: string;
  parent?: RouteRecord;
  redirect?: RedirectOption;
  matchAs?: string;
  meta: any;
  beforeEnter?: (
    route: Route,
    redirect: (location: RawLocation) => void,
    next: () => void
  ) => any;
  props:
    | boolean
    | Object
    | RoutePropsFunction
    | Dictionary<boolean | Object | RoutePropsFunction>;
}

export interface Location {
  name?: string;
  path?: string;
  hash?: string;
  query?: Dictionary<string | (string | null)[] | null | undefined>;
  params?: Dictionary<string>;
  append?: boolean;
  replace?: boolean;
}

export interface Route {
  path: string;
  name?: string;
  hash: string;
  query: Dictionary<string | (string | null)[]>;
  params: Dictionary<string>;
  fullPath: string;
  matched: RouteRecord[];
  redirectedFrom?: string;
  meta?: any;
}

type H5 = {
  loading?: boolean;
  hinderTab?: boolean;
  vueRouterDev?: boolean;
  useUniConfig?: boolean;
  keepUniIntercept?: boolean;
  vueNext?: boolean;
  replaceStyle?: boolean;
  resetStyle?: () => Object;
  mode?: RouterMode;
  base?: string;
  linkActiveClass?: string;
  linkExactActiveClass?: string;
  scrollBehavior?: (
    to: Route,
    from: Route,
    savedPosition: Position | void
  ) => PositionResult | Promise<PositionResult>;
  fallback?: boolean;
};

export interface RouterOptions {
  h5?: H5;
  debugger?: boolean;
  encodeURI?: boolean;
  routerBeforeEach?: () => Object;
  routerAfterEach?: () => Object;
  routes?: RouteConfig[];
}

declare class Router {
  constructor(arg: RouterOptions);
  /**动态的导航到一个新 URL 保留浏览历史
   * navigateTo
   * @param {Object} rule
   */
  push(rule: Location): void;
  /**动态的导航到一个新 URL 关闭当前页面，跳转到的某个页面。
   * redirectTo
   * @param {Object} rule
   */
  replace(rule: Location): void;
  /**动态的导航到一个新 URL 关闭所有页面，打开到应用内的某个页面
   * 	reLaunch
   * @param {Object} rule
   */
  replaceAll(rule: Location): void;
  /**动态的导航到一个新 url 关闭所有页面，打开到应用内的某个tab
   * @param {Object} rule
   */
  pushTab(rule: Location): void;
  /**
   * 返回到指定层级页面上
   */
  back(delta?: number): void;
  /**
   * @param {Object} Vim
   *
   */
  getQuery(Vim: any): any;
  beforeEach(fn: () => void): () => void;
  afterEach(fn: () => void): () => void;
}

export default Router;

/**
 *
 * @param {VueComponent } Vim vue实例对象
 * @param {dom} el	dom节点选择器
 */

export declare const RouterMount: (Vim: any, el: string | Element) => void;

declare module "vue/types/vue" {
  interface Vue {
    $Router: Router;
    $Route: Route;
  }
}
