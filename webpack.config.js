"use strict";

let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let common = {
  entry: [
    './src/index.jsx'
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [ __dirname + '/node_modules' ],
        loader: 'babel-loader'
      },
      {
          test: /\.css$/,
          loader: 'css-loader"'
      },
      {
        test: /\.scss$/,
        use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "sass-loader" // compiles Sass to CSS
            }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('app.css', {
      allChunks: true
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/images', to: 'assets/images'},
      { from: 'src/index.html'}
    ])
  ]
};

module.exports = common;