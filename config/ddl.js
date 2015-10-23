//build tables

var db = require("./database.js");
var Sequelize = require("Sequelize");

var ddl = {};

ddl.users = db.define("users", {

  user_name: {
    type: Sequelize.STRING,
    description: Sequelize.TEXT
  },

  password: {
    type: Sequelize.STRING,
    description: Sequelize.TEXT
  },

  freezeTableName: true
  //prevents sequelize from adding (s) to end of table
});


ddl.collections = db.define("collections", {

  collection: {
    type: Sequelize.STRING,
    description: Sequelize.TEXT
  },

  freezeTableName: true

});

module.exports = ddl;
