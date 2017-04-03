var webpack = require('webpack'),
  libraryName = 'validate-promise',
  path = require('path'),
  entry = [
    './src/index.js'
  ],
  plugins = [
    new webpack.NoErrorsPlugin()
  ],
  loaders = [
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
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'index.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: loaders
  },
  node: {
    dns: 'mock',
    net: 'mock'
  },
  plugins: plugins,
  watchOptions: {
    poll: true
  }
};
