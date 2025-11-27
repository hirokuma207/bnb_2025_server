const fs = require('fs');
const path = require('path');

// file 객체에서 저장파일명을 가져온다.
const getFileName = (file) => {
	const ext = path.extname(file.originalFilename).toLowerCase();// 확장자를 구함
	const fileName = file.newFilename + ext; // 저장할 파일명 + 확장자
	return fileName;
}

// 폴더 지정하고 file객체로 파일을 쓴다.
const write = (folder, file) => {
	const uploadPath = $UPLOAD_PATH + folder;

	// 업로드 경로가 있는지 보고 없다면 생성한다.
	if (!fs.existsSync(uploadPath)) {
		fs.mkdirSync(uploadPath, { recursive: true });
	}
	const fileName = getFileName(file); // 저장할 파일명 + 확장자
	const filePath = path.join(uploadPath, fileName) // 실제 저장될 경로

	try {
		fs.writeFileSync(
			filePath, // 목적지
			fs.readFileSync(file.filepath) // 원본
		)
		// file DB에 관련된 파일 객체를 반환
		return {
			fileName: fileName,
			displayName: file.originalFilename,
			mimetype: file.mimetype,
			size: file.size,
		};
	} catch (e) {
		console.error(e);
		throw new Error("파일 기록에 실패했습니다.")
	}
}

// 폴더 지정하고 fileName에 해당하는 파일을 삭제한다.
const remove = (folder, fileName) => {
	const uploadPath = $UPLOAD_PATH + folder;
	const filePath = path.join(uploadPath, fileName)
	// 파일이 존재 하지 않다면 삭제할 필요가 없음
	if (!fs.existsSync(filePath)) {
		return true;
	}

	try {
		fs.unlinkSync(filePath);
		return true;
	} catch (e) {
		console.error(e);
		throw new Error("파일 삭제시 오류가 발생했습니다.")
	}
}

module.exports = {
	getFileName, 
	write, 
	remove,
}