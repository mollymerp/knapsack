angular.module("knapsack", ["ui.router", "ui.bootstrap", "smart-table", "knapsack.services", "knapsack.main"])

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouteProvider) {
  $urlRouteProvider.otherwise("/");

  $stateProvider
    .state("main", {
      url: "/"
      views: {
        "main_lists": {
          templateUrl: "app/main_lists/main.html",
          controller: "MainController"
        },
        "sidebar": {
          templateUrl: "sidebar.html",
          controller: "SidebarController",
          controllerAs: "sidebar"
        },
        "header": {
          
        }
      }
    })

}]);