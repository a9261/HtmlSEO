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
// config.target = 'node';
config.target = 'async-node';
//Setting Envirnoment
config.mode = 'development';
config.devtool = 'source-map',
config.entry = {
    entry:'./lib/htmlseo.ts'
}
config.output = {
    // path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    // chunkFilename:'[name].js', publicPath: "/assets/"
    publicPath: '',
    sourceMapFilename: '[file].map'
}
config.resolve = {
    extensions: [".ts", ".tsx", ".jsx", ".js", ".json"]
}
// config.externals={     "react": "React",     "react-dom": "ReactDOM" } module
// setting
config.module = {
    rules: [
        {
            enforce: "pre",
            test: /\.js$/,
            use: ['source-map-loader']
        }, {
            test: /\.tsx?$/,
            exclude: [resolve('node_modules')],
            use: ['awesome-typescript-loader']
        }, {
            test: /\.(js|jsx|mjs)$/,
            exclude: [resolve('node_modules')],
            // include: [path.resolve(__dirname, 'src')],
            use: {
                loader: 'babel-loader',
                options: {
                    //   presets: ['@babel/preset-env']
                    presets: ['env', 'react']
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