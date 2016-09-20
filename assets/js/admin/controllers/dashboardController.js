angular.module('app')
  .controller('DashboardController', function($scope, Dashboard,Users,Performers,Bookings,Jobs) {
    Users.getCount().then(function(result) {
      $scope.bigTotalItems = result.data.count;
    });
    Performers.getCount().then(function(result) {
     $scope.totalPerformers = result.data.count;
    });
    Bookings.getCount().then(function(result) {
     $scope.bookingCount = result.data.count;
    });
    Jobs.getCount().then(function(result) {
     $scope.jobsCount = result.data.count;
    });

  });
