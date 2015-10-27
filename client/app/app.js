angular.module("knapsack", [
  "ui.router",
  "ui.bootstrap",
  "smart-table",
  "knapsack.services",
  "knapsack.main",
  "knapsack.sidebar",
  "knapsack.auth",
  "knapsack.landing"
])

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouteProvider, $urlRouter) {
  $urlRouteProvider.otherwise("/");


  $stateProvider

    .state("landing", {
      url: "/landing",
      views: {
        "main": {
          templateUrl: "app/landing/landing.html",
          controller: "authController"
      }
    }})
    .state("dashboard", {
      url: "/",
      views: {
        "main": {
          templateUrl: "app/dashboard/dashboard.html"
        },
        "main_lists@dashboard": {
          templateUrl: "app/main_lists/main.html",
          controller: "MainController"
        },
        "sidebar@dashboard": {
          templateUrl: "app/sidebar/sidebar.html",
          controller: "SidebarController",
        },
        "header@dashboard": {
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
