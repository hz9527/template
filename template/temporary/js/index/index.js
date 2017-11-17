(function () {
'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);
  
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  return returnValue;
}

// import 'babel-polyfill'
// async function test () {
//   return await setTimout(() => {
//     console.log(123)
//   }, 500)
// }
// test()
var test = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(123);
  }, 500);
});
test.then(function (res) {
  return res;
});

}());
