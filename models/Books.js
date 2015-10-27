module.exports = function(sequelize, DataTypes) {
	return sequelize.define("Books", {
		title: DataTypes.STRING,
		author: DataTypes.STRING,
		freezeTableName: true, //prevents sequelize from adding (s) to end of table,
		{
			instanceMethods: {
				retrieveAll: function(onSuccess, onError) {
						Author.findAll({}, {
							raw: true
						}).success(onSuccess).error(onError);
					} //get all records from books model
			}
		}
	});
}