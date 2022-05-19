import Koa from 'koa'
import koajwt from 'koa-jwt'

import errorHandel from './utils/error.js'
import socketIo from './utils/socket/index.js'
import initDB from './config/db/initDB.js'
import {koaBody,koaStatic }  from './utils/koaBody-koaStatic.js'
import process_test from './utils/process_test/index.js'
import node_test from './utils/node_test_api/index.js'

// 接口
import loginRouter from './router/login/index.js'

const app = new Koa()
const PORT = 10086 ;

// 创建服务
const httpServer = socketIo(app)

try {
  // 初始化数据库
  initDB()
  process_test()
  node_test()
} catch (error) {
  console.log('error', error)
}

// 访问静态文件
app.use(koaStatic);
// 文件上传
app.use(koaBody);

// 从url、body 或者 cookie 中获取 token
app.use(async (ctx, next) => {
  // url，body 的 token
  let params = Object.assign({}, ctx.request.query, ctx.request.body);
  // 请求头的 token
  let token = ctx.request.header && ctx.request.header.authorization?ctx.request.header.authorization:(params.token?params.token:null)
   // cookie 的token
  if(!token) {
    token = ctx.cookies.get('token') || null;
  }
  // 设置头部
  ctx.request.header.Authorization = `Bearer ${token}`;
  await next();
})

// token校验 注意：放在路由前面
app.use(koajwt({
  secret: 'Gopal_token'
}).unless({ // 配置白名单
  // path：不需要鉴权的路由（开放访问的路由）。
  path: ['/register','/login']
}))

app.use(loginRouter.routes(),loginRouter.allowedMethods())// 允许http请求的所有方法

// 错误监听
app.use((ctx, next) => errorHandel(ctx, next))

httpServer.listen(PORT,() => {
  console.log(`('********************启动成功,${ "http://127.0.0.1"}:${PORT}********************`);
});