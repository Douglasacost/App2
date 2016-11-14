"use strict";

let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let common = {
  entry: [
    './src/index.jsx'
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel'
      },
      {
          test: /\.css$/,
          loader: 'style!css'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
        'process.env': {
        'NODE_ENV': JSON.stringify('production')
        }
    }),
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