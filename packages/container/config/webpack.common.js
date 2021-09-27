// CommonJS module export

// This is going to take some kind a HTML file inside of our project to inject couple of Script Tags inside of it
// note - we are going moving it here from dev & prod configs since we are using it for both
// Creating easier setup so that we can use in both places easily
const HtmlWebpackPlugin = require('html-webpack-plugin');

// common configuration
module.exports = {
  module: {
    rules: [
      // we are going to define Loaders here
      // By default, Webpack only understands JavaScript & JSON files
      // Loaders to allow webpack to process other types of files & convert them into valid modules for our app
      // Loaders have to properties in our webpack config
      // 1. test - this property identifies which file or files should be transformed
      // 2. use - this property indicates which loader should be used to do the transforming
      {
        // files with .mjs or .js should be processed by Babel
        test: /\.m?js$/,

        // do not try to run Babel in node_modules files of our project
        exclude: /node_modules/,

        // use Babel to transform
        use: {
          loader: 'babel-loader',
          options: {
            // Babel is going to process all the JSX elements - @babel/preset-react
            // Transform all ES6 or newer ES Syntax into ES5 - @babel/preset-env
            presets: ['@babel/preset-react', '@babel/preset-env'],
            // This adds some additional code to enable different features inside browser like async await syntax
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },

  plugins: [
    // this plugin is going to take a look for all the files coming out of webpack process
    // & going to find file names & add appropriate Script Tags automatically behind the scenes in index.html
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};
