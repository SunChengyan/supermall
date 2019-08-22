module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        // '@': 'src' 系统默认配置过了
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
