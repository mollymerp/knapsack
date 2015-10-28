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

var SignupModalCtrl = function($http, $scope, $location, $modalInstance, userForm, Auth) {
  $scope.form = {};
  $scope.submitForm = function() {
    if ($scope.form.userForm.$valid) {
      Auth.signUp($scope.user)

      .then(function(resp){
        console.log("signup fired: ", resp);
        //somehow handle errors and successes here either log the user in or show him a message
        $modalInstance.close();
        // this is not working for some reason :(
        // need to get page to redirect after submit
        $location.path('/');

      });
    } else {
      console.log("form not valid");
    }
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
};

var SigninModalCtrl = function($http, $scope, $location, $modalInstance, userForm, Auth) {
  $scope.form = {};
  $scope.submitForm = function() {
    if ($scope.form.userForm.$valid) {
      Auth.signIn($scope.user)
      .then(function (resp){
        console.log("signin fired");
        // $modalInstance.close();
        // this is not working for some reason :(
        // need to get page to redirect after submit
        $location.path('/');
     }.catch(function (error){
        console.error(error);
      }));
    } else {
      console.log("form not valid");
    }
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
};
