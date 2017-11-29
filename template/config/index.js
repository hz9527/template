const mockPort = 18001
module.exports = {
  dev: {
    assetsPublicPath: '/'
    servePort: 18000,
    mock: { // Object or false
      port: 18001,
      interface: '/api' // which interface need be proxy type is String | Array
    },
    proxyTable: {},
    useEslint: true,
    autoOpenBrowser: true,
    polyfill: false,
    poll: false,
    devtool: 'eval-source-map',
    cssSourceMap: false
  },
  prod: {
    publishPath: '',

  }
}
