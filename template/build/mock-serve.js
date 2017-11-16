var config = require('../config/index.js')
var serveList = require('../config/mock.js')
var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json())

serveList.forEach(item => {
  var methods = typeof item.methods === 'string' ? [item.methods] : item.methods
  var route = app.route(item.path)
  methods.forEach(method => {
    route[method]((req, res) => {
      var result
      if (typeof item.handler === 'function') {
        result = item.handler(req)
      } else {
        result = item.handler
      }
      res.send(JSON.stringify(result))
    })
  })
})

app.listen(config.dev.mock.port || 18001, () => {
  console.log('mock build success')
})
