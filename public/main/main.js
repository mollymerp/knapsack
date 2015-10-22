angular.module("knapsack.main",[])
.controller("MainController", ["$scope","Contents", function ($scope, Contents){
  $scope.booksCollection = [{"title": "The Goldfinch", "author": "Donna Tartt", "readStatus":"Reading now"},
                            {"title": "Harry Potter", "author": "J.K. Rowling", "readStatus": "Finished"},
                            {"title": "Just Kids", "author": "Patti Smith", "readStatus": "To read"}];

  // $scope.getBooks = function (){
  //   Contents.getContent("books").then(function (resp){
  //     return;
  //   });
  // };

}]);
