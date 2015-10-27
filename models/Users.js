module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Users", {
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
    freezeTableName: true, //prevents sequelize from adding (s) to end of table
    {
      instanceMethods: {
        retrieveAll: function(onSuccess, onError) {
            Author.findAll({}, {
              raw: true
            }).success(onSuccess).error(onError);
          } // get all records from users model
      }
    }
  })
};