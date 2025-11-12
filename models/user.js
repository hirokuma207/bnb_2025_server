module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
  }, {
    // Other model options go here
    freezeTableName: true, // 테이블명 단수 고정
  });
  user.associate = function(models) {
    // associations can be defined here
    // console.log('associate:', models)
  };
  return user;
};