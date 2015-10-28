angular.module("knapsack.main", [])
  .controller("MainController", ["$scope", "$window", "$location", "$http", "Contents", function($scope, $window, $location, $http, Contents) {
    $scope.newBook = {
      title: "",
      author: ""
    };

    $scope.getLocation = function(val) {
    return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: val,
        sensor: false
      }
    }).then(function(response){
      return response.data.results.map(function(item){
        return item.formatted_address;
      });
    });
  };

    var getNytimes = function() {
      var bestSellers = [];
      Contents.getNytimes().then(function(resp) {
        resp.forEach(function(book) {
          var tableData = {};
          var dat = book.book_details[0];

          tableData.title = dat.title;
          tableData.author = dat.author;
          bestSellers.push(tableData);
        });
        var books = bestSellers;
        $scope.displayedCollection = [].concat(books);
      });
    };

    //need to make a copy for smart table to asynchronously paginate responses


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
      if ($location.url().split("/")[2] === "bestsellers"){
        getNytimes();
      } else {
      Contents.getBooks($location.url().split("/")[2])
        .then(function(books) {
          console.log("books fetched ",books);

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
    };

    getBooks();
    // getNytimes();

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
