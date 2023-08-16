const Koa = require('koa')
const { koaBody } = require('koa-body')
const router = require('./router/router')
const app = new Koa()
app.use(
    koaBody({
        multipart: true
    })
)

app.use(router.routes())

app.listen(1888, () => {
    console.log('http://localhost:1888')
})
