'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')

const devtool = 'source-map'

const entry = {
  main: [
    'jquery',
    'babel-polyfill',
    path.resolve(__dirname, 'src/main.js')
  ]
}
const output = {
  path: path.resolve(__dirname, 'build'),
  filename: 'build.js'
}

const resolve = {
  modules: [
    'src',
    'node_modules'
  ]
}

const rules = [{
  test: /\.js$/, // run all js files through babel
  exclude: /node_modules/,
  use: ['babel-loader']
}, {
  test: /\.(css)$/,
  use: [
    'style-loader',
    'css-loader',
    'resolve-url-loader'
  ]
}, {
  test: /\.html$/,
  use: ['html-loader']
}, {
  test: /\.(jpg|jpeg|png|ico)$/,
  use: [
    'file-loader'
  ]
}]

const plugins = [
  new HtmlWebpackPlugin({
    title: 'example',
    inject: 'head',
    template: path.resolve(__dirname, 'static/index.html')
  }),
  new DashboardPlugin(),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  })
]

const devServer = {
  compress: true,
  inline: true,
  overlay: true,
  historyApiFallback: true
}

module.exports = {
  devtool,
  entry,
  output,
  resolve,
  module: { rules },
  plugins,
  devServer
}
