import {createRouter, routesMapKeysRule} from '../src/index';

import {routesForMapRoute} from '../src/helpers/utils';

const routes = [
	{path: '/pages/login/login', name: 'login', aliasPath: '/'},
	{path: '/pages/page2/page2', name: 'page2', aliasPath: '/page2/:id'},
	{path: '/pages/page3/page3', aliasPath: '/:name/page3/:id'},
	{path: '/pages/animation/animation', aliasPath: '/an-(\\d+)-on'},
    {path: '/static/1/1', aliasPath: '/static/(.*)'},
    {path: '/dynamic/1/1', aliasPath: '/dynamic-*'},
    {path: '/dynamic/3/3', aliasPath: '/dynamic3'},
    {path: '*'}
];

const router = createRouter({
	platform: 'app-plus',
	keepUniOriginNav: true,
	routes,
});

const Vue = function () {};
Vue.mixin = () => {};

router.install(Vue);

const rules: routesMapKeysRule[] = ['finallyPathMap', 'pathMap'];

it('别名路径匹配',()=>{
    const toRoute1 = routesForMapRoute(router, '/dynamic3', rules);
	expect(toRoute1).toEqual(routes[6]);

    const toRoute2 = routesForMapRoute(router, '/dynamic/3/3', rules);
	expect(toRoute2).toEqual(routes[6]);
})

it('全局匹配', () => {
	const toRoute1 = routesForMapRoute(router, '/pages/login/login', rules);
	expect(toRoute1).toEqual(routes[0]);

	const toRoute2 = routesForMapRoute(router,'/pages/login/login?id=666',rules);
	expect(toRoute2).toEqual(routes[0]);

	const toRoute3 = routesForMapRoute(router, '/page2/6666', rules);
	expect(toRoute3).toEqual(routes[1]);

	const toRoute4 = routesForMapRoute(router, '/page2/6666?id=555', rules);
	expect(toRoute4).toEqual(routes[1]);

	const toRoute5 = routesForMapRoute(router, '/pages/page3/page3', rules);
	expect(toRoute5).toEqual(routes[2]);

	const toRoute6 = routesForMapRoute(router, '/test/page3/123', rules);
	expect(toRoute6).toEqual(routes[2]);

	const toRoute7 = routesForMapRoute(router, '/an-123-on', rules);
	expect(toRoute7).toEqual(routes[3]);

    const toRoute8 = routesForMapRoute(router, '/static/aaa/bbb?id=1444&name=999', rules);
	expect(toRoute8).toEqual(routes[4]);

    const toRoute9 = routesForMapRoute(router, '/dynamic-6666-5555', rules);
	expect(toRoute9).toEqual(routes[5]);

    const toRoute10 = routesForMapRoute(router, '/aaaaaa', rules);
	expect(toRoute10).toEqual(routes[7]);

    const toRoute11 = routesForMapRoute(router, '---48848--14545', rules);
	expect(toRoute11).toEqual(routes[7]);
});
