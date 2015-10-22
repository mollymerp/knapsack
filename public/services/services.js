angular.module("knapsack.services",[])

.factory("Contents", ["$http", function ($http) {
  
  var getContent = function () {
    return $http({
      method: "GET",
      url: "/"
    })
    .then( function (resp) {
      return resp.data;
    });
  };

  var addContent = function (content) {
    return $http({
      method: "POST",
      url: "/"
    })
    .then( function (resp) {
      console.log("data saved")
    });
  };

  var removeContent = function (content) {
    return $http({
      method: 'POST',
      url: "/"
    })
    .then( function (resp) {

    });
  }
  
  return {
    getContent: getContent,
    addContent: addContent,
    removeContent: removeContent
  };

}])