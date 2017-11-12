var fs = require('fs')
const Name = /--name/
function transImport (str) {
  var arr = str.split(' ')
  var path = arr.filter(s => /^\.(\/js|\/styles).+\.(js|scss)$/g.test(s))[0]
  if (!path) {
    console.warn('config your path in html')
    return false
  }
  var nameInd = arr.findIndex(item => Name.test(item))
  var name, pathName
  pathName = path.replace(/\./g, '').replace(/\//g, '_')
  if (nameInd > -1) {
    name = arr[nameInd + 1]
  }
  !name && (name = pathName)
  return {path, name, pathName}
}

function transHtml (path, dev) {
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
        return transImport(item.replace(/@import-s/, '').replace(/@import-e/, ''))
      }).filter(item => item)
      resolve({
        code: tem,
        importList
      })
    })
  })
}

module.exports = transHtml
