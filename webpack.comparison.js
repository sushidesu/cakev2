// ref: https://zenn.dev/ryo_kawamata/articles/improve-dependabot-pr
const { merge } = require("webpack-merge")
const base = require("./webpack.config.js")

module.exports = merge(base, {
  output: {
    path: process.env.OUT_DIR,
    filename: "[name].bundle.js",
  },
  devtool: false,
})
