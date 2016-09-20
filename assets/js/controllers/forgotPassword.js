angular.module('app')
  .controller('ForgotPasswordController', function($scope, $state, $rootScope, Auth) {
      
    $rootScope.searchBar = "";
    $scope.errors = [];
    $scope.canMoveForward = true;

    $scope.forgotPassword = function() {
      $scope.errors = [];
      $scope.canMoveForward = false;
      Auth.forgotPassword($scope.user).success(function(result) {
      $scope.canMoveForward = true;
      $state.go('anon.login');
      }).error(function(err) {
        $scope.canMoveForward = true;
        $scope.alerts.push(msg)
        $scope.errors.push(err);
      });
    },
     $scope.closeAlert = function(index) {
      $rootScope.alerts.splice(index, 1);
    };
$scope.closeAlert();
  });