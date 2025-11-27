const bcrypt = require('bcrypt');

// 단반향 해쉬를 생성 반환
const hashPassword = async (plainPassword) => {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
	return hashedPassword;
}

// 비번과 해쉬 비교 후 true|false 반환
const comparePassword = async (plainPassword, hashedPassword) => {
	const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
	return isMatch;
}
module.exports = {
	hashPassword,
	comparePassword,
}