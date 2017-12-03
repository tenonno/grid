const TARGET = process.env.npm_lifecycle_event;
var merge = require('webpack-merge');

const webpack = require('webpack');
const path = require('path');

// awesome-typescript-loader
//const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

// webpack
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const failPlugin = require('webpack-fail-plugin');

// postcss
const cssnext = require('postcss-cssnext');
const simpleVars = require('postcss-simple-vars')

const common = {

  target: 'electron-renderer',
  externals: {
    "7zip": "7zip"
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve('app')
  },

  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx', '.css'],
    modulesDirectories: ['src', 'node_modules'],
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ['awesome-typescript-loader'],
        include: [path.resolve(__dirname, 'src')]
      },
      {
        test: /\.jsx?$/, // 拡張子がjsxで
        exclude: /node_modules/, // node_modulesフォルダ配下でなければ
        loader: 'babel-loader', // babel-loaderを使って変換する

        include: [path.resolve(__dirname, 'src')],
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        loaders: [
          'style?sourceMap',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader'
        ]
      },
      {
        test: /\.(jpg|png)$/,
        loaders: 'file-loader?name=[name].[ext]',
        include: [path.resolve(__dirname, 'resources')],
        
      },
    ],

    postLoaders: [
      {
        include: path.resolve(__dirname, 'node_modules/pixi.js'),
        loader: 'transform?brfs'
      }
    ]
  },

  postcss: () => ({
    plugins: [
      cssnext({ browsers: ['last 1 Chrome versions'] }),
      simpleVars({
        variables: function () {
          return require('./src/css-global-vars.js');
        }
      })
    ]
  }),

  plugins: [
    failPlugin,
    new HtmlWebpackPlugin({
      title: 'Grid',
      template: path.resolve(__dirname, 'src', 'index.ejs')
    })
  ]

};

if (TARGET === 'server') {
  module.exports = merge(common, {

    devtool: 'eval',

    entry: [
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr&reload=true',
      'index.tsx'
    ],

    plugins: [
      new WebpackNotifierPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
      })
    ]

  })
}

if (TARGET === 'prepackage') {
  module.exports = merge(common, {

    entry: [
      'index.tsx'
    ],

    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
        __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false')),
      })
    ]

  })
}
