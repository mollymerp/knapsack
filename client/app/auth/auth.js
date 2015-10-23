angular.module("knapsack.auth", ["ui.bootstrap"])

.controller("authController", ["$scope", "$uibModal", "$log", function($scope, $uibModal, $log) {

  $scope.open = function() {

    var modalInstance = $uibModal.open({
      templateUrl: 'app/auth/login-modal.html',
      controller: ModalInstanceCtrl,
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

// angular.module("knapsack.auth", ["ui.bootstrap"])

// .controller("ModalInstanceCtrl", function($http, $scope, $modalInstance, userForm) {
//   $scope.form = {};
//   $scope.submitForm = function() {
//     if ($scope.form.userForm.$valid) {
//       $http({
//         method: "POST",
//         url: "api/signup",
//         data: $scope.user
//       });
//       $modalInstance.close('closed');
//     } else {
//       console.log("form not valid");
//     }
//   };

//   $scope.cancel = function() {
//     $modalInstance.dismiss('cancel');
//   };
// });

var ModalInstanceCtrl = function($http, $scope, $modalInstance, userForm) {
  $scope.form = {};
  $scope.submitForm = function() {
    if ($scope.form.userForm.$valid) {
      $http({
        method: "POST",
        url: "api/signup",
        data: $scope.user
      });
      $modalInstance.close('closed');
    } else {
      console.log("form not valid");
    }
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
};
