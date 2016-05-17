"use strict";
import path from 'path';
import webpack from 'webpack';
import colors from 'colors';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TransferWebpackPlugin from 'transfer-webpack-plugin';
import Clean from 'clean-webpack-plugin';

let config = {
    resolve:{
        alias:{

        },
        root: path.join(__dirname, 'src'),
        extensions: ['', '.js'],
    },
    entry:{
        main  : './src/index.js',
    },
    output:{
        path: './dist',
        filename:'[name].js',
        publicPath: ''
    },
    module:{
        loaders:[
            {test: /\.vue$/ ,loader : 'vue'},
            {
                test: /\.js$/,
                exclude: function (path) {
                    if(/moensun/.test(path)){return false}
                    if(/node_modules/.test(path)){return true}
                    return false;
                },
                loader: 'babel-loader' ,
                query:{
                    presets:['es2015'],
                    plugins:['transform-runtime']
                },
            },
            {test: /\.css$/, loader: "style-loader!css-loader" },
            {test: /\.(png|jpg|gif)$/,loader: "url?limit=2500" },
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff2"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
            {test: require.resolve('jquery'), loader: 'expose?$'},
        ]
    },
    plugins:[
        new Clean(['dist']),
        new TransferWebpackPlugin([
           // {from: 'images', to: 'images'}
        ], path.join(__dirname, 'src')),
        new webpack.ProvidePlugin({
            _ : 'lodash',
            $ : 'jquery',
            jQuery : 'jquery'
        })
    ],
    devtool:'#source-map'
}

module.exports = config;