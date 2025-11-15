const pwUtil = require('../../lib/pwUtil');
const fs = require('fs');
const path = require('path');

module.exports = async (payload, photo, createdIp) => {
  
  payload.createdIp = createdIp;
  //비밀번호 암호화
  payload.password = await pwUtil.hashPassword(payload.password);

  const t = await $DB.sequelize.transaction();
  try {


  // 사용자 정보 DB 저장
  const user = await $DB.user.create(payload, { transaction: t });

  // photo 실제 경로에 저장을 합시다.
  // TODO: 파일 저장 함수 따로 빼자.
  const uploadPath = $UPLOAD_PATH + '/member';
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const ext = path.extname(photo.originalFilename).toLowerCase();
  const fileName = photo.newFilename + ext;
  fs.writeFileSync(
    path.join(uploadPath, fileName), // 목적지
    fs.readFileSync(photo.filepath) // 원본
  )

  // DB 저장 객체
  const filePayload = {
    userId : user.id, 
    boardName: 'member',
    type: 'photo',
    fileName: fileName,
    displayName: photo.originalFilename,
    mimetype: photo.mimetype,
    size: photo.size,
  }

  const file = await $DB.files.create(filePayload, { transaction: t });

  await t.commit ();

  return {
    user,
    // payload,
    // photo,
    // filePayload,
    file,
  }
  }catch(e) {
  // TODO: 파일 업로드 되었다면 삭제 해야 함.
   await t.rollback();
   console.log("롤백");
   throw e; 
    
  }
}