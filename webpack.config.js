const webpack = require('webpack');
const libraryName = 'validate-promise';
const path = require('path');

const entry = [
  './src/index.js'
];
const loaders = [
  {test: /\.js$/, exclude: /(node_modules)/, loader: 'babel-loader'}
];


  // plugins.push(new webpack.optimize.UglifyJsPlugin({
  //   compress: {
  //     warnings: false
  //   }
  // }
  // ));

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: entry,
  mode: 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'index.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: loaders
  },
  node: {
    dns: 'mock',
    net: 'mock'
  },
  watchOptions: {
    poll: true
  }
};
