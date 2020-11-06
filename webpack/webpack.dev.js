const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");
const {resolve} = require('path');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    output: {
		path: resolve(__dirname, '../examples/uni-simple-router2.0/dist'),
		filename: 'uni-simple-router.js',
	},
});