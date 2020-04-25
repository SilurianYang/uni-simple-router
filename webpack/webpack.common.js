module.exports = {
  entry: './src/index.js',
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude:/node_modules/,
      options: {
        fix: true
      }
    }]
  }
};