var express = require("express");
var bodyParser = require("body-parser"); // request body parsing middleware (json, url)
var morgan = require("morgan"); // log requests to the console
​
var session = require("express-session");
var db = require("../config/database.js"); // connect to database
​
var path = require("path");
var _ = require('underscore');
​
var bcrypt = require("bcrypt-nodejs"); // hashing passwords
var Promise = require("bluebird"); // for promisification
​
var app = express();
var port = process.env.PORT || 3000;
var ip = "127.0.0.1";
​
​
/************************************************************/
// Initialize Database
/************************************************************/
​
//Import Models(tables)
​
var User = db.import(path.join(__dirname, "../models/Users"));
var Collection = db.import(path.join(__dirname, "../models/Collections.js"));
var Book = db.import(path.join(__dirname, "../models/Books.js"));
​
//Relationships :
//1.User can have many Collections.
//2.Collections have a many to many relationship with Books through junction table collections_to_books
​
User.hasMany(Collection);
Collection.belongsToMany(Book, {
  through: "collections_to_books"
});
Book.belongsToMany(Collection, {
  through: "collections_to_books"
});
​
//Initialize Database
​
db.sync()
  .then(function(err) {
    console.log("Database is up and running");
  }, function(err) {
    console.log("An error occurred while creating the database:", err);
  });
​
/************************************************************/
// CONFIGURE SERVER
/************************************************************/
​
// Logger for dev environment
app.use(morgan("dev"));
​
app.use(bodyParser.json());
// Express sessions handles sessions in Express
app.use(session({
  secret: "$#%!@#@@#SSDASASDVV@@@@",
  key: "sid",
  saveUninitialized: true,
  resave: true
}));
​
// serve up static files
app.use(express.static(__dirname + "/../client"));

