//establish database connection

var Sequelize = require("sequelize");

var db = new Sequelize(
	"", //db
	"", //user
	"", //password
	{
  dialect : "sqlite",
  host : "localhost",
  pool: {
    max: 10,
    min:0,
    idle:10000
  },
  storage: "../data/db.sqlite"
});

module.exports = db;