angular.module('app')
  .controller('JobListController', function($scope, $state, Auth, JobList) {
     JobList.getJobData().then(function(result) {
      console.log(result.data.job);
      $scope.jobData = result.data.job;
    });
    $scope.edit = function() {
      $state.go('user.updateUserProfile');
    },

    $scope.editProfileData = function() {
    	console.log($scope.user);
      Profiles.editProfileData($scope.user).success(function(result) {
        $state.go('user.userProfile');
      }).error(function(err) {
        //$rootScope.alerts.push(err);
      });
    },
    $scope.uploadProfileImage = function(image) {
      console.log(image);
      console.log(hello);

    }

  });