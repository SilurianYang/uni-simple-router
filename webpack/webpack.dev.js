const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");
const {resolve} = require('path');

module.exports = merge(common, {
    mode: 'development',
    output: {
		path: resolve(__dirname, '../util_example/appNavhold/dist'),
		filename: 'uni-simple-router.js',
	},
});