const TransformPages = require('uni-read-pages')
const tfPages = new TransformPages()
module.exports = {
    transpileDependencies:['uni-simple-router','uni-hold-tabbar'],
    configureWebpack: {
        plugins: [
            new tfPages.webpack.DefinePlugin({
                ROUTES: JSON.stringify(tfPages.routes)
            })
        ]
    }
}