/************************************************************/
// AUTHENTICATION ROUTES
/************************************************************/
​
//Signin post request
​
app.post("/api/signin", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
​
  User.findOne({
    where: {
      user_name: username
    }
  }).then(function(user) {
    if (user) {
      bcrypt.compare(password, user.password, function(err, success) {
        if (err) return console.log("Error ocurred while comparing password: ", err);
        if (success) {
          req.session.regenerate(function() {
            req.session.user = {
              user_name: username
            };
            res.status(201).send({
              id: req.session.id,
              user: req.session.user.user_name
            });
          });
        } else {
          res.status(200).send("Wrong password");
        }
      });
    } else {
      res.status(200).send("User with username: " + username + " does not exist");
    }
  });
});
​
​
//Signup post request
//Note : recommended and bestsellers are created when a new user signs up
app.post("/api/signup", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
​
  User.findOne({
    where: {
      user_name: username
    }
  }).then(function(user) {
    if (!user) {
      var hashing = Promise.promisify(bcrypt.hash); // hashing is a promisified version of bcyrpt hash
      hashing(password, null, null).
      then(function(hash) {
        User.create({
          user_name: username,
          password: hash
        }).then(function(user) {
          req.session.regenerate(function() {
            req.session.user = {
              user_name: username
            };
            Collection.create({
              collection: "recommended"
            }).then(function(collection) {
              user.addCollection(collection);
            });
            Collection.create({
              collection: "bestsellers"
            }).then(function(collection) {
              user.addCollection(collection);
            });
            res.status(201).send({
              id: req.session.id,
              user: req.session.user.user_name
            });
          });
        });
      });
    } else {
      console.log("User: " + username + " already exists");
      res.status(200).send("Username is already taken");
    }
  });
});
​
​
app.post("/api/logout", function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      console.error(err);
      res.status(201).send("unable to logout user")
    } else {
      console.log("logout success");
      res.status(200).send("logout success");
    }
  });
});
​
//**************************************************************
// GET and POST Requests
//**************************************************************
​
//Following GET request displays all the collections for a given user
//getCollection() function uses established relationship between user and collections to return all collections
//Note : _.map function is required to return array of all collections which can be rendered
//Unit Test : Pass (10/28/2015)
​
app.get("/api/collections", function(req, res) {
  User.findOne({
    where: {
      user_name: req.session.user.user_name
    }
  }).then(function(user) {
    user.getCollections().then(function(collections) {
      collections = _.map(collections, function(item) {
        return item.collection;
      });
      res.send(collections);
    });
  });
​
});
​
//POST request CREATE new collection by using req information
//Unit Test : Pass (10/28/2015)
​
app.post("/api/collections", function(req, res) {
  Collection.create({
    collection: req.body.collection
  }).then(function(collection) {
    User.findOne({
      where: {
        user_name: req.session.user.user_name
      }
    }).then(function(user) {
      user.addCollection(collection);
      res.status(201).send("succesfully added collection");
    });
  });
});
​
// POST request to GET all books within a collection instance e.g. /api/collection/bestsellers
// Unit Test : Pass (10/28/2015)
// We have to use POST here, because GET requests do not allow data(collection name) to be sent with a request.
​
app.post("/api/collection/instance", function(req, res) {
  User.findOne({
    where: {
      user_name: req.session.user.user_name
    }
  }).then(function(user) {
    var user_id = user.id;
    Collection.findOne({
      where: {
        collection: req.body.collection,
        user_id: user_id
      }
    }).then(function(collection) {
      if (collection) {
        collection.getBooks().then(function(books) {
          books = _.map(books, function(item) {
            return {
              title: item.title,
              author: item.author
            };
          });
          res.send(books);
        });
      } else {
        res.send([]);
      }
    });
  });
});
​
//POST request to CREATE new books within a collection instance e.g. /api/collection/collectionname
//Unit Test : Pass (10/28/2015)
​
app.post("/api/collection", function(req, res) {
  User.findOne({
    where: {
      user_name: req.session.user.user_name
    }
  }).then(function(user) {
    var user_id = user.id;
    Collection.findOne({
      where: {
        collection: req.body.collection,
        user_id: user_id
      }
    }).then(function(collection) {
      Book.create(req.body.book)
        .then(function(book) {
          collection.addBook(book);
          res.status(201).send("succesfully added book");
        });
    });
  });
});
​
app.post("/api/collection/delete", function(req, res) {
  // NY Times bestsellers arent stored in the database, theyre an
  // an API call (not stored in the DB). If you try to delete a book 
  // from the bestsellers collection, the server will crash. This 
  // if statement prevents that from happening.
  if(req.body.collection === "bestsellers") {
    console.log("Cant delete from bestsellers");
    return;
  }
  User.findOne({
    where: {
      user_name: req.session.user.user_name
    }
  }).then(function(user) {
    var user_id = user.id;
    Collection.findOne({
      where: {
        collection: req.body.collection,
        user_id: user_id
      }
    }).then(function(collection) {
      collection.getBooks({
        where: {
          title: req.body.book.title
        }
      }).then(function(books) {
        books[0].destroy().then(function() {
          console.log("successfully deleted book");
          res.send("deleted book");
        })
      });
    });
  });
});
​
//POST request to SHARE book to another user and places book in Recommended collection
//Unit Test : Pass (11/2/2015)
​
app.post("/api/share", function(req, res) {
  User.findOne({
    where: {
      user_name: req.body.user
    }
  }).then(function(user) {
    var user_id = user.id;
    Collection.findOne({
      where: {
        collection: "recommended",
        user_id: user_id
      }
    }).then(function(collection) {
      Book.create(req.body.book)
        .then(function(book) {
          collection.addBook(book);
          res.send("succesfully shared book");
        });
    });
  });
});
​
//GET request to get users from the database
//Unit Test : Pass (11/2/2015)
​
app.get("/api/friends", function(req, res) {
  User.findAll().then(function(users) {
    users = _.map(users, function(user) {
      return user.user_name;
    });
    res.send(users);
  });
});
​
/************************************************************/
// HANDLE WILDCARD ROUTES - IF ALL OTHER ROUTES FAIL
/************************************************************/
​
/************************************************************/
// START THE SERVER
/************************************************************/
app.listen(port);
console.log("Knapsack is listening on port " + port);