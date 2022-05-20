const { mode } = require('webpack-nano/argv')
const { merge } = require('webpack-merge')
const path = require('path')
const parts = require('./webpack.parts')

const commonConfig = merge([
  { entry: ['./src'] },
  parts.html({ title: 'Simple drawing app' }),
  parts.transpileTS(),
])

const productionConfig = merge([
  { output: { path: path.join(__dirname, 'build') } },
  parts.sourceMaps(),
  parts.extractCSS(),
])

const developmentConfig = merge([
  { output: { path: path.join(__dirname, 'dist') } },
  parts.inlineSourceMaps(),
  parts.loadCSS(),
  parts.devServer(),
])

const getConfig = (mode) => {
  switch (mode) {
    case 'development':
      return merge(commonConfig, developmentConfig, { mode })
    case 'production':
      return merge(commonConfig, productionConfig, { mode })
    default:
      throw new Error(`Mode "${mode}" is unknown. `)
  }
}

module.exports = getConfig(mode)
