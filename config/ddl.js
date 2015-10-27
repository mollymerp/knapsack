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

  // instanceMethods: {
  //   retrieveAll: function(onSuccess, onError) {
  //     collections.findAll({}, {raw:true})
  //                .sucess(onSuccess).error(onError);
  //   }
  // }

});

ddl.books = db.define("books", {

  title: {
    type: Sequelize.STRING,
    description: Sequelize.TEXT
  },

  author: {
    type: Sequelize.STRING,
    description: Sequelize.TEXT
  },

  freezeTableName: true

});



///Set Up Relationships
ddl.users.hasMany(ddl.collections, {as: 'collection'});
ddl.collections.belongsToMany(ddl.books, {through : 'collections_to_books'});
ddl.books.belongsToMany(ddl.collections, {through : 'collections_to_books'});

module.exports = ddl;

