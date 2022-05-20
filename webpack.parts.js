/* HTML */

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { MiniHtmlWebpackPlugin } = require('mini-html-webpack-plugin')
const { WebpackPluginServe } = require('webpack-plugin-serve')

exports.html = ({ title }) => ({
  plugins: [
    new MiniHtmlWebpackPlugin({
      context: { title },
    }),
  ],
})

/* CSS */

exports.loadCSS = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
})

exports.extractCSS = () => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
})

/* TRANSPILERS */

exports.transpileTS = () => ({
  resolve: { extensions: ['.ts', '.js'] },
  module: {
    rules: [{ test: /\.ts$/, use: ['ts-loader'] }],
  },
})

/* DEV TOOLS */

exports.sourceMaps = () => ({
  devtool: 'source-map',
})

exports.inlineSourceMaps = () => ({
  devtool: 'inline-source-map',
})

exports.devServer = () => ({
  entry: ['webpack-plugin-serve/client'],
  watch: true,
  plugins: [
    new WebpackPluginServe({
      host: 'localhost',
      port: 8080,
      waitForBuild: true,
      liveReload: true,
      static: './dist',
      //ramdisk: true // uncomment if you are on linux for ease of installation
    }),
  ],
})
