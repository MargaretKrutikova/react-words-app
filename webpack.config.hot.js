const path = require('path');

const config = {
  devtool: 'source-map',
  entry: {
    app: [
      'babel-polyfill',
      'prop-types',
      'react-hot-loader/patch',
      './src/index.js'
    ]
  },
  resolve: {
    alias: {
      'Services': path.resolve(__dirname, './src/services/')
    }
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};

module.exports = config;