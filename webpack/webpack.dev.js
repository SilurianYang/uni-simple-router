const {resolve} = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const CopyPlugin = require('copy-webpack-plugin');
const rimraf = require("rimraf");

const baseDist=resolve(__dirname, '../', 'examples/dev/common/uni-simple-router');

rimraf(baseDist, () => {});

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