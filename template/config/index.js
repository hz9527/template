const mockPort = 18001
module.exports = {
  common: {
    type: 'iife'
  },
  dev: {
    entryView: 'index.html',
    temporary: 'temporary', // watch temporary dir
    servePort: 18000,
    mockPort: mockPort,
    proxyTable: {
      '/api': 'http://127.0.0.1:' + mockPort
    }
  },
  prod: {
    publishPath: ''
  }
}
