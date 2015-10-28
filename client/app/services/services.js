angular.module("knapsack.services", [])

.factory("Auth", ["$http", function($http) {
  var signUp = function(user) {
    return $http({
      method: "POST",
      url: "api/signup",
      data: user
    }).then(function succesCallback(resp) {
      console.log(resp.data);
      return resp;
    }, function errorCallback(resp) {
      // does the backend handle usernames that already exist?
      console.log(resp.status + ": failed to signup user");
      return resp;
    });
  };

  var signIn = function(user) {
    return $http({
      method: "POST",
      url: "api/signin",
      data: user
    }).then(function succesCallback(resp) {
      console.log(resp.data);
      return resp;
    }, function errorCallback(resp) {
      console.log(resp.status + ": incorrect username or password");
      return resp;
    })
  };

  return {
    signIn: signIn,
    signUp: signUp
  };

}])


.factory("Collections", ["$http", function($http) {

    // get all collection names (ex. bestsellers, wine, ...)
    var getAll = function() {
      return $http({
        method: "GET",
        url: "api/collections"
      }).then(function succesCallback(resp) {
        return resp.data;
      }, function errorCallback(resp) {
        console.log(resp.status + ": failed fetching from server");
      });
    };

    // add a new collection (ex. boats) to the current user
    var addCollection = function(collection) {
      return $http({
        method: "POST",
        url: "api/collections",
        data: JSON.stringify({
          collection: collection
        })
      }).then(function succesCallback(resp) {
        console.log(resp.status + ": succesfully added Collection");
      }, function errorCallback(resp) {
        console.log(resp.status + ": failed adding Collection");
      });
    };

    //remove a collection from the collection list for current user
    var removeCollection = function(collection) {
      return $http({
        method: "DELETE",
        url: "api/collections",
        data: JSON.stringify(collection)
      }).then(function succesCallback(resp) {
        console.log(resp.status + ": succesfully deleted Collection");
      }, function errorCallback(resp) {
        console.log(resp.status + ": failed deleting Collection");
      });
    };

    return {
      getAll: getAll,
      addCollection: addCollection,
      removeCollection: removeCollection
    };

  }])
  .factory("Contents", ["$http", function($http) {
    //Molly's NYTimes Bestsellers API key / URI.
    //http://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=b2f850985c69c53458eac07ce2f7a874%3A7%3A65642337

    var getNytimes = function() {
      return $http({
          method: "GET",
          url: "http://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=b2f850985c69c53458eac07ce2f7a874%3A7%3A65642337"
        })
        .then(function(resp) {
          return resp.data.results;
        })
    };

    var getBooks = function(collection) {
      return $http({
          method: "GET",
          url: "/api/collection",
          data: JSON.stringify({
            collection: collection
          })
        })
        .then(function succesCallback(resp) {
          return resp.data;
        }, function errorCallback(resp) {
          console.log(resp.status + ": failed loading books for collection " + collection);
        });
    };

    var addBook = function(collection, book) {
      return $http({
          method: "POST",
          url: "/api/collection",
          data: JSON.stringify({
            collection: collection,
            book: book
          })
        })
        .then(function succesCallback(resp) {
          console.log("succesfully saved book into: " + collection);
        }, function errorCallback(resp) {
          console.log(resp.status + ": failed adding book to collection");
        });
    };

    var removeBook = function(collection, book) {
      return $http({
          method: 'DELETE',
          url: "/api/collection",
          data: JSON.stringify({
            collection: collection,
            book: book
          })
        })
        .then(function succesCallback(resp) {
          console.log("succesfully deleted book from: " + collection);
        }, function errorCallback(resp) {
          console.log("failed deleting book from: " + collection);
        });
    };

    var shareBook = function(collection, book, user) {
      return $http({
          method: "POST",
          url: "/api/share",
          data: JSON.stringify({
            collection: collection,
            book: book,
            user: user
          })
        })
        .then(function succesCallback(resp) {
          console.log("succesfully shared book to user: " + user);
        }, function errorCallback(resp) {
          console.log(resp.status + ": failed sharing book with user: " + user);
        });
    };


    var getFriends = function() {
      return $http({
          method: "GET",
          url: "/api/friends"
        })
        .then(function succesCallback(resp) {
          return resp.data;
        }, function errorCallback(resp) {
          console.log(resp.status + ": failed loading friends");
        });
    };


    return {
      getBooks: getBooks,
      addBook: addBook,
      removeBook: removeBook,
      getNytimes: getNytimes,
      getFriends: getFriends,
      shareBook: shareBook
    };

  }])
