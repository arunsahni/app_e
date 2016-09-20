angular.module('app')
  .controller('ResetPasswordController', function($scope, $state, $rootScope,  $rootScope, $stateParams, Auth) {
      $scope.errors = [];
      $rootScope.alerts = [];
      $scope.canMoveForward = true; 
    $scope.resetPassword = function() {
       $scope.errors = [];
       $scope.canMoveForward = false;
       Auth.checkToken($stateParams.token).success(function(result) {
       Auth.resetPassword($scope.user, $stateParams.token).success(function(result) { 
       $scope.canMoveForward = true;
       $rootScope.alerts.push(result);
       $state.go('anon.login');
        }).error(function(err) {
          $scope.canMoveForward = true;
          $scope.errors.push(err);
        });
      }).error(function(err) {
        $scope.errors.push(err);
        
      });
    };
     $scope.closeAlert = function(index) {
      $rootScope.alerts.splice(index, 1);
    };
$scope.closeAlert();
  });

