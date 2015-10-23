angular.module("knapsack.auth", ['ui.bootstrap'])

.controller('authController', ["$scope", "$uibModal", "$log", function($scope, $uibModal, $log) {

  $scope.open = function(size) {

    var modalInstance = $uibModal.open({
      templateUrl: 'app/auth/login-modal.html',
      controller: ModalInstanceCtrl,
      size: size,
      resolve: {
        userForm: function() {
          return $scope.userForm;
        }
      }
    });
  };

}]);

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
