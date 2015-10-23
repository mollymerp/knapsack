angular.module("knapsack.services", [])
  .factory("Collections", ["$http", function($http) {

    var getAll = function() {
      return $http({
        method: "GET",
        url: "api/collections"
      }).then(function succesCallback(resp) {
        console.log(resp.status + ": succesfully fetched collections");
      }, function errorCallback(resp) {
        console.log(resp.status + ": failed fetching from server");
      })
      //will be an http request at some point but not for now just return somehting
      return ["wine", "football", "cars", "trees", "boats"];
    };

    var addCollection = function() {
      return $http({
        method: "POST",
        url: "api/collections"
      }).then(function succesCallback(resp) {
        console.log(resp.status + ": succesfully added Collection");
      }, function errorCallback(resp) {
        console.log(resp.status + ": failed adding Collection");
      })
    };

    var removeCollection = function() {
      return $http({});
    }
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
