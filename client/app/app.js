angular.module("knapsack", [
  "ui.router",
  "ui.bootstrap",
  "smart-table",
  "knapsack.services",
  "knapsack.main",
  "knapsack.sidebar",
  "knapsack.auth",
  "templates"
])

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouteProvider, $urlRouter) {
  $urlRouteProvider.otherwise("/");


  $stateProvider
    .state("main", {
      url: "/",
      views: {
        "main_lists": {
          templateUrl: "app/main_lists/main.html",
          controller: "MainController"
        },
        "sidebar": {
          templateUrl: "app/sidebar/sidebar.html",
          controller: "SidebarController",
        },
        "header": {
          templateUrl: "app/auth/header.html",
          controller: "authController",
        }
      }
    })
    .state("collection", {
      url: "/collection/:collection",
      views: {
        "main_lists": {
          templateUrl: "app/main_lists/main.html",
          controller: "MainController"
        },
        "sidebar": {
          templateUrl: "app/sidebar/sidebar.html",
          controller: "SidebarController",
        },
        "header": {
          templateUrl: "app/auth/header.html",
          controller: "authController",
        }
      }
    })

}]);
