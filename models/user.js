module.exports = (sequelize, DataTypes) => {
	const user = sequelize.define('user', {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			comment: '이메일 사용자 ID처럼 사용됨'
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		tel: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		birth: {
			type: DataTypes.DATEONLY,
			allowNull: true,
		},
		sex: {
			type: DataTypes.ENUM,
			values: ['M', 'F'],
			allowNull: false,
		},
		role: {
			type: DataTypes.ENUM,
			values: ['Admin', 'Seller', 'Company', 'User'],
			defaultValue: 'User',
			comment: '사용자 역활'
		},
		createdIp: {
			type: DataTypes.STRING,
			allowNull: false,
			comment: '생성시점 IP'
		},
		connectedAt: {
			type: DataTypes.DATE,
			allowNull: true,
			comment: "로그인 시간"
		},
		connectedIp: {
			type: DataTypes.STRING,
			allowNull: true,
			comment: '로그인시 IP'
		}
	}, {
		freezeTableName: true,
	});

	user.associate = function (models) {
		// associations can be defined here
		console.log('associate', models)
	};
	return user;
};