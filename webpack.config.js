const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const buildWebpackConfig = (env) => {
  // flags
  const isHot = process.argv.indexOf('--hot') !== -1;
  const isProduction = process.argv.indexOf('-p') !== -1;

  const ExtractTextPluginConfig = new ExtractTextPlugin({
    filename: 'site.css',
    allChunks: true,
    disable: isHot
  });

  const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    inject: 'body'
  });
  const plugins = [ExtractTextPluginConfig, HtmlWebpackPluginConfig, new Dotenv()];

  let sourceMaps = !isProduction;
  let minimize = isProduction;

  // different entry configuration for hot reloading
  const webpackEntry = {};

  if (isHot || (env && env.hot)) {
    webpackEntry.app = [
      'babel-polyfill',
      'prop-types',
      'react-hot-loader/patch',
      './src/index.js'
    ];
  } else {
    webpackEntry.app = ['./src/index.js'];
    webpackEntry.vendor = [
      'babel-polyfill',
      'react',
      'react-dom',
      'prop-types',
      'axios'
    ];
    plugins.push(
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity
      }));

    if (isProduction) {
      plugins.push(new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }));
    }
  }

  return {
    entry: webpackEntry,
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: '[name].js',
      publicPath: '/'
    },
    plugins: plugins,
    resolve: {
      alias: {
        'Services': path.resolve(__dirname, './src/services/')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          exclude: /node_modules/,
          use: {
            loader: 'url-loader?limit=1024'
          }
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [{
              loader: 'css-loader',
              options: {
                modules: false,
                sourceMap: sourceMaps,
                minimize: minimize
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: sourceMaps,
                plugins: () =>
                  ([require('autoprefixer')({ browsers: 'last 5 versions' })])
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: sourceMaps,
                minimize: minimize
              }
            }]
          })
        }
      ]
    }
  };
};

module.exports = buildWebpackConfig;