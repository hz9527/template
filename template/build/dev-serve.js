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
//     srcs: ['_js_index_index_js'],
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

// 遍历入口，解析占位符，打包占位符对应的文件，并watch入口列表，watch占位符对应的包
var entryObj = {}, fileDep = {}
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
  var watcher = rollup.watch(getOptions('./js/index/index.js', true))
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
