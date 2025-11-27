const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const sleep = require('../lib/sleep');

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
// console.log('DB_INFO',DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE);
module.exports = function (modelPath) {
	console.log("model path", modelPath);
	const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
		host: DB_HOST,
		dialect: 'mysql',
		timezone: '+09:00',
		dialectOptions: {
			charset: "utf8mb4",
			dateStrings: true,
			typeCast: true
		},
		define: {
			timestamps: true
		},
		logging: false,
	});

	const db = {}
	// 경로에서 js 파일만 로드한다.
	fs.readdirSync(modelPath)
		.filter(file => file.slice(-3) == '.js')
		.forEach(file => {
			const model = require(path.join(modelPath, file))(sequelize, DataTypes);
			db[model.name] = model;
			console.log("DB model", model);
		}
		)

	// 각 모델의 관계 함수를 실행 한다.
	Object.keys(db).forEach(modelName => {
		if (db[modelName].associate) {
			db[modelName].associate(db);
		}
	})

	const viewPath = path.join(modelPath, 'views');
	if (fs.existsSync(viewPath)) {
		fs.readdirSync(viewPath)
			.filter(file => file.slice(-3) == '.js')
			.forEach(async file => {
				while (true) {
					try {
						const model = await require(path.join(viewPath, file))(sequelize, DataTypes);
						db[model.name] = model;
						console.log("DB view", model);
						break;
					} catch (e) {
						// 뷰를 생성 못하면...
						// 약간의 시간을 기다리게 할껀데
						await sleep(100);
					}
				}
			})
	}

	sequelize.sync({ alter: true });

	db.select = async (query, values=[]) =>{
		return await sequelize.query(query, {
			replacements: values,
			type: Sequelize.QueryTypes.SELECT
		})
	}

	db.sequelize = sequelize;
	
	return db;
}
