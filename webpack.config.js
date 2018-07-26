"use strict"
var path = require('path');
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
function resolve(dir) {
    return path.join(__dirname, dir)
}

var config = {}
config.optimization = {
    // 用套件時，啟用以下設定會有問題，要再詳查
    // splitChunks: {
    //     cacheGroups: {
    //         styles: {
    //             name: 'styles',
    //             test: /\.css$/,
    //             chunks: 'all',
    //             enforce: true
    //         }
    //     }
    // }
}
config.target = 'node';
// config.target = 'async-node';
//Setting Envirnoment
config.mode = 'development';
config.devtool = 'source-map',
config.entry = {
    seoMonkey:'./lib/seoMonkey.js'
}
config.output = {
    // path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    // chunkFilename:'[name].js', publicPath: "/assets/"
    publicPath: '',
    // sourceMapFilename: '[file].map'
}
config.resolve = {
    extensions: [".ts", ".tsx", ".jsx", ".js", ".json"]
}
// config.externals={     "react": "React",     "react-dom": "ReactDOM" } module
// setting
config.module = {
    rules: [
         {
            test: /\.(js)$/,
            exclude: [resolve('node_modules')],
            // include: [path.resolve(__dirname, 'src')],
            use: {
                loader: 'babel-loader',
                options: {
                    //   presets: ['@babel/preset-env']
                    presets: ['env']
                }
            }
        }
    ]
}
config.plugins = [
    new CleanWebpackPlugin(['dist']),
    new webpack.NamedModulesPlugin(),
]
module.exports = config;