const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");
const {resolve} = require('path');
const rimraf = require('rimraf');

rimraf('D:/GIT_INFO/companyProject/longgang-AG-project/appNavhold/dist', () => {});

module.exports = merge(common, {
    mode: 'development',
    output: {
		path: resolve('D:/GIT_INFO/companyProject/longgang-AG-project/appNavhold','dist'),
		filename: 'uni-simple-router.js',
	},
});