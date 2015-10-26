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


// app.get("/api/collections"
// Returns all collections for a given user

SELECT users.user_name, collections.collection
FROM collections
INNER JOIN users
ON collections.userId = users.id
WHERE users.id = 1;

// DUMMY DATA TO INSERT INTO USERS TABLE
INSERT INTO users (user_name, password, createdAt, updatedAt) VALUES ("chris", "qwerty", 10/26/2015, 10/26/2015);

INSERT INTO users (user_name, password, createdAt, updatedAt) VALUES ("BATMAN", "IMBATMAN", 10/26/2015, 10/26/2015);

INSERT INTO users (user_name, password, createdAt, updatedAt) VALUES ("Captain Morgan", "ilikerun", 10/26/2015, 10/26/2015);

INSERT INTO users (user_name, password, createdAt, updatedAt) VALUES ("NattyBoh", "BohKnows", 10/26/2015, 10/26/2015);

// DUMMY DATA TO INSERT INTO COLLECTIONS TABLE
INSERT INTO collections (collection, createdAt, updatedAt, userId) VALUES ("sports", 10/26/2015, 10/26/2015, 1);

INSERT INTO collections (collection, createdAt, updatedAt, userId) VALUES ("beer", 10/26/2015, 10/26/2015, 1);

INSERT INTO collections (collection, createdAt, updatedAt, userId) VALUES ("camping", 10/26/2015, 10/26/2015, 1);

INSERT INTO collections (collection, createdAt, updatedAt, userId) VALUES ("cats", 10/26/2015, 10/26/2015, 1);