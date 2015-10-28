module.exports = function(sequelize, DataTypes) {
	return sequelize.define("User", {
		user_name: DataTypes.STRING,
		password: DataTypes.STRING
	}, {
		timestamps: false, // no created or update dates
		underscored: true //automatically attributes should be named with _
	});
};
