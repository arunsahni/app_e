angular.module('app')
  .controller('ForgotPasswordController', function($scope, $state, Auth) {
    $scope.errors = [];

    $scope.forgotPassword = function() {
      $scope.errors = [];
      Auth.forgotPassword($scope.user).success(function(result) {
        $state.go('anon.login');
      }).error(function(err) {
        $scope.errors.push(err);
      });
    }
  });


  angular.module('app')
  .controller('ResetPasswordController', function($scope, $state, $rootScope, $stateParams, Auth) {

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
    $scope.resetPassword = function() {
      $scope.errors = [];
      /*Auth.forgotPassword($scope.user).success(function(result) {
        $state.go('anon.login');
      }).error(function(err) {
        $scope.errors.push(err);
      });*/
      Auth.checkToken($stateParams.token).success(function(result) {
        //$rootScope.resetPasswordPage = true;
        //$state.go('anon.resetPassword');
        Auth.resetPassword($scope.user, $stateParams.token).success(function(result) { 
          $state.go('anon.login');
        }).error(function(err) {
          $scope.errors.push(err);
        });
      }).error(function(err) {
        $scope.errors.push(err);
        //$rootScope.resetPasswordPage = false;
        //$state.go('anon.forgotPassword');
      });
    };
  });