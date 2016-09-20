angular.module('app')
  .controller('CheckEmailController', function($scope, $state, $rootScope, $stateParams, Auth) {

      //$rootScope.resetPasswordPage=false;

      $scope.errors = [];
      /*Auth.checkToken($stateParams.token).success(function(result) {
        $rootScope.resetPasswordPage = true;
        $state.go('anon.resetPassword');
      }).error(function(err) {
        $scope.errors.push(err);
        $rootScope.resetPasswordPage = false;
        $state.go('anon.forgotPassword');
      });*/
      /*Auth.forgotPassword($scope.user).success(function(result) {
        $state.go('anon.login');
      }).error(function(err) {
        $scope.errors.push(err);
      });*/
        //$rootScope.resetPasswordPage = true;
        //$state.go('anon.resetPassword');
        console.log($stateParams.token);
        Auth.checkEmail($stateParams.token).success(function(result) { 
          $state.go('anon.home');
        }).error(function(err) {
          $scope.errors.push(err);
          $state.go('anon.login');
        });
        //$rootScope.resetPasswordPage = false;
        //$state.go('anon.forgotPassword');
      
  });
