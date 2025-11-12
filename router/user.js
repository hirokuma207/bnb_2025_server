const Router = require('@koa/router');
const router = new Router();

router.get('/', (ctx, next) => {
	// DB 에 연결해서 사용자 목록 가져와서 줘야 겠지만!
	ctx.body = {
		rows: '사용자 목록 배열!'
	};
});

router.get('/:id', (ctx, next) => {
	const id = ctx.params.id;
	console.log("userID:", id)
	ctx.body = {
		row: '유저 정보',
		id,
	};
});

router.post('/', (ctx, next) => {
	const payload = ctx.request.body;
	ctx.body = {
		row: '유저 회원가입',
		payload,
	};
});

router.put('/:id', (ctx, next) => {
	const id = ctx.params.id;
	const payload = ctx.request.body;
	ctx.body = {
		row: '유저 정보 수정',
		id,
		payload,
	};
});

router.delete('/:id', (ctx, next) => {
	const id = ctx.params.id;
	ctx.body = {
		row: '유저 정보 삭제',
		id,
	};
});


module.exports = router;
