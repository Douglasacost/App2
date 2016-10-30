let webpack = require('webpack');
let common = require('./webpack.config.js');

let optimizationPlugins = [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
];

common.plugins.push(...optimizationPlugins);

module.exports = common;