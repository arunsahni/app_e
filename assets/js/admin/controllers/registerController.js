angular.module('app')
  .controller('RegisterController', function($scope, $state,$rootScope ,Auth) {
    $scope.register = function() {
    	console.log($scope.user);
      Auth.register($scope.user).then(function() {
        $state.go('anon.home');
      });
    }
    //toglling form user to company 
    $scope.setFlag = function() {
         $rootScope.flag=false;
         $scope.user="";
    }
    $scope.unsetFlag = function() {
         $rootScope.flag=true;
         $scope.user="";

    }
  });