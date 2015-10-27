module.exports = function(sequelize, DataTypes) {
	return sequelize.define("users", {
		user_name: DataTypes.STRING,
		password: DataTypes.STRING
	}, {
		freezeTableName: true, //name table exactly as defined - do not add (s)
		timestamps: false, // no created or update dates
		underscored: true //automatically attributes should be named with _
	});
};

//real query required
// instanceMethods: {
//   retrieveAll: function(onSuccess, onError) {
//       Author.findAll({}, {
//         raw: true
//       }).success(onSuccess).error(onError);
//     } // get all records from users model
// }