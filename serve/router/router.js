const Router = require('koa-router')

const router = new Router()

router.get('/api/get', (ctx, next) => {
    console.log(ctx.request)
    ctx.body = '123'
})

module.exports = router
