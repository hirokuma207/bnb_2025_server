const Router = require('@koa/router');
const router = new Router();

router.get('/', ctx=>{
	ctx.body = 'GET auth/board.js'
})

module.exports = router;