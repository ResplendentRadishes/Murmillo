var webpack = require('webpack');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'client/dist');
var APP_DIR = path.resolve(__dirname, 'client/src');
var config = {
  entry: APP_DIR + '/index.jsx',
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        loader: 'babel',
      },
      { 
        test: /\.css$/, 
        loader: "style-loader!css-loader" 
      },
    ]
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  }
};
module.exports = config;
