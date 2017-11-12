var tools = require('./utils/dev-tools.js')
var path = require('path')
var fs = require('fs')
var express = require('express')
var bodyParser = require('body-parser')
// var rollup = require('rollup')
// var getOptions = require('./utils/buildOptions.js')
var getHtml = require('./utils/transHtml.js')

// { // entryObj
//   index_html: {
//     $tem: code,
//     srcs: ['js_index_index_js']
//   }
// }
// { // fileDep
//   js_index_index_js: {
//     code: code,
//     deps: ['index_html'],
//     wsList: []
//   }
// }
var entryList = tools.getHtmlPathList()
var localIp = tools.getLocalIp()
// var options = getOptions(true)

// 遍历入口，解析占位符，打包占位符对应的文件，并watch入口列表，watch占位符对应的包

getHtml(path.join(__dirname, '../src/views/index.html'), true)
  .then(res => {
    console.log(res)
  })
  .catch(err => console.log(err))
