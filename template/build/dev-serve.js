var tools = require('./utils/dev-tools.js')
var path = require('path')
var fs = require('fs')
var express = require('express')
var expressWs = require('express-ws')
var bodyParser = require('body-parser')
var {transHtml} = require('./utils/transHtml.js')
var {entryObj, fileDep, getHtmlName} = require('./utils/dev-obj.js')
var config = require('../config/index.js')


var entryList = tools.getHtmlPathList()
var localIp = tools.localIp

// 打包完成通知enrtyObj，entryObj确认是否需要重新加载
// 需要重载时ws会给所有客户端发送一个页面标识，如果页面与标识一致就发送id给服务端，服务端收到id后将相应的id的ws删除并告知客户端，客户端再进行刷新
// websocket收到连接时生成一个id通知客户端

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
// app.all('/rollup-dev/*', (req, res, next) => {
//
// })
app.all('/index', (req, res, next) => {
  var code = entryObj.index_html.$tem
  res.send(code)
})
// // websocket
expressWs(app)
app.ws('/socket', (ws, req) => {
  var htmlName = getHtmlName(req.query.base)
  console.log(req.query.base)
  entryObj.addWs(htmlName, ws)
})

app.listen(config.dev.servePort, () => {
  console.log('serve running')
})
