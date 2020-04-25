const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const rimraf = require("rimraf");
const CopyPlugin = require('copy-webpack-plugin');

const {
  version
} = require('../npm-package/package.json');

rimraf("dist", () => {});

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: `uni-read-pages@${version}.js`,
    path: path.resolve(__dirname, '../', 'dist'),
  },
  plugins: [
    new CopyPlugin([{
      context: './src/',
      from: './index.js',
      force:true,
      to: `uni-read-pages@${version}.js`,
    }, {
      context: './src/',
      from: './index.js',
      force:true,
      to: `../npm-package/`,
    }]),
  ]
});