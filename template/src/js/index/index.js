import 'polyfill'
var test = new Promise((resolve, reject) => {
  setTimeout(resolve(123), 100)
})
test
  .then(res => {
    console.log(res)
  })
