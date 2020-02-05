const merge = require('webpack-merge')
const path = require('path');
const base = require('./webpack.config.js');
const ExtensionReloader = require('webpack-extension-reloader');

module.exports = merge(base, {
  mode: 'development',
  watch: true,
  entry: {
    popup: path.resolve(__dirname, 'src/popup.tsx'),
    background: path.resolve(__dirname, 'src/background.ts'),
    options: path.resolve(__dirname, 'src/options.tsx')
  },
  plugins: [
    new ExtensionReloader({
      manifest: path.resolve(__dirname, 'public/manifest.json'),
      port: 3001,
      reloadPage: true,
      entries: {
        background: 'background',
        options: 'options',
        extensionPage: 'popup'
      }
    })
  ]
})
