angular.module("knapsack", ["ui.router", "ui.bootstrap", "smart-table", "knapsack.services", "knapsack.main"])

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouteProvider) {
  $urlRouteProvider.otherwise("/");

  $stateProvider
    .state("main", {
      url: "/",
      templateUrl: "main/main.html",
      controller: "MainController"
    })

}]);
// .run(["$rootScope", "$location", "Auth", function ($rootScope, $location, Auth){
//   $rootScope.on("$routeChangeStart", function (){
//     $location.path("/");
//   })
// }])
