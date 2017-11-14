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
var entryObj = {}
var fileDep = {}
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
}
entryObj.on = function (type, data) { // {htmlName, pathName}
  var state
  if (type === 'bundleStart') {
    state = 1
  } else if (type === 'bundleEnd') {
    state = 2
  }
  this._setState(data.htmlName, data.pathName, state)
}
entryObj._setState = function (htmlName, pathName, state) {
  this[htmlName].srcs[pathName] = state
  if (Object.values(this[htmlName].srcs).every(s => s === 2)) {
    // update pages
    Object.values(this[htmlName].wsList).forEach(ws => {
      if (ws) {
        ws.send('reload')
      }
    })
  }
}
entryObj.addWs = function (htmlName, ws) {
  var id = getKey(this[htmlName].wsList)
  this[htmlName].wsList[id] = ws
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
    if (event.code === 'BUNDLE_END' || event.code === 'END') {
      var eventName = event.code === 'BUNDLE_END' ? 'bundleStart' : 'bundleEnd'
      this[pathName].deps.forEach(htmlName => {
        this._emit('bundleStart', {htmlName, pathName})
      })
    }
  })
  return watcher
}
fileDep._emit = function (name, data) {
  entryObj.on(name, data)
}

module.exports = {entryObj, fileDep}
