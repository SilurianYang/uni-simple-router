module.exports = {
    entry: './src/index.ts',
    output: {
        library:'Router',
        libraryTarget:'umd'
	},
	resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
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
};
