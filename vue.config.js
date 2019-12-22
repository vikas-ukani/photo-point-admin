module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  publicPath: '',
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/photo-point-admin/'
  //   : '/',
  devServer: {
    proxy: 'http://comedyclassroom.com',
    // proxy: 'http://192.168.0.133:1001/',
  }
}
