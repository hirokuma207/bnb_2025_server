const viewName = 'vw_user';
const query = `SELECT id, firstName, lastName FROM user;`;

module.exports = async (sequelize, DataTypes) => {
  await sequelize.query(`DROP VIEW IF EXISTS `+ viewName);
  // await sequelize.query(`ALTER TABLE chatOnline CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci`);
  await sequelize.query('CREATE VIEW ' + viewName + ' AS ' + query);

  const vw_user = sequelize.define('vw_user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    firstNmae: DataTypes.STRING,
    lastNmae: DataTypes.STRING,
  }, {
    tableName: viewName,
    timestamps: false,
});

  return vw_user;
};