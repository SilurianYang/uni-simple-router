module.exports = {
    extends: 'airbnb-base',
    root: true,
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    rules: {
        "no-console": 'error',
        "no-new": 'off',
        'no-underscore-dangle':'off',   //禁止标识符中有悬空下划线
        'eqeqeq': 'off',  //是否全等
        'no-async-promise-executor':'off',      //禁止使用异步函数作为 Promise executor
        'consistent-return':'off',  //要求使用一致的 return 语句
        'no-return-assign':'off',   //禁止在返回语句中赋值
        'func-names':'off',    //要求或禁止命名的 function 表达式
        'no-param-reassign':'off',  //禁止对函数参数再赋值
        'radix':'off',  //要求必须有基数
        'no-lonely-if':'off',   //禁止 if 语句作为唯一语句出现在 else 语句块中
        'no-continue':'off',    //禁用 continue 
        'no-tabs':'off',    //些风格指南不允许使用 tab 字符，包括在注释内。
        'semi': ['error', 'always'],
        'max-len': ["error", { "code": 200 }],  //强制行的最大长度
        'no-irregular-whitespace': ['error', { 'skipComments': true }], // 允许在注释中出现任何空白字符
        'import/no-extraneous-dependencies': ['error', {'devDependencies': true}],
        'import/no-cycle':'off',
        'indent': ['error', 4],   //缩进4个字符
        'quotes': ['error', 'single'],        //只能用单引号
    },
    globals: {
        "uni":true,
        "history":true,
        'getCurrentPages':true,
        'plus':true,
        '__uniConfig':true
    },
    // 'settings': {
    //     "import/resolver": {
    //         "webpack": {
    //             "config": "node_modules/@vue/cli-service/webpack.config.js"
    //         }
    //     }
    // }
}