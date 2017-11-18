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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9pbmRleC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgJ2JhYmVsLXBvbHlmaWxsJ1xuLy8gYXN5bmMgZnVuY3Rpb24gdGVzdCAoKSB7XG4vLyAgIHJldHVybiBhd2FpdCBzZXRUaW1vdXQoKCkgPT4ge1xuLy8gICAgIGNvbnNvbGUubG9nKDEyMylcbi8vICAgfSwgNTAwKVxuLy8gfVxuLy8gdGVzdCgpXG52YXIgdGVzdCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgcmVzb2x2ZSgxMjMpXG4gIH0sIDUwMClcbn0pXG50ZXN0LnRoZW4ocmVzID0+IHJlcylcbiJdLCJuYW1lcyI6WyJ0ZXN0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ0aGVuIiwicmVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7OztBQU9BLElBQUlBLE9BQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjthQUMvQixZQUFNO1lBQ1AsR0FBUjtHQURGLEVBRUcsR0FGSDtDQURTLENBQVg7QUFLQUgsS0FBS0ksSUFBTCxDQUFVO1NBQU9DLEdBQVA7Q0FBVjs7OzsifQ==
