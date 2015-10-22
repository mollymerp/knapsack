angular.module("knapsack.services",[])

.factory("Contents", ["$http", "contentType", function ($http, contentType) {
  
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
  
  return {
    getContent: getContent,
    addContent: addContent
  };

}])