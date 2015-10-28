angular.module("knapsack.main", [])
  .controller("MainController", ["$scope", "$window", "$location", "Contents", function($scope, $window, $location, Contents) {
    $scope.newBook = {
      title: "",
      author: ""
    };

    $scope.bookCollection = [{
      "title": "The Goldfinch",
      "author": "Donna Tartt"
    }, {
      "title": "Harry Potter",
      "author": "J.K. Rowling"
    }, {
      "title": "Just Kids",
      "author": "Patti Smith"
    }, {
      "title": "Pro AngularJS",
      "author": "Adam Freeman"
    }];


    var getNytimes = function() {
      var bestSellers = [];
      Contents.getNytimes().then(function(resp) {
        resp.forEach(function(book) {
          var tableData = {};
          var dat = book.book_details[0];

          tableData.title = dat.title;
          tableData.author = dat.author;
          bestSellers.push(tableData);
        })
        $scope.bookCollection = bestSellers;
      })
    };

    //need to make a copy for smart table to asynchronously paginate responses
    $scope.displayedCollection = [].concat($scope.bookCollection);


    $scope.addBook = function() {
      if ($scope.newBook.title && $scope.newBook.title) {
        var book = {
          title: $scope.newBook.title,
          author: $scope.newBook.author
        };
        Contents.addBook($location.url().split("/")[2], book)
          .then(getBooks);
        $scope.newBook.title = "";
        $scope.newBook.author = "";
      }
    };

    var getBooks = function() {
      console.log($location.url().split("/")[2])
      if ($location.url().split("/")[2] === "bestsellers"){
        Contents.getNytimes();
      } else {
      Contents.getBooks($location.url().split("/")[2])
        .then(function(books) {
          $scope.displayedCollection = books;
        });
      }
    };

    $scope.removeBook = function(book) {
      Contents.removeBook($location.url().split("/")[2], {
        title: book.title,
        author: book.author
      }).then(getBooks);
    };

    $scope.shareBook = function(book, user) {
      Contents.shareBook($location.url().split("/")[2], {
        title: book.title,
        author: book.author
      }, user);
      console.log(book, user);
    }

    // getBooks();
    getNytimes();

  }])
  .controller("DropdownCtrl", ["$scope", "Contents", function($scope, Contents) {
    $scope.loadFriends = function() {
        Contents.getFriends()
          .then(function(users) {
            $scope.friends = users;
          });
      };
    // $scope.friends = ["hans", "peter", "klaus", "anja", "frauke", "meggie", "linda"];
  }]);
