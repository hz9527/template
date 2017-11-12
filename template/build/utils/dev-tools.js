var path = require('path')
var fs = require('fs')
var os = require('os')

function getHtmlPathList () {
  var list = process.argv.slice(2)
  var all = fs.readdirSync(path.join(__dirname, '../../src/views')).filter(item => item.indexOf('.html') === item.length - 5)
  if (list.length === 0) {
    return all
  } else {
    return all.filter(item => list.find(i => {
      var ind = item.indexOf(i)
      if (ind === 0 && item.slice(i.length) === '.html') {
        return true
      }
      return false
    }) !== -1)
  }
}

function getLocalIp () {
  let localhost = os.networkInterfaces()
  Object.keys(localhost).forEach(key => {
    let item
    typeof localhost !== 'string' && (item = localhost[key].find(item => item.family === 'IPv4' && item.address !== '127.0.0.1' && !item.internal))
    if (item) {
      localhost = item.address
    }
  })
  return localhost
}
module.exports = {
  getHtmlPathList,
  getLocalIp
}
