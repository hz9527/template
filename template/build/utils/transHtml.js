var fs = require('fs')
var path = require('path')
var {localIp, port} = require('./dev-tools.js')

var resolvePath = (p = '') => path.join(__dirname, '../../src', p)
const Name = /--name/
function transImport (str) { // 解析占位符，并判断其合法性
  var arr, path, nameInd, pathName, name
  arr = str.split(' ')
  path = arr.filter(s => /^\.(\/js|\/styles).+\.(js|scss)$/g.test(s))[0]
  if (!path) {
    console.warn('config your path in html')
    return false
  }
  // 判断合法性
  if (!fs.existsSync(resolvePath(path))) {
    console.warn(path, 'is not exists')
    return false
  }
  pathName = path.replace(/\./g, '_').replace(/\//g, '_')
  nameInd = arr.findIndex(item => Name.test(item))
  if (nameInd > -1) {
    name = arr[nameInd + 1]
  }
  !name && (name = pathName)
  return {path, name, pathName}
}

function analyHtml (path) { // 返回html模版和内部解析值
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, fd) => {
      if (err) {
        reject(err)
        return
      }
      var tem = fd.toString()
      var list = tem.match(/@import-s.+@import-e/g) // 不支持占位符换行
      // var removeList = tem.match(/<!--[\s\S]*?-->/g).map(item => item.match(/@import-s.+@import-e/g)).filter(item => item)
      // list = list.filter(item => !removeList.some(l => l.some(it => it === item))) 暂时不支持注释依赖去除
      var importList = list.map(item => {
        var result = transImport(item.replace(/@import-s/, '').replace(/@import-e/, ''))
        if (result) {
          result.placeholder = item
        }
        return result
      }).filter(item => item)
      resolve({
        code: tem,
        importList
      })
    })
  })
}

function transHtml (path, dev) { // 将html内占位符替换为引用，如果是开发环境需要添加websocket
  return new Promise((resolve, reject) => {
    analyHtml(resolvePath('./views/' + path))
      .then(res => {
        if (dev) {
          var list = res.importList.map(item => item.pathName)
          res.importList.forEach(item => {
            res.code = res.code.replace(item.placeholder, `<script src='http://${localIp}:${port}/rullup-dev/${item.pathName}'></script>`)
          })
          res.code = res.code.replace('</body>', `<script>
            var list = ${list}
            list = list.split(',')
            var socket = new WebSocket('ws://${localIp}:${port}/socket')
            socket.addEventListener('open', function (event) {
                socket.send('loading from: ' + ${path.replace('.', '_')})
                console.log('connect successful' + Math.random())
            })
            socket.addEventListener('message', function (event) {
              if (list.some(item => item === event.data)) {
                window.location.reload()
              }
            })
          </script></body>`)
          resolve({
            $tem: res.code,
            srcs: res.importList
          })
        }
      })
      .catch(err => console.log(err))
  })
}

module.exports = transHtml
