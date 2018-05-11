<<<<<<< HEAD:webpack.prod.js
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const project = require('./project.config');
=======
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const project = require('../project.config')
>>>>>>> 9d654ca014c24741db7894624526fd3f40cf4be2:webpack/webpack.prod.js

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
