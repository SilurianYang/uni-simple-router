import {createRouter} from '../index';
import {InstantiateConfig } from '../options/config';
import { totalNextRoute} from '../options/base';

const options:InstantiateConfig = {
    platform: 'h5',
    routerBeforeEach: (to:totalNextRoute, from:totalNextRoute, next) => {
        console.log(to)
        console.log(from);
        console.log(next)
    },
    routerAfterEach: (to:totalNextRoute, from:totalNextRoute) => {
        console.log(to)
        console.log(from);
    },
    routes: [
        {
            aliasPath: '/',
            path: '/pages/index/index',
            name: 'index',
            style: {
                navigationBarTitleText: 'uni-app'
            },
            children: [
                {
                    aliasPath: '/',
                    path: '/pages/index/index',
                    name: 'index',
                    style: {
                        navigationBarTitleText: 'uni-app'
                    }
                }
            ]
        }
    ]
}

const router = createRouter(options);
console.log(router)
