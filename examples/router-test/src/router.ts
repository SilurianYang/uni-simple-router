import { createRouter, RouterMount, totalNextRoute } from './dist/uni-simple-router'

const tabbar: Record<string, string> = {
    '/pages/tabBar/index/index': 'index',
    '/pages/tabBar/post/post': 'post',
    '/pages/tabBar/mine/mine': 'mine'
}

declare const ROUTES: []

const router = createRouter({
    // @ts-ignore
    platform: process.env.VUE_APP_PLATFORM,
    // @ts-ignore
    routes: [
        ...ROUTES,
        {
            path: '*',
            redirect: (to: totalNextRoute) => {
                const name = tabbar[to.path]
                if (name) {
                    return { name }
                }
                return { name: '404' }
            }
        }
    ]
})

console.warn(ROUTES, router)

export { router, RouterMount }
