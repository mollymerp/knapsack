angular.module("knapsack.services", [])
  .factory("Collections", ["$http", function($http) {
    var getAll = function() {
      //will be an http request at some point but not for now just return somehting
      return ["wine", "football", "cars", "trees", "boats"];
    };

    return {
      getAll: getAll
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
