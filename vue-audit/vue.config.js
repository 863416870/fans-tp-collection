// node基本包 处理路径
const path = require('path')
const isPro = process.env.NODE_ENV === 'production' // 是否为生产环境
function resolve(dir) {
  // __dirname代表文件所在地址，也就是根目录
  // path.join就是将前后台路径拼起来成为绝对路径，保证文件可以访问
  return path.join(__dirname, dir)
}

module.exports = {
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,

  // 部署应用包时的基本 URL
  publicPath: '/',

  // 生产环境 sourceMap
  productionSourceMap: false,

  // assetsDir: 'static',
  // webpack 配置修改链接 API，用于生成和修改 webapck 配置
  chainWebpack: (config) => {
    config.resolve.alias // 配置别名指定对应路径
      .set('@', resolve('src'))
      .set('lin', resolve('src/lin'))
      .set('assets', resolve('src/assets'))
    config.module // 'vue-markdown-loader/lib' 目录下为外部库md文件不参与检测
      .rule('md')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
  },

  configureWebpack: {
    resolve: {
      extensions: ['.js', '.json', '.vue', '.scss', '.html'],
    },
  },

  // 比如你可以这样向所有 Sass 样式传入共享的全局变量：
  css: {
    loaderOptions: {
      sass: {
        // data: '@import "@/assets/styles/share.scss";',
      },
    },
  },
  devServer: {
    port: isPro ? 8080 : 5000,
    // open: true, // 服务启动默认打开浏览器
  },

  // node_modules依赖项es6语法未转换问题
  transpileDependencies: [
    'vuex-persist',
  ],
  // less样式共享
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        //这个是加上自己的路径，
        //注意：试过不能使用别名路径
        path.resolve(__dirname, './src/assets/styles/share.less'),
      ]
    }
  }
}
