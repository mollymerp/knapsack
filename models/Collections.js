module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Collections", {
    collection: DataTypes.STRING,
    freezeTableName: true //prevents sequelize from adding (s) to end of table
    // ,{
    //   instanceMethods: {
    //     retrieveAll: function(onSuccess, onError) {
    //       Collections.findAll({}, {
    //         raw: true
    //       }).success(onSuccess).error(onError);
    //     }, //get all records from collections model
    //     collectionsPerUser = function(username) {
    //       ddl.collections.findAll({
    //         include: [{
    //           model: users,
    //           where: {
    //             user_name: username
    //           }
    //         }]
    //       }).then(function(collection) {
    //         console.log(collection);
    //       });
    //     } // get collections per user by joining to users table
    //   }
    // }
  })
};