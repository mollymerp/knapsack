angular.module("knapsack.services", [])
  .factory("Collections", ["$http", function($http) {
    var getAll = function() {
      //will be an http request at some point but not for now just return somehting
      return ["wine", "football", "cars", "trees", "boats"];
    };

    return {
      getAll: getAll
    };
  }]);
