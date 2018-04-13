const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const project = require('./project.config');

module.exports = merge(common, {
  plugins: [
    new UglifyJSPlugin(),
    new ExtractTextPlugin({
      filename: 'styles/[name].[contenthash].css',
      allChunks: true,
    }),
    new webpack.DefinePlugin(Object.assign({}, {
      'process.env.NODE_ENV': JSON.stringify('production'),
    }, project.prodGlobals)),
  ],
});
