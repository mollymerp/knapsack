angular.module("knapsack.auth", ['ui.bootstrap'])

.controller('authController', function($scope, $modal, $log){

  $scope.alert = function(){
    alert("hello");
  };

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'login-modal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
    });
  };

})

.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});