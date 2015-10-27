angular.module("knapsack.services", [])

  .factory("Auth", ["$http", function($http){
    var signUp = function (user){
      $http({
        method: "POST",
        url: "api/signup",
        data: user
      }).then(function succesCallback(resp){
        return resp;
      }, function errorCallback(resp){
        // does the backend handle usernames that already exist?
        console.log(resp.status + ": failed to signup user");
        return resp;
      });
    };

    var signIn = function (user){
      $http({
        method: "POST",
        url: "api/signin",
        data: user
      }).then(function succesCallback(resp){
        return resp;
      }, function errorCallback(resp){
        console.log(resp.status + ": incorrect username or password");
        return resp;
      })
    };

    return {
      signIn: signIn,
      signUp: signUp
    } 

  }])


  .factory("Collections", ["$http", function($http) {

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

    var removeCollection = function(collection) {
      return $http({
        method: "DELETE",
        url: "api/collections",
        data: collection
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


    var getContent = function(collection) {
      return $http({
          method: "GET",
          url: "/api/collection",
          data: JSON.stringify({
            collection: collection
          })
        })
        .then(function succesCallback(resp) {
          return JSON.parse(resp.data);
        }, function errorCallback(resp) {
          console.log(resp.status + ": failed loading content for collection " + collection);
        });
    };

    var addContent = function(collection, content) {
      return $http({
          method: "POST",
          url: "/api/collection",
          data: JSON.stringify({
            collection: collection,
            content: content
          })
        })
        .then(function succesCallback(resp) {
          console.log("succesfully saved book into: " + collection);
        }, function errorCallback(resp) {
          console.log(resp.status + ": failed adding content to collection");
        });
    };

    //save this one for later
    var removeContent = function(content) {
      return $http({
          method: 'DELETE',
          url: "/api/collections/" + "name of collection",
          data: content // should probably be a book title or something similar
        })
        .then(function(resp) {
          console.log("succesfully deleted book from: " + "name of collection");
        });
    };

    var shareBook = function(collection, book, user) {
      
    }



    return {
      getContent: getContent,
      addContent: addContent,
      removeContent: removeContent,
      getNytimes: getNytimes
    };

  }])
