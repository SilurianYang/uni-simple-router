const {resolve} = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const rimraf = require("rimraf");
const CopyPlugin = require('copy-webpack-plugin');

const {
  version
} = require('../npmBase/package.json');

rimraf("dist", () => {});
rimraf("npm-package", () => {});

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: `uni-simple-router@${version}.js`,
    path: resolve(__dirname, '../', 'dist'),
  },
  plugins: [
    new CopyPlugin([
      {
        from: resolve(__dirname, '../', 'src'),
        to: resolve(__dirname, '../', 'npm-package'),
      },
      {
        from: resolve(__dirname, '../', 'README.md'),
        to: resolve(__dirname, '../', 'npm-package'),
      },
      {
        from: resolve(__dirname, '../', 'npmBase/package.json'),
        to: resolve(__dirname, '../', 'npm-package'),
      },
      {
        from: resolve(__dirname, '../', 'types'),
        to: resolve(__dirname, '../', 'npm-package/types'),
      },
  ]),
  ]
});