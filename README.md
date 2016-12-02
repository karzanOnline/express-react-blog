 多人在线博客( 在线聊天正在开发中... ) http://karzan.herokuapp.com/
###相关技术栈

 - Express

 - MongoDB

 - React

 - React-router

 - Redux

 - Immutable

 - ES6

 - ES7(async await)(据说node V7.0就支持)

 - co

####运行方式
首先，请先安装node环境，然后在安装依赖的工具：

```
npm install
```
第二步部署mongodb，http://www.mongodb.org/downloads官网下载
MongoDB/Server/3.2/bin目录下建立blog文件夹用来存放生成的数据。
在cmd输入mongod --dbpath=(你当前blog文件夹的目录)


```
//开启mongodb服务
$ mongod --dbpath=D:\MongoDB\Server\3.2\bin\blog

```

开发阶段：

```
//运行静态
npm run static
//开启服务
node app(.js)

```
运行成功之后，直接在浏览器打开 http://127.0.0.1:3000 即可，默认的端口号是8080。

![123](https://raw.githubusercontent.com/karzanOnline/express-mongodb-react-blog/master/jdfw.gif)


以下为开发日志：

后续将加入React-router(已添加) Redux（已添加)(待完善)

2016.09.06 基本实现博客登陆、注册、发表文章基本功能

 - async.js 模拟ES7实现async await（通过阅读TJ大神的CO代码，虽然不难但是重要的是Idea）
 - 将之前通过回调存取数据 已用Promise重构


2016.09.08 更新版本将路由交于前端控制  React-router实现单页面刷新(后续将会加入React在server渲染)

 - 加入React-router （因为之前使用ejs渲染的模板 所以views改动较大。由变量直接渲染到ejs 更改为发送ajax请求获取）
 - 使用sass提取公共样式

2016.09.13 添加react动画,添加redux状态管理(已经有了雏形，待完善)

 - 引入rc-queue-anim创建react切换动画
 - 添加Pubsub.js
 - 添加redux

2016.09.14 加入immutable 优化性能


2016.09.20 添加权限管理,支持markdown语法

2016.09.23 页面级重构(页面是借鉴了hexo-theme-yilia)(借鉴~！对！就是借鉴！)


