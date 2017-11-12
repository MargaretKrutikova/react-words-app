const path = require('path');

const config = {
  devtool: 'source-map',
  entry: {
    app: [
      'babel-polyfill',
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
              [
                'latest', {
                  'es2015': {
                    'modules': false
                  }
                }
              ],
              'react'
            ],
            plugins: ['react-hot-loader/babel']
          }
        }
      }
    ]
  }
};

module.exports = config;