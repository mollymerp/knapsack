angular.module("knapsack.services", [])
  .factory("Collections", ["$http", function($http) {

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
      //will be an http request at some point but not for now just return somehting
      return ["wine", "football", "cars", "trees", "boats"];
    };

    var addCollection = function(data) {
      return $http({
        method: "POST",
        url: "api/collections",
        data: data
      }).then(function succesCallback(resp) {
        console.log(resp.status + ": succesfully added Collection");
      }, function errorCallback(resp) {
        console.log(resp.status + ": failed adding Collection");
      });
    };

    var removeCollection = function(colName) {
      return $http({
        method: "DELETE",
        url: "api/collections",
        data: colName
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

    var getContent = function() {
      return $http({
          method: "GET",
          url: "/"
        })
        .then(function(resp) {
          return resp.data;
        });
    };

    var addContent = function(content) {
      return $http({
          method: "POST",
          url: "/"
        })
        .then(function(resp) {
          console.log("data saved")
        });
    };

    var removeContent = function(content) {
      return $http({
          method: 'POST',
          url: "/"
        })
        .then(function(resp) {

        });
    }

    return {
      getContent: getContent,
      addContent: addContent,
      removeContent: removeContent
    };

  }])
