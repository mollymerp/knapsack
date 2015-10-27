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
    })

}])
// .run(['$rootScope', '$urlRouter', '$location', '$state', function ($rootScope, $urlRouter, $location, $state) {
//     $rootScope.$on('$locationChangeSuccess', function(e, newUrl, oldUrl) {
//       // Prevent $urlRouter's default handler from firing
//       e.preventDefault();

// //       * 
// //        * provide conditions on when to 
// //        * sync change in $location.path() with state reload.
// //        * I use $location and $state as examples, but
// //        * You can do any logic
// //        * before syncing OR stop syncing all together.
       

//       if ($state.current.name === 'landing' && newUrl==="/" ) {
//         // your stuff

//         $urlRouter.sync();
//       } else {
//         // don't sync
//       }
//     });
// //     // Configures $urlRouter's listener *after* your custom listener
//     $urlRouter.listen();
//   }]);;
