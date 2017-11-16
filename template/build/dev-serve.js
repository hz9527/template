var tools = require('./utils/dev-tools.js')
var path = require('path')
var fs = require('fs')
var express = require('express')
var expressWs = require('express-ws')
var {transHtml} = require('./utils/transHtml.js')
var {entryObj, fileDep, getHtmlName} = require('./utils/dev-obj.js')
var config = require('../config/index.js')
var proxyMiddleware = require('http-proxy-middleware')
var mockCtrl

var entryList = tools.getHtmlPathList()
var localIp = tools.localIp

// 遍历入口，解析占位符，打包占位符对应的文件，并watch入口列表，watch占位符对应的包
Promise.all(entryList.map(item => { // item ==> path
  return transHtml(item, true)
}))
  .then(resArr => {
    resArr.forEach((entry, i) => { // entry $tem srcs Array path pathName name
      var htmlName = getHtmlName(entryList[i])
      entryObj.addTem(htmlName, entry.$tem, entry.srcs)
      entry.srcs.forEach(item => {
        fileDep.addFile(item.pathName, item.path, htmlName)
      })
    })
  })
  .catch(err => {
    console.log(err)
  })

var app = express()
// // 处理所有script文件请求
app.use(express.static(path.join(__dirname, '../' + config.dev.temporary)))

app.all('/', (req, res, next) => {
  if (req.url === '/') {
    var code = entryObj.index_html.$tem
    res.send(code)
  }
})
// // websocket
expressWs(app)
app.ws('/socket', (ws, req) => {
  var htmlName = getHtmlName(req.query.base)
  console.log(req.query.base)
  entryObj.addWs(htmlName, ws)
})

// proxy serve
var proxyList = Object.keys(config.dev.proxyTable).map(key => {
  return {
    key,
    value: config.dev.proxyTable[key]
  }
})
if (proxyList.length === 0 && config.dev.mock) {
  mockCtrl = require('./utils/dev-mock-ctrl.js')
  mockCtrl.init()
  proxyList = config.dev.mock.interface
  proxyList = typeof proxyList === 'string' ? [proxyList] : proxyList
  proxyList = proxyList.map(key => {
    return {
      key,
      value: `http:${localIp}:${config.dev.mock.port || 18001}`
    }
  })
}
proxyList.forEach(item => {
  if (typeof item.value === 'string') {
    item.value = { target: item.value }
  }
  app.use(proxyMiddleware(item.value.filter || item.key, item.value))
})


app.listen(config.dev.servePort || 18000, () => {
  console.log('serve running')
})
