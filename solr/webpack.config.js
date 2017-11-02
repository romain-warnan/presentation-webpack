var path = require("path");
var Webpack = require("webpack");
var buildPath = path.resolve(__dirname, "");
var indexPath = path.resolve(__dirname, "src", "server.js");

module.exports = {
  entry: [indexPath],
  output: {
    path: buildPath,
    filename: "server-build.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, "src"),
        loader: "babel-loader",
        options: {
          presets: ["es2017"]
        },
        exclude: /node_modules/
      }
    ]
  },
  devtool: "sourcemap",
  node: {
    fs: "empty",
    net: "empty"
  }
};
