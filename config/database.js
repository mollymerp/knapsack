var mysql = require('mysql');
​
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'ks_db'
});
​
//Why use pool to connect to mysql:
//http://stackoverflow.com/questions/26432178/what-is-the-difference-between-mysql-createconnection-and-mysql-createpool-in-no
​
pool.connect=function(callback){
  pool.getConnection(function(err, connection){
    callback(connection);
  });
};
​
module.exports = pool;

