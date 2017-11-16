const mockPort = 18001
module.exports = {
  common: {
    type: 'iife'
  },
  dev: {
    entryView: 'index.html',
    temporary: 'temporary', // watch temporary dir
    servePort: 18000,
    mock: {
      port: 18001,
      interface: '/api' // which interface need be proxy type is String | Array
    },
    proxyTable: {}
  },
  prod: {
    publishPath: ''
  }
}
