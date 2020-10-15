const {resolve} = require("path");
const rimraf = require("rimraf");

rimraf("dist", () => {});

module.exports = {
    entry: './src/index.ts',
    output: {
        path: resolve(__dirname, '../', 'dist'),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"]
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: ["ts-loader"],
            exclude: /node_modules/
        }]
    }
};