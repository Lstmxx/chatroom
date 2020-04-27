const path = require('path')

/* eslint-disable */
const resolve = dir => {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  lintOnSave: true,
  devServer: {
    disableHostCheck: true
  },
  css: {
    extract: process.env.NODE_ENV === 'production',
    sourceMap: false
  },
  configureWebpack: {    
    resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },    
    module: {        
      rules: [    
        {    
          test: /\.tsx?$/,    
          loader: 'ts-loader',    
          exclude: /node_modules/,    
          options: {
            appendTsSuffixTo: [/\.vue$/],    
          }    
        }        
      ]    
    }    
  },
  chainWebpack: config => {
    config.module
    .rule('node')
    .test(/\.node$/)
      .use('node-loader')
        .loader('node-loader')
        .end()
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_l', resolve('src/libs'))
      .set('_c', resolve('src/components'))
      .set('@static', resolve('src/static'))
      .set('@less', resolve('src/less'))
     const svgRule = config.module.rule('svg')
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]'
      })
    const fileRule = config.module.rule('file')
    fileRule.uses.clear()
    fileRule
      .test(/\.svg$/)
      .exclude.add(resolve('src/assets/icon'))
      .end()
      .use('file-loader')
      .loader('file-loader')
  },

  productionSourceMap: false,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/less/base/base.less')]
    }
  }
}