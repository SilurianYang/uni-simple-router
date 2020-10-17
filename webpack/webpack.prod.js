const {resolve} = require('path');
const {merge} = require("webpack-merge");
const common = require("./webpack.common.js");
const rimraf = require('rimraf');


function resolvePath(dir) {
    return resolve(__dirname, '../', dir)
}

rimraf('dist', () => {});

module.exports = merge(common, {
    mode: "production",
    output: {
		path: resolvePath('dist'),
		filename: 'uni-simple-router.js',
	},
})