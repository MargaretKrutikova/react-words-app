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
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                'modules': false
              }],
              'react'
            ],
            plugins: [
              ['transform-class-properties', { 'spec': true }],
              'transform-decorators',
              'transform-object-rest-spread',
              'react-hot-loader/babel'
            ]
          }
        }
      }
    ]
  }
};

module.exports = config;