## 快速上手
```sh
npm i vue-cli -g
vue init hz9527/template myProject
...
```

## 模版说明
### 概述
目前计划支持rollup传统项目（不使用任何框架）模版与vue模版  
在模板中都有pc项目与m端项目选项  

> m端项目区别在于meta调整视口，reset样式（高亮等效果去除），rem计算，默认在iphone6上1rem为100px

### 模版默认支持
#### rollup项目
1. html数量根据views文件夹下数量自动生成
2. html与js引用关系通过html中占位符自动识别
3. 使用scss及postcss自动补全
4. 使用雪碧图合并图片

### 模版初始化配置
#### rollup项目
- [ ] 是否需要babel
- [ ] 如果使用babel，是否需要垫片
- [ ] 是否需要eslint
- [ ] 是否需要stylelint
- [ ] 是否需要mock
- [ ] 开发环境下，是否需要在构建成功后自动打开浏览器

## 版本规划
### rollup项目
#### 基础功能
- [ ] 移动端与pc端模版区别（reset样式，rem，meta及样式补全方案等）
- [x] 识别html占位符
- [x] babel支持
- [x] scss支持
- [x] postcss支持
- [ ] eslint支持
- [x] 热加载支持
- [ ] 代理接口支持
- [ ] mock支持及mock热更新
- [ ] 雪碧图支持

#### 高级功能
- [ ] html命名可以使用任意字符
- [ ] views目录可以多层级
- [ ] 占位符高级配置并支持scss占位符
- [ ] 雪碧图配置
- [ ] console去掉
