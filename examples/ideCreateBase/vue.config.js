const TransformPages = require('uni-read-pages')
const tfPages = new TransformPages()
module.exports = {
    configureWebpack: {
        plugins: [
            new tfPages.webpack.DefinePlugin({
                ROUTES: JSON.stringify(tfPages.routes)
            })
        ]
    }
}