function getIpv4(ip) {
	//::ffff:127.0.0.1
	// : 로 나눠서 배열로 만들면 마지막 배열에 ip있다.
	const arr = ip.split(":");
	return arr[arr.length-1];
}

module.exports = async (ctx, next) => {
	// headers['x-forwarded-for'] 는 NginX에서 해더에 넣은 실제 접속 IP
	ctx.ipv4 = ctx.request.headers['x-forwarded-for'] ||  getIpv4(ctx.ip);
	await next();
}