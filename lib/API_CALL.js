module.exports = function (fn) {
	return async function (ctx, next) {
		try {
			ctx.body = {
				success: true,
				data: await fn(ctx, next),
			}
		} catch (e) {
			ctx.body = {
				success: false,
				data: e.message,
			}
		}
	}
}