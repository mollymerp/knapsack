angular.module("knapsack.auth", ["ui.router"])

.controller("authController", ["$scope", "$window", "$location", "$uibModal", "$log", "Auth", function($scope, $window, $location, $uibModal, $log, Auth) {

  $scope.signupOpen = function() {
    var modalInstance = $uibModal.open({
      templateUrl: 'app/auth/signup-modal.html',
      controller: SignupModalCtrl,
      size: "modal-xs",
      scope: $scope,
      resolve: {
        userForm: function() {
          return $scope.userForm;
        }
      }
    });
  };

  $scope.signinOpen = function() {
    var modalInstance = $uibModal.open({
      templateUrl: "app/auth/signin-modal.html",
      controller: SigninModalCtrl,
      size: "modal-xs",
      scope: $scope,
      resolve: {
        userForm: function() {
          return $scope.userForm;
        }
      }
    });
  };

}]);

var SignupModalCtrl = function($http, $scope, $state, $modalInstance, userForm, Auth) {
  $scope.form = {};
  $scope.submitForm = function() {
    if ($scope.form.userForm.$valid) {
      Auth.signUp().then(function(resp){
        console.log("signup fired: ", resp.data);
        //somehow handle errors and successes here either log the user in or show him a message
        $modalInstance.close();
        // this is not working for some reason :(
        // need to get page to redirect after submit
        $location.path('/');
        $state.go('dashboard');

      });
    } else {
      console.log("form not valid");
    }
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
};

var SigninModalCtrl = function($http, $scope, $state, $urlRouter, $modalInstance, userForm, Auth) {
  $scope.form = {};
  $scope.submitForm = function() {
    if ($scope.form.userForm.$valid) {
      Auth.signIn().then(function (resp){
        console.log("signin fired: ", resp.data);
        $modalInstance.close();
        // this is not working for some reason :(
        // need to get page to redirect after submit
        $location.path('/');
        $state.go('dashboard');
      });
    } else {
      console.log("form not valid");
    }
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
};
