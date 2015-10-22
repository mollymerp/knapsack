angular.module('knapsack', ["ui.bootstrap","knapsack.services"])

.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouteProvider) {
  $urlRouteProvider.otherwise("/");

  $stateProvider
    .state("main", {
      url:"/",
      templateUrl: "main/main.html",
      controller: "MainCtrl"
    })

}]);