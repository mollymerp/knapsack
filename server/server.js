var express = require('express');
var bodyParser = require('body-parser'); // pull reqs from HTML POST
var morgan = require('morgan');  // log requests to the console
var db = require('../config/database'); 
var cookieParser = require('cookie-parser');
var session = require('express-session');




var app = express(); // create our app w/ express
var port = process.env.PORT || 3000;
var ip = "127.0.0.1";

/************************************************************/
// CONFIGURE SERVER
/************************************************************/

////////////////////////////////////////////////
// PLACEHOLDER FOR DB CONNECTION
////////////////////////////////////////////////


// Express uses template engine to parse front-end scripts. Can parse HTML, EJS, JADE, ect
app.set('view engine', 'ejs');
// Tells Express from where to deliver front end views
app.set('views', __dirname + '/../client/views')
// Logger for dev environment
app.use(morgan('dev'));
// Body parser is middleware to handle POST data in Express 4
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
// Cookie parser is middleware to handle cookies.
app.use(cookieParser());
// Express sessions handles sessions in Express
app.use(session({secret: '$#%!@#@@#SSDASASDVV@@@@', 
                 key: 'sid',
                 saveUninitialized: true,
                 resave: true}));
// serve up static files
app.use(express.static(__dirname + '/../client'));


/************************************************************/
// ROUTE HANDLING
/************************************************************/

// GET AN INSTANCE OF ROUTER
var router  = express.Router();

// Home page route (http://localhost:3000)
router.get('/', function(req, res) {
  res.render("index");
});

app.post('/', function(req, res) {
  res.send("I got a POST Request from the home page");
});

// 
// app.post('/login', function(req, res) {
//   var name = req.body.name;
//   var username = req.body.username;
//   var email = req.body.email;
//   console.log("Name: ", name, "Username: ", username, "Email: ", email);
// });

// app.post('/signin', function(req, res) {
//   console.log(req);
// });
// apply the routes to our application
app.use('/', router);

app.post("/api/signin", function(req, res) {
  console.log(req.body);
});

app.post("/api/signup", function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  console.log("Username: ", username, "Password: ", password);
});


/************************************************************/
// AUTHENTICATION ROUTES
/************************************************************/




/************************************************************/
// HANDLE WILDCARD ROUTES - IF ALL OTHER ROUTES FAIL
// 
// 
/************************************************************/



/************************************************************/
// START THE SERVER
/************************************************************/
app.listen(3000);
console.log('Knapsack is listening on port ' + port);
