angular.module("knapsack.auth", ["ui.router"])

.controller("authController", ["$scope", "$rootScope", "$location", "$uibModal", "$log", "Auth", "AUTH_EVENTS", function($scope, $rootScope, $location, $uibModal, $log, Auth, AUTH_EVENTS) {
  
 

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

  $scope.logOut = function () {
    Auth.logOut($scope.currentUser)
    .then(function (resp){
      if (resp.status === 200){
        $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
        $location.path("/landing")
      }
    })
  };

}]);

var SignupModalCtrl = function($scope, $rootScope, $location, $modalInstance, userForm, AUTH_EVENTS, Auth) {
  $scope.form = {};
  $scope.submitForm = function() {
    if ($scope.form.userForm.$valid) {
      Auth.signUp($scope.user)
      .then(function(user) {
        if (user === "already exists"){
          alert("Username already exists. Please choose another one.")
        } else {
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
          $scope.setCurrentUser(user);
          $modalInstance.close();
          $location.path("/collection/bestsellers");
        }
      }).catch(function(error) {
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
        .then(function(user) {
          if (user === "Wrong password") {
            alert("Wrong password. Please try again.");
          } else {
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
            $scope.setCurrentUser(user);

            $modalInstance.close();
            $location.path("/collection/bestsellers");
          }
        }).catch(function(error) {
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
