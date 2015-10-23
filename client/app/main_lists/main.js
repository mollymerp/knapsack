angular.module("knapsack.main", [])
  .controller("MainController", ["$scope", "$window", "$location", "Contents", function ($scope, $window, $location, Contents) {
    $scope.newBook = {
      title: "",
      author: "",
      readStatus: ""
    };
    console.log("MainController $location: ", $location.url().split('/'));
    
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


    $scope.getNytimes = function (){
      var bestSellers = [];
      Contents.getNytimes().then(function (resp){
        resp.forEach(function (book){
          var tableData = {};
          var dat = book.book_details[0];
      
          tableData.title = dat.title;
          tableData.author = dat.author;
          bestSellers.push(tableData);
        })
        $scope.bookCollection = bestSellers;
      })
    };


    $scope.addBook = function() {

      $scope.bookCollection.unshift({
        "title": $scope.newBook.title,
        "author": $scope.newBook.author,
        "readStatus": $scope.newBook.readStatus
      });
    };

    $scope.getBooks = function() {

    };

    $scope.removeBook = function(book) {

    };

    if ($location.url().split('/')[1]==="collection"){
      console.log("inside");
      $scope.getNytimes();
    }

  }]);
