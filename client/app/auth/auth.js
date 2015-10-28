angular.module("knapsack.auth", ["ui.router"])

.controller("authController", ["$scope", "$location", "$uibModal", "$log", "Auth", function($scope, $location, $uibModal, $log, Auth) {

  $scope.signupOpen = function() {
    var modalInstance = $uibModal.open({
      templateUrl: "app/auth/signup-modal.html",
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

var SignupModalCtrl = function($scope, $rootScope, $location, $modalInstance, userForm, AUTH_EVENTS, Auth) {
  $scope.form = {};
  $scope.submitForm = function() {
    if ($scope.form.userForm.$valid) {
      Auth.signUp($scope.user)

      .then(function(user){
        console.log("signup fired: ", user);
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.setCurrentUser(user);
        $modalInstance.close();
        $location.path("/");

      }).catch(function (error){
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        console.error(error);
      });
    } else {
      console.log("form not valid");
    }
  };

  $scope.cancel = function() {
    $modalInstance.dismiss("cancel");
  };
};

var SigninModalCtrl = function($scope, $rootScope, $location, $modalInstance, userForm, AUTH_EVENTS, Auth) {
  $scope.form = {};
  $scope.submitForm = function() {
    if ($scope.form.userForm.$valid) {
      Auth.signIn($scope.user)
      .then(function (user){
        console.log("signin fired", user);
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $scope.setCurrentUser(user);

        $modalInstance.close();
        $location.path("/");
     }).catch(function (error){
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
        console.error(error);
      });
    } else {
      console.log("form not valid");
    }
  };

  $scope.cancel = function() {
    $modalInstance.dismiss("cancel");
  };
};
