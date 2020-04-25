import { appPlatform } from './util';
import { methods, H5FnTypeToggle, Global } from './config';
import { transitionTo } from '../appRouter/hooks';
import { appletsTransitionTo } from '../appletsRouter/hooks';
import { uniPushTo } from '../appRouter/uniNav';
import appletsUniPushTo from '../appletsRouter/appletsNav';
import { err } from './warn';
import H5PushTo from '../vueRouter/routerNav';
import * as compile from './compile';


/**
 * 返回api 触发的公共函数
 * @param {Object/String} rule  当前跳转规则
 * @param {String} fnType    跳转页面的类型方法
 *
 * this 为当前 Router 实例
 */
const isBcakNav = function ({
    backLayer,
    delta,
    H5PATCH,
}) {
    compile.H5(() => {
        H5PATCH.on('historyBack', {
            backLayer,
            delta,
        });
    });
    compile.notH5(() => {
        Global.backLayerC = backLayer;	// 告诉路由需要返回几层
        uni.navigateBack({
            delta: backLayer,
        });
    });
};

/**
 * 非 返回api 触发的公共函数
 * @param {Object/String} rule  当前跳转规则
 * @param {String} fnType    跳转页面的类型方法
 *
 * this 为当前 Router 实例
 */

const notBackNav = function (rule, fnType) {
    switch (appPlatform(true)) {
    case 'H5':
        return H5PushTo.call(this, H5FnTypeToggle[fnType], rule, methods[fnType]);
    case 'APP':
        return transitionTo.call(this, rule, fnType, uniPushTo);
    case 'APPLETS':
        return appletsTransitionTo.call(this, rule, fnType, appletsUniPushTo);
    default:
        err('糟糕！！！还有其他的执行环境？？？没听说过啊。一脸懵逼？？？加QQ群问问：769241495');
        break;
    }
};

/**
 * 处理正在跳转的公共api
 * @param {Object/String} rule  当前跳转规则
 * @param {String} fnType    跳转页面的类型方法
 *
 * this 为当前 Router 实例
 */
const navjump = function (rule, fnType, isBack = false) {
    if (isBack) { // 是返回api触发的
        return isBcakNav.call(this, rule, fnType);
    }
    return notBackNav.call(this, rule, fnType);
};

export default navjump;
