require('dotenv').config();
const fs = require('fs');
const Koa = require('koa');
const { koaBody } = require('koa-body');

const app = new Koa();

// 전역 라우터 래핑 함수
const API_CALL = require('./lib/API_CALL');
global.$API_CALL = API_CALL;

// DB 연결
const connectSequelize = require('./plugins/connectSequelize');
global.$DB = connectSequelize(__dirname + '/models');

global.$UPLOAD_PATH = process.env.UPLOAD_PATH;
if (!fs.existsSync($UPLOAD_PATH)) {
	fs.mkdirSync($UPLOAD_PATH, { recursive: true })
}

// logger
app.use(async (ctx, next) => {
	await next();
	const rt = ctx.response.get('X-Response-Time');
	console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set('X-Response-Time', `${ms}ms`);
});


const ipv4 = require('./middlewares/ipv4');
app.use(ipv4);

app.use(koaBody({
	multipart: true,
	json: true,
})); // 코아 바디 파서

const KoaAutoRouter = require('./KoaAutoRouter');
KoaAutoRouter(app, '/router', "");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Listen at http://localhost:${PORT}`);
});