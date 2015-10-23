angular.module("knapsack.main", [])
  .controller("MainController", ["$scope", "Contents", function($scope, Contents) {
    $scope.newBook = {
      title:"",
      author:"",
      readStatus:""
    };

    $scope.bookCollection = [{
      "title": "The Goldfinch",
      "author": "Donna Tartt",
      "readStatus": "Reading now"
    }, {
      "title": "Harry Potter",
      "author": "J.K. Rowling",
      "readStatus": "Finished"
    }, {
      "title": "Just Kids",
      "author": "Patti Smith",
      "readStatus": "To read"
    }, {
      "title": "Pro AngularJS",
      "author": "Adam Freeman",
      "readStatus": "Never"
    }];

    $scope.addBook = function (){

      $scope.bookCollection.unshift({"title": $scope.newBook
.title, 
        "author": $scope.newBook.author, "readStatus": $scope.newBook.readStatus});
    };

    $scope.getBooks = function() {

    };

    $scope.removeBook = function(book) {

    };



  }]);
