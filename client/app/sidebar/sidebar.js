angular.module("knapsack.sidebar", [])
  .controller("SidebarController", ["$scope", "Collections", function($scope, Collections) {

    $scope.data = {}

    var getCollections = function() {
      $scope.data.collections = Collections.getAll();

      //this code is whenever we start working with http requests which return promises
      // .then(function(retrievedCollections) {
      //   $scope.data.collections = retrievedCollections;
      // })
      // .catch(function(error) {
      //   console.error(error);
      // });
    };
    getCollections();
  }]);
