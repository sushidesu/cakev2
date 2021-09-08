const merge = require("webpack-merge")
const path = require("path")
const base = require("./webpack.config.js")

module.exports = merge(base, {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    popup: path.resolve(__dirname, "src/popup.tsx"),
    background: path.resolve(__dirname, "src/background.ts"),
    options: path.resolve(__dirname, "src/options.tsx"),
  },
})
