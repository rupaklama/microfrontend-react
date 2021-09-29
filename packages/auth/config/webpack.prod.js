// NOTE - In Dev environment, we will be merging together webpack.common.js and webpack.dev.js
// In Prod environment, we will be merging together webpack.common.js and webpack.prod.js files
// some of the prod configs are already written in webpack.common.js file

// CommonJS import syntax

// merge is a function we can use to merge to different webpack config objects
// WE are going to merge webpack.common.js file into webpack.prod.js file
const { merge } = require('webpack-merge');

// NOTE - We are going to use Module Federation Plugin in dev.js & prod.js because
// we will have slightly different configs around our Module Federation stuffs depending
// on whether or not we are in dev or prod environment
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

// common config
const commonConfig = require('./webpack.common');

// webpack taking care of managing/updating our dependencies
// importing as an object from package.json
const packageJson = require('../package.json');

// Production Configuration
const prodConfig = {
  // This will make Webpack to run slightly differently, its going to make sure
  // all the JS files that are built get somewhat Optimized, its going to minified them
  mode: 'production',
  output: {
    // output file name template that we want Webpack to use instead of regular way - bundle.js
    filename: '[name].[contenthash].js',
    publicPath: '/auth/latest/',
  },
  plugins: [
    // This is Production Configurations.
    new ModuleFederationPlugin({
      // name for Remote App
      // note - needs to be exact same in Host config's value 'auth@'
      name: 'auth',

      // remoteEntry.js contains list of files that are available from this project
      // & direction on how to load them for our Container App
      // we can custom name this file
      filename: 'remoteEntry.js',

      // making this modules-files available to other projects
      exposes: {
        // key / value
        // key is just the Aliases filenames - renaming for name collisions
        './AuthApp': './src/bootstrap',
      },

      // to share dependencies with other projects
      // shared: ['react', 'react-dom'],
      // note - we can have webpack take care of this rather us manually updating all our dependencies
      shared: packageJson.dependencies,
    }),
  ],
};

// NOTE - now we need to take this 'prodConfig' & merge it together with configuration in 'webpack.common.js' file
// exporting merge result of both configs
module.exports = merge(commonConfig, prodConfig);
// note - by listing prodConfig as Second arg, prodConfig is going to over-ride or take priority
// over any other similar options we might assign to commonConfig
