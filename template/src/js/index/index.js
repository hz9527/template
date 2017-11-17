// import 'babel-polyfill'
// async function test () {
//   return await setTimout(() => {
//     console.log(123)
//   }, 500)
// }
// test()
var test = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(123)
  }, 500)
})
test.then(res => res)
