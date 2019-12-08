module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  publicPath: '',
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/photo-point-admin/'
  //   : '/',
  devServer: {
    proxy: 'http://127.0.0.1:8000',
    // proxy: 'http://192.168.0.133:1001/',
  }
}