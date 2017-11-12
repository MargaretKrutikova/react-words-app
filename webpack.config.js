const path = require('path');
const webpack = require('webpack');

const config = {
  entry: {
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'axios'
    ],
    app: ['./src/index.js']
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js',
    publicPath: ''
  },
  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env', 'stage-2']
          }
        } 
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
    })
  ]
};

module.exports = config;