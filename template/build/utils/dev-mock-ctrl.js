var child_process = require('child_process')
var path = require('path')
var fs = require('fs')
const ConfName = 'mock.js'

console.log('mock-ctrl')
var mockCtrl = {
  _cid: null,
  _build () {
    console.log('mock building ....')
    var child = child_process.fork(path.join(__dirname, '../mock-serve.js'))
    this._cid = child.pid
    child.on('close', code => {
      if (code !== 0) {
        console.log('mock serve error')
      }
      setTimeout(() => {
        this._build()
      }, 500)
    })
  },
  init () {
    this._build()
    fs.watch(path.join(__dirname, '../../config'), (event, filename) => {
      if (filename === ConfName) {
        setTimeout(() => {
          process.kill(this._cid)
          console.log('mock will rebuild')
        }, 500)
      }
    })
  }
}

module.exports = mockCtrl
