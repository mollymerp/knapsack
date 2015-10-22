angular.module('auth', ['ui.bootstrap'])

.controller('authController', function($scope, $modal, $log){

  $scope.alert = function(){
    alert("hello");
  };

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'signin.html',
      controller: 'ModalInstanceCtrl',
      size: size,
    });
  };

})

.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

  $scope.ok = function () {
    $modalInstance.close();
    console.log($scope)
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});