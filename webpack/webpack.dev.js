const {resolve} = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const CopyPlugin = require('copy-webpack-plugin');

const baseDist=resolve(__dirname, '../', 'examples/common/uni-simple-router');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: `uni-simple-router.js`,
    path:baseDist ,
  },
  plugins: [
    new CopyPlugin([{
      force: true,
      from: resolve(__dirname, '../', 'src'),
      to: baseDist,
    }]),
  ]
});