angular.module("knapsack.services", [])
  .factory("Collections", ["$http", function($http) {

    var collects = ["bestsellers", "wine", "football", "cars", "forFriends", "boats"];

    var getAll = function() {
      return $http({
        method: "GET",
        url: "api/collections"
      }).then(function succesCallback(resp) {
        console.log(resp.status + ": succesfully fetched collections");
        return resp.data;
      }, function errorCallback(resp) {
        console.log(resp.status + ": failed fetching from server");
      });
      //switch between faked data and real data
      // return collects;
    };

    var addCollection = function(collection) {
      // collects.push(collection);
      return $http({
        method: "POST",
        url: "api/collections",
        data: {name: collection}
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
          //maybe we also need to send over the user if 
          //the server cannot identify us from the session cookie
      }).then(function succesCallback(resp) {
        console.log(resp.status + ": succesfully deleted Collection");
      }, function errorCallback(resp) {
        console.log(resp.status + ": failed deleting Collection");
      });
    };
    
    //maybe use angular interceptors to make success and error handling nicer
    //and also maybe parsing the response that is coming as json if needed 
    //https://docs.angularjs.org/api/ng/service/$http

    return {
      getAll: getAll,
      addCollection: addCollection,
      removeCollection: removeCollection
    };

  }])
  .factory("Contents", ["$http", function($http) {
//Molly's NYTimes Bestsellers API key / URI.
//http://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=b2f850985c69c53458eac07ce2f7a874%3A7%3A65642337

    var getNytimes = function(){
      return $http({
        method:"GET",
        url: "http://api.nytimes.com/svc/books/v3/lists.json?list-name=hardcover-fiction&api-key=b2f850985c69c53458eac07ce2f7a874%3A7%3A65642337"
      })
      .then(function (resp) {
        return resp.data.results;
      })
    };  


    var getContent = function() {
      return $http({
          method: "GET",
          url: "/api/collections/" + "name of collection"
        })
        .then(function(resp) {
          return resp.data;
        });
    };

    var addContent = function(content) {
      return $http({
          method: "POST",
          url: "/api/collections/" + "name of collection",
          data: content
        })
        .then(function(resp) {
          console.log("succesfully saved book into: " + "name of collection");
        });
    };

    var removeContent = function(content) {
      return $http({
          method: 'DELETE',
          url: "/api/collections/" + "name of collection",
          data: content // should probably be a book title or something similar
        })
        .then(function(resp) {
          console.log("succesfully deleted book from: " + "name of collection");
        });
    }

    return {
      getContent: getContent,
      addContent: addContent,
      removeContent: removeContent,
      getNytimes: getNytimes
    };

  }])
