'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = merge(baseWebpackConfig, {
  /**
   * development模式下默认启用这些插件
   * NamedChunksPlugin  
   * NamedModulesPlugin // 显示模块的相对路径
   */
  mode: 'development',
  output: {
    /**
     * HotModuleReplacement下文件名无法使用hash，
     * 所以将filename与chunkFilename配置从base中拆分到dev与prod中
     */
    filename: '[name].js', 
    chunkFilename: '[id].js'
  },
  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: 'localhost',
    port: '8080',
    open: true,
    publicPath: '/',
    // quiet: true, // necessary for FriendlyErrorsPlugin
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash].css",
      chunkFilename: "[id]-[contenthash].css"
    }),
    new webpack.HotModuleReplacementPlugin(),
    /**
     * 对应production下HashedModuleIdsPlugin插件
     * 使用路径做模块标识
     */
    // new webpack.NamedModulesPlugin()
    new HtmlWebpackPlugin({
      filename: 'index.html', // 文件写入路径，好像dev-server模式下只能使用此文件名，不能配置路径
      template: path.resolve(__dirname, '../src/index.html'),// 模板文件路径
      inject: true
    }),
  ]
})
