import { appPlatform } from './util';
import { methods, H5FnTypeToggle, Global } from './config';
import { transitionTo } from '../appRouter/hooks';
import { appletsTransitionTo, backCallHook } from '../appletsRouter/hooks';
import { uniPushTo } from '../appRouter/uniNav';
import appletsUniPushTo from '../appletsRouter/appletsNav';
import { err, warn } from './warn';
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
    compile.APP(() => {
        Global.backLayerC = backLayer;	// 告诉路由需要返回几层
        uni.navigateBack({
            delta: backLayer,
        });
    });
    compile.mp(() => {
        backCallHook.call(this, backLayer, () => {
            uni.navigateBack({
                delta: backLayer,
            });
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
        Global.LockStatus = true; // 设置为锁住状态
        return transitionTo.call(this, rule, fnType, uniPushTo);
    case 'APPLETS':
        Global.LockStatus = true; // 设置为锁住状态
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
    if (Global.LockStatus) { // 正在跳转的状态下 给出提示正在跳转
        return warn('当前页面正在处于跳转状态，请稍后再进行跳转....');
    }
    if (isBack) { // 是返回api触发的
        return isBcakNav.call(this, rule, fnType);
    }
    return notBackNav.call(this, rule, fnType);
};

export default navjump;
