angular.module('app')
  .controller('ContactController', function($scope, $state, contactService) {
    $scope.contact = function() {
    	console.log($scope.user);
      contactService.contactUs($scope.user).then(function() {
        $state.go('anon.home');
      });
    }
  });