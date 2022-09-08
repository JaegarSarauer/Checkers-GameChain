const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { HotModuleReplacementPlugin } = require("webpack");

const paths = {
  src: path.resolve(__dirname, "./src"),
  dist: path.resolve(__dirname, "./dist"),
  public: path.resolve(__dirname, "./public"),
};

module.exports = {
  entry: paths.src + "/app/index.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    modules: [paths.src, "node_modules"],
    alias: {
      "@": paths.src,
      assets: paths.public,
    },
  },
  output: {
    filename: "[name].bundle.js",
    path: paths.dist,
    publicPath: "/",
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: "assets",
          globOptions: {
            ignore: ["*.DS_Store"],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./src/public/index.html",
      filename: "index.html",
      inject: true,
    }),
  ],
};
