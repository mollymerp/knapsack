var express = require("express");
var bodyParser = require("body-parser"); // request body parsing middleware (json, url)
var morgan = require("morgan"); // log requests to the console

var cookieParser = require("cookie-parser"); // parses cookie header, populate req.cookies
var session = require("express-session");
var sequelize = require("sequelize"); // promise based ORM for SQL
var db = require("../config/database.js"); // connect to database
// var ddl = require("../config/ddl.js"); // create database tables
var path = require("path");
var _ = require('underscore');

var bcrypt = require('bcrypt-nodejs'); // hashing passwords
var Promise = require('bluebird'); // for promisification

var app = express(); // create our app w/ express
var port = process.env.PORT || 3000;
var ip = "127.0.0.1"; // localhost

/************************************************************/
// CONFIGURE SERVER
/************************************************************/

/************************************************************/
// Initialize Database
/************************************************************/

var User = db.import(path.join(__dirname, "../models/Users"));
var Collection = db.import(path.join(__dirname, "../models/Collections.js"));
var Book = db.import(path.join(__dirname, "../models/Books.js"));

User.hasMany(Collection);
Collection.belongsToMany(Book, {
  through: "collections_to_books"
});
Book.belongsToMany(Collection, {
  through: "collections_to_books"
});

db.sync()
  .then(function(err) {
    console.log('Database is up and running');
  }, function(err) {
    console.log('An error occurred while creating the database:', err);
  });

/************************************************************/

// Express uses template engine to parse front-end scripts. Can parse HTML, EJS, JADE, etc.
app.set("view engine", "ejs");
// Tells Express from where to deliver front end views
app.set("views", __dirname + "/../client/views");

// Logger for dev environment
app.use(morgan("dev"));

// Body parser is middleware to handle POST data in Express 4
app.use(bodyParser.urlencoded({
  "extended": "true"
}));

app.use(bodyParser.json());
// Cookie parser is middleware to handle cookies sent from the client.
app.use(cookieParser());
// Express sessions handles sessions in Express
app.use(session({
  secret: "$#%!@#@@#SSDASASDVV@@@@",
  key: "sid",
  saveUninitialized: true,
  resave: true
}));

// serve up static files
app.use(express.static(__dirname + "/../client"));


/************************************************************/
// ROUTE HANDLING
/************************************************************/

var router = express.Router();

// local dev route (http://localhost:3000)
router.get("/", function(req, res) {
  res.render("index");
});

app.post("/", function(req, res) {
  res.send("I got a POST Request from the home page");
});


// apply the routes to our application
app.use("/", router);

app.post("/api/signin", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

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
            res.status(201).send("Succesfully signed in");
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

app.post("/api/signup", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  User.findOne({
    where: {
      user_name: username
    }
  }).then(function(user) {
    if (!user) {
      var hashing = Promise.promisify(bcrypt.hash); // hashing is a promisified version of bcyrpt hash
      var hashPass = hashing(password, null, null).
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
            res.status(201).send("Succesfully signed up user: " + username);
          });
        });
      });
    } else {
      console.log("User: " + username + " already exists");
      res.status(200).send("Username is already taken");
    }
  });
});



//**************************************************************
// TEST DATA - dummyCollections is used to test that api/collections
// GET REQUEST is working. 
//**************************************************************
var dummyCollections = ["bestsellers", "wine", "football", "cars", "forFriends", "boats", "shoes"];


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
});


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

app.post("/api/collection/instance", function(req, res) {
  console.log(req.body);
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
          res.status.send("succesfully shared book");
        });
    });
  });
});

app.get("/api/friends", function(req, res) {
  User.findAll({
    limit: 5
  }).then(function(users) {
    users = _.map(users, function(user) {
      return user.user_name;
    });
    res.send(users);
  });
});

/************************************************************/
// AUTHENTICATION ROUTES
/************************************************************/




/************************************************************/
// HANDLE WILDCARD ROUTES - IF ALL OTHER ROUTES FAIL
/************************************************************/




/************************************************************/
// START THE SERVER
/************************************************************/
app.listen(port);
console.log("Knapsack is listening on port " + port);
