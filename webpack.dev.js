const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const project = require('./project.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
  devtool: 'eval',
  devServer: {
    contentBase: './dist',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({ disable: true, }), // disable extracting of css on dev to fasten compilation time
    new webpack.DefinePlugin(Object.assign({}, {
      'process.env.NODE_ENV': JSON.stringify('development'),
      DEBUG: true,
    }, project.devGlobals)),
  ],
});
