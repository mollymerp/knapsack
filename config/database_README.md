//sqlLite Installation Directions :

1 brew install sqlite (if not loaded)
2 npm install node-gyp -g //npm sqlite3 requires this
3 npm install sqlite3 —save


//Common sqllite3 commands

1 sqlite3 db.sqlite //open db
2 select * from {TABLE_NAME}; // see info
3 .tables //shows all tables
4 PRAGMA table_info(TABLE_NAME); //see table properties
5 .database //show databases
5 contrl D to escape sqlite command line

//table names

1 users
2 collections
