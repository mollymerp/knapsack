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

var ModalInstanceCtrl = function($scope, $modalInstance, userForm) {
  $scope.form = {}
  $scope.submitForm = function() {
    if ($scope.form.userForm.$valid) {
      console.log('user form is in scope');
      $modalInstance.close('closed');
    } else {
      console.log('userform is not in scope');
    }
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
};
