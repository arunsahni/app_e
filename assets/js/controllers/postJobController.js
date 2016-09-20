angular.module('app')
  .controller('PostJobController', function($scope, $rootScope, $state, Auth, postJobService, $location) {
    $rootScope.alerts = [];
    $scope.job = {};
    $scope.message = {};
    // To merge Datepicker and Timepicker
    function mergedDate(selectedDate, selectedTime) {
      var dd = new Date(selectedDate).getDate();
      var mm = new Date(selectedDate).getMonth()+1;
      var yy = new Date(selectedDate).getFullYear();
      var hh = new Date(selectedTime).getHours();
      var ms = new Date(selectedTime).getMinutes();
      var x = yy + ',' + mm + ',' + dd + ' ' + hh + ':' + ms;
      var finaldate = new Date(x);
      return finaldate;
    }
    
    $scope.$watch('job.jobStartEndTime', function () {
      $scope.startTimeStamp = new Date($scope.job.jobStartDateTime).getDate();
      $scope.endTimeStamp = new Date($scope.job.jobStartEndTime).getDate();
      if ($scope.endTimeStamp < $scope.startTimeStamp) {
        $scope.dateError = "End date should be greater than start date";
      }
    });
     
    // To save post Data
    $scope.postJob = function() {
        
        if($scope.job.endtime == undefined || $scope.job.startTime == undefined){
            $scope.job.startTime = new Date();
            $scope.job.endtime = new Date();
        }
      var startdate = mergedDate($scope.job.jobStartDateTime, $scope.job.startTime);
      $scope.job.jobStartDateTime = startdate;
      
      var enddate = mergedDate($scope.job.jobStartEndTime, $scope.job.endtime);
      $scope.job.jobStartEndTime = enddate;
      
      $scope.sTime = new Date($scope.job.jobStartDateTime).getHours();
      $scope.eTime = new Date($scope.job.jobStartEndTime).getHours();
      $scope.startTimeStamp = new Date(startdate).getDate();
      $scope.endTimeStamp = new Date(enddate).getDate();
     
      $scope.$watch('job.endtime', function () {
      if ($scope.eTime < $scope.sTime) {
        $scope.timeError = "End time should be greater than start time";
      }
      });
      //console.log($scope.job); return false;
      if ($scope.endTimeStamp >=  $scope.startTimeStamp) {
        //if ($scope.eTime > $scope.sTime) {
          postJobService.postJob($scope.job).success(function(result) {
            $rootScope.alerts.push(result.msg);
            $scope.jobData = result;
            if($location.search().pid){
                window.location.href = '#/performer/profile/'+$location.search().pid+'?lnkaction=hire';
            }else{
                $state.go('user.jobList');
            }
          }).error(function(err) {
            $rootScope.alerts.push(err.msg);
          });
        //} 
      } 
    
    }
    $scope.cancel = function(){
      $location.path('/jobs/list');
    }
  });