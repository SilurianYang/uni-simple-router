const {resolve} = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.ts',
	output: {
		library: 'Router',
		libraryTarget: 'umd',
	},
	resolve: {
		extensions: ['.tsx', '.ts', 'd.ts', '.js', '.json'],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-loader',
					},
				],
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new CopyPlugin([
			{
				force: true,
				from: resolve(__dirname, '../src/component'),
				to: resolve(__dirname, '../dist'),
			},
		]),
	],
};
