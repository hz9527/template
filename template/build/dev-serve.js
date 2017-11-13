var tools = require('./utils/dev-tools.js')
var path = require('path')
var fs = require('fs')
var express = require('express')
var expressWs = require('express-ws')
var bodyParser = require('body-parser')
var rollup = require('rollup')
var getOptions = require('./utils/buildOptions.js')
var getHtml = require('./utils/transHtml.js')

// { // entryObj
//   index_html: {
//     $tem: code,
//     srcs: {_js_index_index_js: state}, // 0 not bundle 1 pending 2 finish
//     wsList: {id: ws}
//   }
// }

// { // fileDep
//   js_index_index_js: {
//     path: path,
//     deps: ['index_html'],
//     watcher: watcher
//   }
// }
var entryList = tools.getHtmlPathList()
var localIp = tools.localIp

// 打包完成通知enrtyObj，entryObj确认是否需要重新加载
// 需要重载时ws会给所有客户端发送一个页面标识，如果页面与标识一致就发送id给服务端，服务端收到id后将相应的id的ws删除并告知客户端，客户端再进行刷新
// websocket收到连接时生成一个id通知客户端

// 遍历入口，解析占位符，打包占位符对应的文件，并watch入口列表，watch占位符对应的包
var entryObj = {}, fileDep = {}
entryObj.on = function (type, data) { // deps pathName
  var state
  if (type === 'bundleStart') {
    state = 1
  } else if (type === 'bundleEnd') {
    state = 2
  }
  data.deps.forEach(htmlName => {
    this._setState(htmlName, data.pathName, state)
  })
}
entryObj._setState = function (htmlName, pathName, state) {
  this[htmlName].srcs[pathName] = state
  if (Object.values(this[htmlName].srcs).every(s => s === 2)) {
    // update pages
  }
}
Promise.all(entryList.map(item => { // item ==> path
  return getHtml(item, true)
}))
  .then(resArr => {
    resArr.forEach((entry, i) => {
      var html = entryList[i].replace('.', '_')
      var importList = entry.srcs
      entry.srcs = entry.srcs.map(item => item.pathName)
      entryObj[html] = Object.assign({}, entry, {wsList: {}})
      importList.forEach(item => {
        if (item.pathName in fileDep) {
          fileDep[item.pathName].deps.push(html)
        } else {
          getWatcher(item.path, item.pathName)
          fileDep[item.pathName] = {
            path: item.path,
            deps: [html]
          }
        }
      })
    })
  })
  .catch(err => {
    console.log(err)
  })

function getWatcher (filePath, pathName) {
  var watcher = rollup.watch(getOptions(filePath, true))
  watcher.on('event', event => {
    if (event.code === 'BUNDLE_END') {

    }
  })
  return watcher
}



// 遍历fileDep对其进行watch，并通知entryObj看是否需要宣布打包完成

// var app = express()
// // 处理所有script文件请求
// app.all('/rollup-dev/*', (req, res, next) => {
//
// })
// // websocket
// expressWs(app)
// app.ws('/socket', (ws, req) => {
//
// })
