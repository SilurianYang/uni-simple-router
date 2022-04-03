export * from './options/base'
export * from './options/config'
export * from './helpers/utils'

export {
    runtimeQuit
} from './app/appPatch'

export {
    RouterMount,
    createRouter
} from './public/router'

const version = $npm_package_version;
if (/[A-Z]/g.test(version)) {
    console.warn(`【${$npm_package_name.toLocaleLowerCase()} 提示】：当前版本 ${version.toLocaleLowerCase()} 此版本为测试版。有BUG请退回正式版，线上正式版本：${$npm_package_last_version}`)
}
