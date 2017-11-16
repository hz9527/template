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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9qcy9pbmRleC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ3BvbHlmaWxsJ1xudmFyIHRlc3QgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gIHNldFRpbWVvdXQocmVzb2x2ZSgxMjMpLCAxMDApXG59KVxudGVzdFxuICAudGhlbihyZXMgPT4ge1xuICAgIGNvbnNvbGUubG9nKHJlcylcbiAgfSlcbiJdLCJuYW1lcyI6WyJ0ZXN0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJ0aGVuIiwibG9nIiwicmVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFJQSxPQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7YUFDL0JELFFBQVEsR0FBUixDQUFYLEVBQXlCLEdBQXpCO0NBRFMsQ0FBWDtBQUdBRixLQUNHSSxJQURILENBQ1EsZUFBTztVQUNIQyxHQUFSLENBQVlDLEdBQVo7Q0FGSjs7OzsifQ==
