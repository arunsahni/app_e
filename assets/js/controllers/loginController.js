angular.module('app')
  .controller('LoginController', function($scope, $state, $rootScope, Auth,$location) {
    $rootScope.searchBar = "";
    $scope.canMoveForward = true;


    $scope.login = function() {
      $rootScope.alerts = [];
      $scope.canMoveForward = false;
      Auth.login($scope.user).success(function(result) {
       $scope.canMoveForward = true;
       $state.go('user.userProfile');
        if(result.user.role == 'Customer') {
          $rootScope.userRole = 'Customer';
          if($location.search().pid){
              window.location.href = '#/performer/profile/'+$location.search().pid+'?lnkaction=hire';
          }else{
              $state.go('user.updateUserProfile');
          }
        } else if(result.user.role == 'Performer') {
          $rootScope.userRole = 'Performer';
          $state.go('user.performerProfileEdit');
        } else if(result.user.role == 'Company'){
          $rootScope.userRole = 'Company';
          $state.go('user.companyProfileEdit');
          //$state.go('user.companyDashboard');
        }
      }).error(function(err) {
        $scope.canMoveForward = true;
        $rootScope.alerts.push(err);
      });
    };

    //close function for alerts uib-alert used
    $scope.closeAlert = function(index) {
      $rootScope.alerts.splice(index, 1);
    };
  });