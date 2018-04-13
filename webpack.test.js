const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const project = require('./project.config');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({
      filename: 'styles/[name].[contenthash].css',
      allChunks: true,
    }),
    new webpack.DefinePlugin(Object.assign({}, {
      'process.env.NODE_ENV': JSON.stringify('test'),
      DEBUG: true,
    }, project.testGlobals)),
  ],
});
