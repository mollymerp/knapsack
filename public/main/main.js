angular.module("knapsack.main",[])
.controller("MainController", ["$scope","Contents", function ($scope, Contents){
  $scope.bookCollection = [{"title": "The Goldfinch", "author": "Donna Tartt", "readStatus":"Reading now"},
                            {"title": "Harry Potter", "author": "J.K. Rowling", "readStatus": "Finished"},
                            {"title": "Just Kids", "author": "Patti Smith", "readStatus": "To read"},
                            {"title": "Pro AngularJS", "author":"Adam Freeman", "readStatus": "Never"}];

  $scope.articleCollection = [];

  $scope.getBooks = function (){

  };

  $scope.removeBook = function (book) {

  };

}]);
