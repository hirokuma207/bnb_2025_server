module.exports = (sequelize, DataTypes) => {
	const files = sequelize.define('files', {
		userId: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		boardName: {
			type: DataTypes.STRING,
			allowNull: true,
			comment: '게시판 테이블명 등 용도에 맞게 사용'
		},
		boardId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			comment: '게시물 ID'
		},
		type: {
			type: DataTypes.STRING,
			allowNull: true,
			comment: '파일 구분, 용도에 따라 사용'
		},
		fileName: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '저장 파일명',
		},
		displayName: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '표기 파일명',
		},
		mimetype: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		size: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		ex_0: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		ex_1: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		ex_2: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		ex_3: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		ex_4: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		ex_5: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		ex_6: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		ex_7: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		ex_8: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		ex_9: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	}, {
		freezeTableName: true,
	});
	files.associate = function (models) {
		// associations can be defined here
	};
	return files;
};