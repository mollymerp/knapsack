angular.module("knapsack.sidebar", [])
  .controller("SidebarController", ["$scope", "Collections", function($scope, Collections) {

    $scope.data = {}

    $scope.newCollection = {
      name: ""
    };

    var getCollections = function() {
      Collections.getAll()
      .then(function(retrievedCollections) {
        $scope.data.collections = retrievedCollections;
      })
      .catch(function(error) {
        console.error(error);
      });
    };

    $scope.addCollection = function addCollection() {
      Collections.addCollection($scope.newCollection.name)
      .then(getCollections);
      $scope.newCollection.name = "";
    };

    getCollections();
  }]);
