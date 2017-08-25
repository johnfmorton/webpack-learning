const path = require('path');
const glob = require('glob');

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
  parts.loadFonts({
    options: {
      name: '[name].[ext]',
    },
  }),
  parts.loadJavaScript({ include: PATHS.app }),
]);



const productionConfig = merge([
  {
    performance: {
      hints: 'warning', // 'error' or false are valid too
      maxEntrypointSize: 100000, // in bytes
      maxAssetSize: 450000, // in bytes
    },
  },
  parts.clean(PATHS.build),
  parts.minifyJavaScript(),
  parts.extractBundles([
    {
      name: 'vendor',

      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
      ),

    },
  ]),
  parts.extractCSS({ 
    use: ['css-loader', parts.autoprefix()],
  }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
    purifyOptions: {
      minify: true,
    },
  }),
  parts.loadImages({
    options: {
      limit: 15000,
      name: '[name].[ext]',
    },
  }),
  parts.generateSourceMaps({ type: 'source-map' }),

  parts.attachRevision(),

]);



const developmentConfig = merge([
  {
    output: {
      // devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
      devtoolModuleFilenameTemplate: 'webpack:///[/Users/john/git/webpack-demo/app]',
    },
  },
  // parts.generateSourceMaps({ type: 'cheap-module-eval-source-map' }),
  parts.generateSourceMaps({ type: 'eval-source-map' }),
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
  parts.loadSASS(),
  parts.loadImages(), 
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