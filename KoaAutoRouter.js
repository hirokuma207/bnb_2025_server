const Router = require('@koa/router');
const fs = require('fs');
const path = require('path');

function autoRoute(router, root, prefix) {
	// root < 디렉토리 읽어서 파일 목록을 가져온다.
	const dir = fs.readdirSync(path.join(__dirname, root), { withFileTypes: true });
	dir.forEach(p => {
		if (p.isDirectory()) { // 디렉토리면
			arguments.callee(router, `${root}/${p.name}`, `${prefix}/${p.name}`); // 재귀 호출을 한다.
		} else {
			let moduleName = '/' + p.name.replace(/\.js/g, ''); // 파일명에서 .js를 지운다.
			if (moduleName == '/index') { // 파일명이 index면 모듈이름을 지운다.
				moduleName = '';
			}
			// 라우터 경로 => 실제 연결될 파일
			console.log(`${prefix + moduleName || '/'} => ${root}/${p.name}`);
			const r = require(`.${root}/${p.name}`) // 파일 불러오고
			router.use(`${prefix}${moduleName}`, r.routes()); // router 미들웨어에 등록
		}
	})
}
/**
 * 
 * @param {Koa App} app 
 * @param {String} root 
 * @param {String} prefix 
 */
module.exports = (app, root, prefix = "") => {
	// console.log("ROOT", root);
	const router = new Router();
	// 여기서 root에 있는 js 파일을 쭉 읽어서 등록하는 함수를 하나 만들거
	autoRoute(router, root, prefix);
	app.use(router.routes()).use(router.allowedMethods())
}