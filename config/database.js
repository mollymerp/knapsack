var mysql = require('mysql');


var pool = mysql.createPool({
  host     : 'localhost',
  user     : '',
  password : '',
  database : 'ks_db'
});

// pool.connect = function(callback){
//   pool.getConnection(function(err, connection){
//     if (err) throw err;
//     callback(connection);
//   });
// };

pool.getConnection(function(err, connection){
  if(err){
      // connection.release();
      console.log("error: ", err);
  } else {
    console.log("Connection to mySQL successful!");
  }
});

module.exports = pool;

