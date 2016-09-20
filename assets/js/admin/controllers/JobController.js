angular.module('app')
 .controller("JobController",function($scope,$state,$stateParams,Jobs){
  $scope.maxSize = 5;
  $scope.bigTotalItems = 4;
  $scope.bigCurrentPage = 1;
  $scope.itemsPerPage = 10;

  $scope.sortDir = 'desc';
  $scope.sortBy = 'jobStatus';

  Jobs.getCount().then(function(result) {
   $scope.bigTotalItems = result.data.count;
  });

  Jobs.getAll($scope.bigCurrentPage, $scope.itemsPerPage, $scope.sortBy, $scope.sortDir, $scope.text).then(function(result) {
  $scope.jobData = result.data;
  });

  $scope.setPage = function (pageNo) {
   $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
   Jobs.getAll($scope.bigCurrentPage, $scope.itemsPerPage, $scope.sortBy, $scope.sortDir).then(function(result) {
     $scope.jobData = result.data;
   });
  };

  $scope.sort = function(sortBy) {
   $scope.sortDir = ($scope.sortDir == 'desc') ? 'asc' : 'desc';
   $scope.sortBy = sortBy;
   $scope.pageChanged();
 };
 $scope.details = function(id){
   $state.go('user.jobDetail',{'id':id});
   }
 })

 /*** Controller for listing the details
  *** a particular job and lists the assigned
  *** members for a particular job.
  ***/
   .controller("JobDetailController",function($state,$scope,$stateParams,Bookings,Jobs){
     $scope.id = $state.params.id;

      Jobs.getDetails($scope.id).then(function(result){
        $scope.jobDetails = result.data;
      });
       Jobs.getAssignedMembers($scope.id).then(function(result){
         $scope.assignedPerformers = result.data;
       });
   });
