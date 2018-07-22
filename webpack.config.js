const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const buildWebpackConfig = (env) => {
  // flags
  const isHot = process.argv.indexOf('--hot') !== -1;
  const isProduction = process.argv.indexOf('-p') !== -1;

  const MiniCssExtractPluginConfig = new MiniCssExtractPlugin({
    filename: 'site.css'
  });
  const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    inject: 'body'
  });
  const plugins = [
    HtmlWebpackPluginConfig,
    new Dotenv(),
    MiniCssExtractPluginConfig
  ];

  let sourceMaps = !isProduction;
  let minimize = isProduction;

  // different entry configuration for hot reloading
  const webpackEntry = {};
  const enableHotReload = isHot || (env && env.hot);

  if (enableHotReload) {
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

    if (isProduction) {
      plugins.push(
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        })
      );
    }
  }

  return {
    entry: webpackEntry,
    optimization: !enableHotReload
      ? {
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /node_modules/,
              name: 'vendor',
              priority: 10,
              enforce: true,
              chunks: 'all'
            }
          }
        }
      }
      : {},
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: '[name].js',
      publicPath: '/'
    },
    plugins: plugins,
    resolve: {
      alias: {
        Services: path.resolve(__dirname, './src/services/'),
        Reducers: path.resolve(__dirname, './src/reducers/'),
        Common: path.resolve(__dirname, './src/common/')
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
          test: /\.(css|sass|scss)$/,
          use: [
            {
              loader: enableHotReload
                ? 'style-loader'
                : MiniCssExtractPlugin.loader
            },
            {
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
                plugins: () => [
                  require('autoprefixer')({ browsers: 'last 5 versions' })
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: sourceMaps,
                minimize: minimize
              }
            }
          ]
        }
      ]
    }
  };
};

module.exports = buildWebpackConfig;
