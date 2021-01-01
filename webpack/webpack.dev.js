const {merge} = require("webpack-merge");
const {resolve} = require('path');
const common = require("./webpack.common.js");
const CopyPlugin = require('copy-webpack-plugin');

const output=resolve(__dirname, '../examples/uni-simple-router2.0/dist');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    output: {
		path:output ,
		filename: 'uni-simple-router.js',
    },
    plugins: [
        new CopyPlugin([{
          force: true,
          from: resolve(__dirname, '../src/component'),
          to: output,
        }]),
      ]
});