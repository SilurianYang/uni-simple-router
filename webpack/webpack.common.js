const {resolve} = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const webpack =require('webpack');
const cmd = require('node-cmd');


const {data:versions,err} = cmd.runSync('npm v uni-simple-router versions');

if(err){
    console.log('获取线上版本失败，无法继续打包。。。')
    process.exit(1);
}

let lastVersion='';
const list=JSON.parse(versions.replace(/'/g,'"')).reverse();
for(let i=0;i<list.length;i++){
    if (!/[A-Za-z]/g.test(list[i])) {
        lastVersion=list[i];
        break;
    }
}

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
			}
		]),
        new webpack.DefinePlugin({
            $npm_package_name: webpack.DefinePlugin.runtimeValue(() => {
                return JSON.stringify(process.env.npm_package_name.toLocaleUpperCase())
            }, true ),
            $npm_package_version: webpack.DefinePlugin.runtimeValue(() => {
                return JSON.stringify(process.env.npm_package_version.toLocaleUpperCase())
            }, true ),
            $npm_package_last_version: webpack.DefinePlugin.runtimeValue(() => {
                return JSON.stringify(lastVersion)
            }, true ),
        })
	],
};
