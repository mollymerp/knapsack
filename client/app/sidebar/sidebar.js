angular.module("knapsack.sidebar", [])
  .controller("SidebarController", ["Collections", function(Collections) {

    var collections = this;
    collections.data = {}

    var getCollections = function() {
      collections.data.collections = Collections.getAll();

      //this code is whenever we start working with http requests which return promises
      // .then(function(retrievedCollections) {
      //   collections.data.collections = retrievedCollections;
      // })
      // .catch(function(error) {
      //   console.error(error);
      // });
    };
    getCollections();
  }]);
