// CommonJS import syntax

// merge is a function we can use to merge to different webpack config objects
// WE are going to merge webpack.common.js file into webpack.dev.js file
const { merge } = require('webpack-merge');

// This is going to take some kind a HTML file inside of our project to inject couple of Script Tags inside of it
const HtmlWebpackPlugin = require('html-webpack-plugin');

// common config
const commonConfig = require('./webpack.common');

// NOTE - We are going to use Module Federation Plugin in dev.js & prod.js because
// we will have slightly different configs around our Module Federation stuffs depending
// on whether or not we are in dev or prod environment
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

// webpack taking care of managing/updating our dependencies
// importing as an object from package.json
const packageJson = require('../package.json');

// Development Configuration
const devConfig = {
  mode: 'development',

  // Issue when we are having nested URL Paths & main.js is not loading at the correct path
  // To solve the bug, in general whenever we setup Webpack Dev File for Sub Projects
  // we usually want to set up a publicPath property like below of wherever
  // our Application is hosted at in the Dev Environment.
  output: {
    // note - don't forget the slash at the very end
    publicPath: 'http://localhost:8082/',
  },
  devServer: {
    // dev port - localhost
    port: 8082,
    historyApiFallback: true,
  },
  plugins: [
    // integration plugin
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

    // this plugin is going to take a look for all the files coming out of webpack process
    // & going to find file names & add appropriate Script Tags automatically behind the scenes in index.html
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};

// NOTE - now we need to take this 'devConfig' & merge it together with configuration in 'webpack.common.js' file
// exporting merge result of both configs
module.exports = merge(commonConfig, devConfig);
// note - by listing devConfig as Second arg, devConfig is going to over-ride or take priority
// over any other similar options we might assign to commonConfig
