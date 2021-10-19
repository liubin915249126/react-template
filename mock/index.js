var Koa = require('koa')
var router = require('koa-router')()
var app = new Koa()

//Koa中间件
//两个参数则第一个表示匹配对应的路由，第二个参数为async;只有一个参数表示匹配所有路由。
app.use(async (ctx)=>{
    ctx.body = '这是一个中间件'
})
app.use(async (ctx, next)=>{
    console.log(new Date())
    await next()     //当前路由匹配完成后继续向下匹配
    //匹配任何路由，如果不写next，这个路由被匹配到了就不会继续向下匹配
})


app
    .use(router.routes())  //启动路由
    .use(router.allowedMethods()) 

app.listen(9008)