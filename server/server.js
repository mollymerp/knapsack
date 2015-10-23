var express = require('express');   
var bodyParser = require('body-parser'); // pull reqs from HTML POST
var morgan = require('morgan');  // log requests to the console
var db = require('../config/database'); 





var app = express();  // create our app w/ express
var port = process.env.PORT || 3000;
var ip = "127.0.0.1";

/************************************************************/
// CONFIGURE SERVER
/************************************************************/
//placeholder for connecting to DB
// db.connect()
app.use(express.static(__dirname + '/../client'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());


/************************************************************/
// ROUTE HANDLING
/************************************************************/

// GET AN INSTANCE OF ROUTER
var router  = express.Router();

// Home page route (http://localhost:3000)
router.get('/', function(req, res) {
  res.send("Im the home page");
});

// 

// apply the routes to our application
app.use('/', router);




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