angular.module("knapsack", [
  "ui.router",
  "ui.bootstrap",
  "smart-table",
  "knapsack.services",
  "knapsack.main",
  "knapsack.sidebar",
  "knapsack.auth"
])
.controller('AppController', function ($scope, Auth) {
  $scope.currentUser = null;
  $scope.isAuthorized = Auth.isAuthorized;
 
  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };
})
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
        "main": {
          templateUrl: "app/dashboard/dashboard.html"
        },
        "main_lists@collection": {
          templateUrl: "app/main_lists/main.html",
          controller: "MainController"
        },
        "sidebar@collection": {
          templateUrl: "app/sidebar/sidebar.html",
          controller: "SidebarController",
        },
        "header@collection": {
          templateUrl: "app/auth/header.html",
          controller: "authController",
        }
      }
    });

}])
.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated'
});
.run(['$rootScope', '$urlRouter', '$location', "AUTH_EVENTS","Auth", function ($rootScope, $urlRouter, $location, AUTH_EVENTS, Auth) {
    $rootScope.$on('$locationChangeSuccess', function(e, newUrl, oldUrl) {
      // Prevent $urlRouter's default handler from firing
      e.preventDefault();

//       * 
//        * provide conditions on when to 
//        * sync change in $location.path() with state reload.
//        * I use $location and $state as examples, but
//        * You can do any logic
//        * before syncing OR stop syncing all together.
    });
//     // Configures $urlRouter's listener *after* your custom listener
    $urlRouter.listen();
  }]);;
