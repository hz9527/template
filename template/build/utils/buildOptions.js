var config = require('../../config/index.js')
let resolve = require('rollup-plugin-node-resolve')
let babel = require('rollup-plugin-babel')
let postcss = require('rollup-plugin-postcss')
let simplevars = require('postcss-simple-vars')
let nested = require('postcss-nested')
let cssnext = require('postcss-cssnext')
let cssnano = require('cssnano')
let prefixer = require('autoprefixer')

function getOptionsTem (dev) {
  var options
  if (dev) {
    options = {
      input: null,
      cache: true,
      plugins: [
        postcss({
          plugins: [
            prefixer(),
            simplevars(),
            nested(),
            cssnext({warnForDuplicates: false}),
            cssnano(),
          ],
          extensions: [ '.scss' ]
        }),
        resolve()
      ],
      onwarn ({message, loc, code, frame}) {
        console.log(message, code)
        if (loc) {
          console.warn(`${loc.file} (${loc.line}:${loc.column}) ${message}`)
        }
        if (frame) console.warn(frame)
      },
      output: [
        {
          formate: config.common.type,
          sourcemap: true
        }
      ],
      watch: {
        chokidar: true
      }
    }
  }
  return options
}

module.exports = getOptionsTem
