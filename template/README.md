## {{ name }}

## html占位符
占位符支持js与scss占位符，可配置包名，如

```html
<html>
  <head>
    <title>my project</title>
    @import-s ./styles/reset.scss -name reset @import-e
  </head>
  <body>
    @import-s ./js/index/index.js @import-e
  </body>
</html>
```
路径为以src为根路径
默认名为路径转换名，如js_index_index.js

## html
在views中不可嵌套文件夹
