var path = require('path')
var fs = require('fs')
var spritesmith = require('spritesmith')
var resolve = (p = '') => path.join(__dirname, '../src/assets/icons', p)
var radio = 2 // pc 1 mobile 2 rem 200
var unit = 'px'

function getValue (v) {
  return Math.ceil(v / radio) + unit
}
function getName (name) {
  name = name.split('.')[0]
  return '.icon-' + name
}
function getCss (name, x, y, w, h) {
  return `${getName(name)} {
    width: ${getValue(w)};
    height: ${getValue(h)};
    background-position: -${getValue(x)} -${getValue(y)};
  }`
}

function build () {
  fs.readdir(resolve(), (err, filenames) => {
    if (err) {
      console.error('some error in sprite.js')
      return
    }
    var list = filenames.map(file => resolve('./' + file))
    spritesmith.run({
      src: list,
      algorithm: "binary-tree",
      padding: 10
    }, (err, result) => {
      console.log(result.coordinates)
      var infoList = Object.keys(result.coordinates).map(key => {
        return {
          name: key.slice(key.lastIndexOf('/assets/icons/') + 14),
          x: result.coordinates[key].x,
          y: result.coordinates[key].y,
          width: result.coordinates[key].width,
          height: result.coordinates[key].height
        }
      })
      var css = infoList.map(item => getName(item.name)).join(', ')
      css += `{
        background-image: url('./sprite.png');
        background-size: ${getValue(result.properties.width)} ${getValue(result.properties.height)};
        background-repeat: no-repeat;
      }\n`
      infoList.forEach(item => {
        css += getCss(item.name, item.x, item.y, item.width, item.height)
      })
      fs.writeFile(resolve('../sprite.scss'), css, 'utf8', err => {
        if (err) return
      })
      fs.writeFile(resolve('../sprite.png'), result.image, (err) => {
        if (err) return
      })
    })
  })
}
build()
