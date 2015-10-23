angular.module("knapsack", ["knapsack.services",
    "knapsack.sidebar",
    "ngRoute"
  ])
  .config(["$routeProvider", "$httpProvider", function($routeProvider, $httpProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "sidebar.html",
        controller: "SidebarController",
        controllerAs: "sidebar"
      })
      .otherwise({
        redirectTo: "/"
      });
  }]);
