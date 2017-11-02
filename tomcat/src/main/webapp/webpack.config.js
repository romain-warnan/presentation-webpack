var path = require("path");
var Webpack = require("webpack");
var buildPath = path.resolve(__dirname, "static/js");
var indexPath = path.resolve(__dirname, "src", "index.js");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: true //process.env.NODE_ENV === "development"
});

module.exports = {
  resolve: {
    extensions: [".js"]
  },
  entry: [indexPath],
  output: {
    path: buildPath,
    filename: "bundle.js",
    publicPath: "/demo-js/static/js"
  },
  devtool: "eval-source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, "src"),
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["es2016", "react"]
        }
      },
      {
        test: /\.css/,
        loaders: ["style-loader", "css-loader"],
        include: path.join(__dirname, "src")
      },
      {
        test: /\.scss/,
        loader: extractSass.extract({
          use: ["css-loader", "sass-loader?includePaths[]=" + path.resolve(__dirname, "./node_modules/compass-mixins/lib")],
          fallback: "style-loader"
        })
      }
    ]
  },
  devServer: {
    port: 3030,
    proxy: {
      "/": "http://localhost:8080/"
    }
  },
  plugins: [extractSass],
  node: {
    console: false,
    fs: "empty",
    net: "empty",
    tls: "empty"
  }
};
