// { // entryObj
//   index_html: {
//     $tem: code,
//     srcs: {_js_index_index_js: state}, // 0 not bundle 1 pending 2 finish
//     wsList: {id: ws}
//   }
// }

// { // fileDep
//   js_index_index_js: {
//     deps: ['index_html'],
//     watcher: watcher
//   }
// }
var {getKey} = require('./dev-tools')
var getOptions = require('./buildOptions.js')
var rollup = require('rollup')
var fs = require('fs')
var path = require('path')
var {compileHtml} = require('./transHtml.js')


function getHtmlName (html) {
  return html.replace(/\./g, '_')
}
function getHtmlPath (htmlName) {
  return path.join(__dirname, '../../src/views', htmlName.replace(/_/g, '.'))
}
var entryObj = {}
var fileDep = {}
fs.watch(path.join(__dirname, '../../src/views'), (event, fileName) => {
  var name = getHtmlName(fileName)
  if (name in entryObj.$watchList) {
    fs.readFile(entryObj.$watchList[name].path, (err, fd) => {
      if (err) {
        console.warn(err)
        return
      }
      entryObj[name].$tem = compileHtml(fd.toString(), entryObj.$watchList[name].srcs, fileName, true)
      entryObj.on('updateHtml', {htmlName: name})
    })
  }
})
entryObj.addTem = function (name, code, srcs) {
  var list = {}
  srcs.forEach(item => {
    var importFile = item.pathName
    list[importFile] = 0
  })
  this[name] = {
    $tem: code,
    srcs: list,
    wsList: {}
  }
  this._addWatch(name, srcs)
}
entryObj.$watchList = {}
entryObj._addWatch = function (name, srcs) {
  this.$watchList[name] = {
    path: getHtmlPath(name),
    srcs: srcs
  }
}
entryObj.on = function (type, data) { // {htmlName, pathName}
  var state
  if (type === 'bundleStart') {
    state = 1
  } else if (type === 'bundleEnd') {
    state = 2
  } else if (type === 'updateHtml') {
    this._updatePages(data.htmlName)
    return
  }
  this._setState(data.htmlName, data.pathName, state)
}
entryObj._setState = function (htmlName, pathName, state) {
  this[htmlName].srcs[pathName] = state
  if (Object.keys(this[htmlName].srcs).every(key => this[htmlName].srcs[key] === 2)) {
    // update pages
    this._updatePages(htmlName)
  }
}
entryObj._updatePages = function (htmlName) {
  Object.keys(this[htmlName].wsList).forEach(key => {
    if (this[htmlName].wsList[key]) {
      console.log('update page', htmlName)
      this[htmlName].wsList[key].send('reload')
    }
  })
}
entryObj.addWs = function (htmlName, ws) {
  var id = getKey(this[htmlName].wsList)
  this[htmlName].wsList[id] = ws
  console.log(htmlName, id)
  ws.on('close', () => {
    this._deleteWs(htmlName, id)
  })
}
entryObj._deleteWs = function (htmlName, id) {
  this[htmlName].wsList[id] = null
  delete this[htmlName].wsList[id]
}

fileDep.addFile = function (pathName, path, htmlName) {
  if (pathName in this) {
    this[pathName].deps.push(htmlName)
  } else {
    this[pathName] = {
      deps: [htmlName],
      watcher: this._addWatch(pathName, path)
    }
  }
}
fileDep._addWatch = function (pathName, path) {
  var watcher = rollup.watch(getOptions(path, path, true))
  watcher.on('event', event => {
    if (event.code === 'BUNDLE_START' || event.code === 'BUNDLE_END') {
      var eventName = event.code === 'BUNDLE_START' ? 'bundleStart' : 'bundleEnd'
      this[pathName].deps.forEach(htmlName => {
        this._emit(eventName, {htmlName, pathName})
      })
    }
  })
  return watcher
}
fileDep._emit = function (name, data) {
  entryObj.on(name, data)
}

module.exports = {entryObj, fileDep, getHtmlName}
