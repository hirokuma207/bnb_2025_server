const pwUtil = require('../../lib/pwUtil');
const fileUtil = require('../../lib/fileUtil');

module.exports = async (payload, photo, createdIp) => {

	payload.createdIp = createdIp;
	// 비밀번호 암호화
	payload.password = await pwUtil.hashPassword(payload.password);

	const t = await $DB.sequelize.transaction();

	try {
		// 사용자 정보 DB 저장
		const user = await $DB.user.create(payload, { transaction: t });

		// 사진이 업로드 되었으면 파일 저장후 DB에 저장
		if (photo) {
			// DB 저장 객체
			const filePayload = {
				userId: user.id,
				boardName: 'member',
				type: 'photo',
				...fileUtil.write('/member', photo),
			}
			// console.log(filePayload);
			await $DB.files.create(filePayload, { transaction: t });
		}
		
		await t.commit();
		return true;
	} catch (e) {
		await t.rollback();
		fileUtil.remove('/member', fileUtil.getFileName(photo))
		throw e;
	}
}