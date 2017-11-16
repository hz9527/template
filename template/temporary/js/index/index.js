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

var test = new Promise(function (resolve, reject) {
  setTimeout(resolve(123), 100);
});
test.then(function (res) {
  console.log(res);
});

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9pbmRleC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgdGVzdCA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgc2V0VGltZW91dChyZXNvbHZlKDEyMyksIDEwMClcbn0pXG50ZXN0XG4gIC50aGVuKHJlcyA9PiB7XG4gICAgY29uc29sZS5sb2cocmVzKVxuICB9KVxuIl0sIm5hbWVzIjpbInRlc3QiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInRoZW4iLCJsb2ciLCJyZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE9BQU8sSUFBSUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFxQjthQUMvQkQsUUFBUSxHQUFSLENBQVgsRUFBeUIsR0FBekI7Q0FEUyxDQUFYO0FBR0FGLEtBQ0dJLElBREgsQ0FDUSxlQUFPO1VBQ0hDLEdBQVIsQ0FBWUMsR0FBWjtDQUZKOzs7OyJ9
