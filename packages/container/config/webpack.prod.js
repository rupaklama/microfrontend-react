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

// we don't have the URL yet for Prod, doing setup for the URL when we know what that is in the future
// NOTE - this Environment Variable is going to get Define when we build our App through  CI/CD Pipeline
// This Env Variable is going to contain a String that says where exactly our Production App is hosted
const domain = process.env.PRODUCTION_DOMAIN;

// Production Configuration
const prodConfig = {
  // This will make Webpack to run slightly differently, its going to make sure
  // all the JS files that are built get somewhat Optimized, its going to minified them
  mode: 'production',
  output: {
    // output file name template that we want Webpack to use instead of regular way - bundle.js
    filename: '[name].[contenthash].js',
    // to refer to a file that been built by Webpack to solve a bug of not showing 'blank' page
    // eg. html file trying to refer to some js file thats been created by Webpack - main.js
    publicPath: '/container/latest/', // this will get pre-pend to a filename above
  },
  plugins: [
    // This is Production Configurations.
    new ModuleFederationPlugin({
      // name for Host app - optional
      name: 'container',

      // lists of Projects - Remote Apps that the Host can can search to get additional code
      // lists of our Remotes - sub apps
      remotes: {
        // key / value
        // key is the Remote Marketing App - whenever we want to import something with this name - marketing
        // value - marketing@ is 'name' property in the Remote webpack config file with
        // url for the remoteEntry file to get the Source Code
        // marketing: 'marketing@http://localhost:8081/remoteEntry.js',

        // note - above is what we have for Dev environment but we have to change it for Prod Env
        // On our Deployment Requirements list, this is where the Second Step applies
        // The second step is - Location of child app remoteEntry.js files must be known at build time
        // we don't have the URL yet but will get put here automatically when we have it inside of related files
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
      },

      // to share dependencies with other projects
      // shared: ['react', 'react-dom'],
      // note - we can have webpack take care of this rather us manually updating all our dependencies
      shared: packageJson.dependencies,
      // NOTE - we might not want to do this if we want to be very specific on what modules we are sharing
    }),
  ],
};

// NOTE - now we need to take this 'prodConfig' & merge it together with configuration in 'webpack.common.js' file
// exporting merge result of both configs
module.exports = merge(commonConfig, prodConfig);
// note - by listing prodConfig as Second arg, prodConfig is going to over-ride or take priority
// over any other similar options we might assign to commonConfig
