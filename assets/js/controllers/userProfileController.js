angular.module('app')
  .controller('ProfilesController', function($scope,$rootScope, $state, Auth, Profiles,Flash) {
    Profiles.getProfileData().then(function(result) {
      $scope.user = result.data;
    });
    $scope.edit = function() {
      $state.go('user.updateUserProfile');
    },

    $scope.editProfileData = function() {
    	//console.log($scope.user);
      Profiles.editProfileData($scope.user).success(function(result) {
          var message = 'Information updated successfully.';
          Flash.create('success', message, 'custom-class');
          
        $state.go('user.updateUserProfile');
      }).error(function(err) {
        //$rootScope.alerts.push(err);
      });
    },
    
    $scope.uploadProfileImage = function(image) {
      console.log(image);
      console.log(hello);
    }

  });