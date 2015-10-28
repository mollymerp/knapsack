var express = require("express");
var bodyParser = require("body-parser"); // request body parsing middleware (json, url)
var morgan = require("morgan"); // log requests to the console
var cookieParser = require("cookie-parser"); // parses cookie header, populate req.cookies
var session = require("express-session");
var sequelize = require("sequelize"); // promise based ORM for SQL
var db = require("../config/database.js"); // connect to database
var ddl = require("../config/ddl.js"); // create database tables
var path = require("path");
var _ = require('underscore');
var bcrypt = require('bcrypt-nodejs'); // hashing passwords
var Promise = require('bluebird'); // for promisification

var app = express(); // create our app w/ express
var port = process.env.PORT || 3000;
var ip = "127.0.0.1"; // localhost



/************************************************************/
// Initialize Database
/************************************************************/
var Users = db.import(path.join(__dirname, "../models/Users"));
var Collections = db.import(path.join(__dirname, "../models/Collections.js"));
var Books = db.import(path.join(__dirname, "../models/Books.js"));

Users.hasMany(Collections);
Collections.belongsToMany(Books, {
  through: "collections_to_books"
});
Books.belongsToMany(Collections, {
  through: "collections_to_books"
});


db.sync()
  .then(function(err) {
    console.log('Database is up and running');
  }, function(err) {
    console.log('An error occurred while creating the database:', err);
  });

/************************************************************/


/************************************************************/
// CONFIGURE SERVER
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

//**************************************************************
// TEST DATA - dummyCollections is used to test that api/collections
// GET REQUEST is working. 
//**************************************************************
var dummyCollections = ["bestsellers", "wine", "football", "cars", "forFriends", "boats", "shoes"];


// Returns all collections for a given user
app.get("/api/collections", function(req, res) {

  console.log("IM IN api/collections GET Request");

  // res.send("Coming soon...data from the database: ", users);
  res.send(JSON.stringify(dummyCollections));
});
 
// Add a collection to a users list of collections
// Note: The problem is we're still not capturing the 
//       users name to query against the database....
app.post("/api/collections", function(req, res) {
  var collection = req.body.collection;
  console.log("Im in api/collections POST request: ", collection);
  var dummyCollection = dummyCollections.push(collection)
  res.send(JSON.stringify(dummyCollections));
});


// For a logged in user, give back all books for a specific collection
app.get("/api/collection:collection", function(req, res) {
  var collectionName = req.params.collection;
  console.log("IM THE REQUEST OBJECT FROM API/COLLECTION: ", req.originalUrl);
  // console.log("Im in api/collection GET REQUEST", "Req.body: ", req.body, "Req.params: ", req.params, "Req.data: ", req.data);
  res.send("COMING SOON...DATA");
});

// For a logged in user, add a book to a specified collection
app.post("/api/collection", function(req, res) {
  console.log("Im in api/collection", req.body);
});

// Send a collection name, book name, to another user.
app.post("api/share", function(req, res) {
  console.log("IM in api/share", req.body);
});

/************************************************************/


/************************************************************/
// AUTHENTICATION ROUTES
/************************************************************/
app.post("/api/signin", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  ddl.users.findOne({
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

  ddl.users.findOne({
    where: {
      user_name: username
    }
  }).then(function(user) {
    if (!user) {
      var hashing = Promise.promisify(bcrypt.hash); // hashing is a promisified version of bcyrpt hash
      var hashPass = hashing(password, null, null).
      then(function(hash) {
        ddl.users.create({
          user_name: username,
          password: hash
        }).then(function(user) {
          req.session.regenerate(function() {
            req.session.user = {
              user_name: username
            };
            res.status(201);
          });
        });
      });
    } else {
      console.log("User: " + username + " already exists");
      res.status(200).send("Username is already taken");
    }
  });
});
/************************************************************/





/************************************************************/
// HANDLE WILDCARD ROUTES - IF ALL OTHER ROUTES FAIL
/************************************************************/
app.get("*", function(req, res) {
  console.log("Im the wildcare route handler.....", "Heres a console.log of the req object: ", req.body, "Heres the req url: ", req.url, "Im req.params: ", req.params);
})



/************************************************************/
// START THE SERVER
/************************************************************/
app.listen(port);
console.log("Knapsack is listening on port " + port);
