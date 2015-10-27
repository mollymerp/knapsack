angular.module("knapsack.auth", ["ui.bootstrap"])

.controller("authController", ["$scope", "$uibModal", "$log", function($scope, $uibModal, $log) {

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

var SignupModalCtrl = function($http, $scope, $modalInstance, userForm) {
  $scope.form = {};
  $scope.submitForm = function() {
    if ($scope.form.userForm.$valid) {
      $http({
        method: "POST",
        url: "api/signup",
        data: $scope.user
      }).then(function(resp) {
        console.log(resp.data);
      });
      //somehow handle errors and successes here either log the user in or show him a message
      $modalInstance.close();
    } else {
      console.log("form not valid");
    }
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
};

var SigninModalCtrl = function($http, $scope, $modalInstance, userForm) {
  $scope.form = {};
  $scope.submitForm = function() {
    if ($scope.form.userForm.$valid) {
      $http({
        method: "POST",
        url: "api/signin",
        data: $scope.user
      }).then(function(resp) {
        console.log(resp.data);
      });
      //somehow handle errors and successes here as well and tell the user if he is signed in or not
      $modalInstance.close();
    } else {
      console.log("form not valid");
    }
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
};
