const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// FriedlyErrors is a personal addition not part of main course
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const merge = require('webpack-merge');
const parts = require('./webpack.parts');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const commonConfig = merge([
  {
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Webpack Demo!',
      }),
    ],
  },
  parts.lintJavaScript({ include: PATHS.app, options: {emitWarning: true} }),
  // parts.loadCSS(),
  // parts.loadSASS(),
]);

const productionConfig = merge([
  parts.extractCSS({ use: 'css-loader' }),
]);

const developmentConfig = merge([
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
  parts.loadSASS(),
  
]);


module.exports = (env) => {
  console.log('env', env);
  if (env === 'production') {
    // console.log(merge(commonConfig, developmentConfig).module);
    return merge(commonConfig, productionConfig);
  }
  if (env === 'development') {
    console.log('DEBUGGING', developmentConfig.module);
    return merge(developmentConfig, commonConfig);
  }
};