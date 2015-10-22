angular.module('knapsack', [])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouteProvider) {
  $urlRouteProvider.otherwise('/');

}]);