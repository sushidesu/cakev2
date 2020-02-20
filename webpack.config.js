const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HTMLWebPackPlugin = require("html-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
  entry: {
    popup: path.resolve(__dirname, "src/popup.tsx"),
    background: path.resolve(__dirname, "src/background.ts"),
    options: path.resolve(__dirname, "src/options.tsx"),
    content: path.resolve(__dirname, "src/content.ts"),
  },
  output: {
    path: `${__dirname}/dist`,
    filename: "[name].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(jpg|png)$/,
        loader: "file-loader",
        options: {
          outputPath: "images",
          name: "[name].[ext]",
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css", ".json"],
  },
  plugins: [
    new HTMLWebPackPlugin({
      template: "public/options.html",
      filename: "options.html",
      chunks: ["options"],
    }),
    new HTMLWebPackPlugin({
      template: "public/popup.html",
      filename: "popup.html",
      chunks: ["popup"],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new CopyPlugin([{ from: "public/manifest.json", to: "manifest.json" }]),
  ],
}
