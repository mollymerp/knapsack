module.exports = function(sequelize, DataTypes) {
  return sequelize.define("collections", {
    collection: DataTypes.STRING
  }, {
    freezeTableName: true, //name table exactly as defined - do not add (s)
    timestamps: false, // no created or update dates
    underscored: true //automatically attributes should be named with _
  });
};