angular.module("knapsack", ["ui.router", "ui.bootstrap", "smart-table", "knapsack.services", "knapsack.main","knapsack.sidebar"])

.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouteProvider) {
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
          controller:"SidebarController"
        },
        "header": {
          
        }
      }
    })

}]);
// .run(["$rootScope", "$location", "Auth", function ($rootScope, $location, Auth){
//   $rootScope.on("$routeChangeStart", function (){
//     $location.path("/");
//   })
// }])
