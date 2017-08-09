var webpack = require('webpack');
var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({ minimize: true });//开启js压缩

var CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin('common');//提取公共模块

var ExtractTextPlugin = require("extract-text-webpack-plugin");//css规则文件，将独立引入变成Link

//var providePlugin = new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery' });//jquery

//var htmlWebpackPlugin=require('html-webpack-plugin'); 
module.exports = {
    entry: './src/page/index.js',
    output: {
        filename: '[name].js',
        publicPath: __dirname + '/www/assets',
        path: __dirname + '/www/build'
    },
    resolve: {
        modules: [
            "node_modules"
        ]
    },
    module: {
        rules: [
            { test: /.js$/, use: ['babel-loader'] },
            //{test: /.css$/, use: ['style-loader', 'css-loader']},
            { test: /.css$/, use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }) },
            { test: /.(jpg|png|gif|svg)$/, use: ['url-loader?limit=8192&name=./[name].[ext]'] },
            { test: /.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }
        ]
    },
   // plugins: [uglifyPlugin, CommonsChunkPlugin, new ExtractTextPlugin('main.css')]
   plugins: [CommonsChunkPlugin, new ExtractTextPlugin('main.css')]
}