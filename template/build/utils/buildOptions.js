var config = require('../../config/index.js')
let resolve = require('rollup-plugin-node-resolve')
let babel = require('rollup-plugin-babel')
let postcss = require('rollup-plugin-postcss')
let simplevars = require('postcss-simple-vars')
let nested = require('postcss-nested')
let cssnext = require('postcss-cssnext')
let cssnano = require('cssnano')
let prefixer = require('autoprefixer')
let path = require('path')

function getOptionsTem (input, output, dev) {
  var options
  if (dev) {
    options = {
      input: path.join(__dirname, '../../src/', input),
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
          file: path.join(__dirname, '../../', config.dev.temporary, '/', output),
          format: config.common.type,
          sourcemap: 'inline'
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
