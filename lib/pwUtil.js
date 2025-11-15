const bcrypt = require('bcrypt');
const saltRounds = 10;

// 단방향 해쉬를 생성 반환
const hashPassword = async(plainPassword)  => {
  const hashPassword = await bcrypt.hash(plainPassword, saltRounds);
  return hashPassword;
}

// 비번과 해쉬를 비교후 true or false  't|f 반환
const comparePassword = async(plainPassword, hashPassword) => {
  const isMatch = await bcrypt.compare(plainPassword, hashPassword);
  return isMatch;
}

module.exports = {
  hashPassword,
  comparePassword,
}