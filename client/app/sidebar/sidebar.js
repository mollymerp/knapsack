angular.module("knapsack.sidebar", [])
  .controller("SidebarController", ["$scope", "Collections", function($scope, Collections) {

    $scope.data = {}

    $scope.newCollection = {
      name: ""
    };

    var getCollections = function() {
      //this code is whenever we start working with http requests which return promises
      Collections.getAll()
      .then(function(retrievedCollections) {
        $scope.data.collections = retrievedCollections;
      })
      .catch(function(error) {
        console.error(error);
      });
    };
    getCollections();

    $scope.addCollection = function addCollection() {
      Collections.addCollection($scope.newCollection.name)
      .then(getCollections);
      $scope.newCollection.name = "";
    };



  }]);
