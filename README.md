## Express+MongoDB+React+React-router+Redux+Immutable 搭建多人使用博客##



后续将加入React-router(已添加) Redux（已添加)(待完善)

2016.09.06 基本实现博客登陆、注册、发表文章基本功能

 - async.js 模拟ES7实现async await（通过阅读TJ大神的CO代码，虽然不难但是重要的是Idea）
 - 将之前通过回调存取数据 已用Promise重构
![123](https://raw.githubusercontent.com/karzanOnline/express-blog/master/dome1.png)

2016.09.08 更新版本将路由交于前端控制  React-router实现单页面刷新(后续将会加入React在server渲染)

 - 加入React-router （因为之前使用ejs渲染的模板 所以views改动较大。由变量直接渲染到ejs 更改为发送ajax请求获取）
 - 使用sass提取公共样式

2016.09.13 添加react动画,添加redux状态管理(已经有了雏形，待完善)

 - 引入rc-queue-anim创建react切换动画
 - 添加Pubsub.js
 - 添加redux


 2016.09.14 加入immutable 优化性能


