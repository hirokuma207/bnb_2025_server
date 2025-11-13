require('dotenv').config();
// console.log(process.env); // remove this after you've confirmed it is working

const Koa = require('koa');
const { koaBody } = require('koa-body');


const app = new Koa();

// 전역 라우터 래핑 함수
const API_CALL = require('./lib/API_CALL');
global.$API_CALL = API_CALL;

// DB 연결
const connectSequelize = require('./plugins/connectSequelize');
global.$DB = connectSequelize(__dirname + '/models');

// DB 연결 테스트
// $DB.user.findAll().then(users => {
//   console.log('Users:',users);
// });


app.use(koaBody({
  multipart: true,
  json: true,
})); // 코아 바디 파서

const KoaAutoRouter = require('./KoaAutoRouter');
KoaAutoRouter(app, '/router', "");

// console.log("Server running on http://localhost:3000");

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
  console.log(`Listen at http://localhost:${PORT}`)
});

