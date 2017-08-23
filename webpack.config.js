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
          loader: 'css-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("css-loader!sass-loader")
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