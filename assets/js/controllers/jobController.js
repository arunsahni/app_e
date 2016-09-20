angular.module('app')
  .controller('JobsController', function($scope, $state, $rootScope, $stateParams, Auth, Job) {
    var idData = [];
  var reloadData = function(){
  if($state.current.name == 'user.jobList') {
  $rootScope.alerts = [];
  $scope.maxSize = 5;
  $scope.bigTotalItems = 4;
  $scope.bigCurrentPage = 1;
  $scope.itemsPerPage = 10;
  $scope.sortDir = 'desc';
  $scope.sortBy = 'createdAt';
  $scope.text = '';
  $scope.text1 = '';


  Job.getCount().then(function(result) {
   $scope.bigTotalItems = result.data.count;
  });

  $scope.setPage = function (pageNo) {
   $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
   Job.getAllJobs($scope.bigCurrentPage, $scope.itemsPerPage, $scope.sortBy, $scope.sortDir, $scope.text, $scope.text1).then(function(result) {
     $scope.jobData = result.data;
     if(Object.keys($scope.jobData).length == 0) {
           $rootScope.alerts.push("No Data Found");
        }
   });
  };
 $scope.pageChanged();
 $scope.clearFilet = function() {
  $scope.text = '';
  $scope.pageChanged();
 }
 $scope.clearData = function() {
   $scope.text = '';
   $scope.key = '';
   $scope.text1 = '';
   $scope.pageChanged();
 }
 $scope.sortFilter = function(filter) {

     $scope.text = filter.jobStatus;
       console.log($scope.text);
     $scope.pageChanged();

 };
     
    }
  }
  reloadData();

  $scope.boxaction = function(){
    $scope.chatbox = true;
  };
    
  $scope.edit = function(id) {
      $rootScope.alerts = [];
      $state.go('user.jobedit', {jobId: id});
    };

  /*$scope.editJobData = function() {
        $rootScope.alerts = [];
        Job.editJobData($scope.job).success(function(result) {
        $rootScope.alerts.push(result.msg);
        $state.go('user.jobList');
      }).error(function(err) {
        $rootScope.alerts.push(err.msg);
      });
    };*/
  $scope.deleteJob = function(id) {
         var a = confirm("Do you really want to delete Job!");
         if(a != false){
         $rootScope.alerts = [];
         Job.deleteJob(id).success(function(result) {
         reloadData();
      }).error(function(err) {
         $rootScope.alerts.push(err.msg);
      });
    }
    };
  $scope.deleteMultiple = function(data) {
       var arr = []; 
         var a = confirm("Do you really want to delete Job!");
         if(a != false) {    
       for(var i in data){  

             if(data[i].SELECTED=='1'){
                         arr.push(data[i].id);       
         }
     }
    Job.deleteMultiple(arr).success(function(result)
    {
               reloadData();
    }).error(function(err) {
         $rootScope.alerts.push(err.msg);
      });
  }
};

  $scope.search = function() {
    console.log($scope.key);
        $rootScope.alerts = [];
        if($scope.key!= undefined) {
        $scope.text1 =  $scope.key;
        $scope.pageChanged();
       } else {
        $scope.text1 =  '';
        $scope.pageChanged();
       }
        /*if(text1 == undefined || text1.key == "")
        {
           reloadData();
        } else {
       Job.searchData(text1).success(function(result) {
        $scope.jobData = result.job;
         if(Object.keys($scope.jobData).length == 0) {
           $rootScope.alerts.push("No Data Found with job title " + text1.key);
        }
      }).error(function(err) {

      });  
     }*/
    };
    $scope.viewJobData = function(id) {
     $state.go('user.jobDetail', {jobId: id});
    };

     $scope.closeAlert = function(index) {
      $rootScope.alerts.splice(index, 1);
    };
  }).controller('JobDetailCustomerController', function($scope, $state, $rootScope, $stateParams, Job) {
      $scope.jobData = {};
      $scope.jobAssignment = {};
      Job.getJobDetail($stateParams.jobId).success(function(result) {
          
          if(result.type=='success'){
                $scope.jobData = result.job;
          }
        
      });
      
      Job.getAllAssignmentOnJob($stateParams.jobId).success(function(result) {
          
          if(result.type=='success'){
                $scope.jobAssignment = result.assignments;
          }
        
      });
      
  }).controller('JobEditCustomerController', function($scope, $state, $rootScope, $stateParams, Job, $location) {
      
      Job.getJobData($stateParams.jobId).success(function(result) {
        result.job[0].jobCategory      = result.job[0].jobCategory.categoryTitle;
        result.job[0].jobStartEndTime  = new Date(result.job[0].jobStartEndTime);
        result.job[0].jobStartDateTime = new Date(result.job[0].jobStartDateTime);
        
        $scope.job = result.job[0];
        $scope.job.startTime = result.job[0].jobStartDateTime;
        $scope.job.endtime = result.job[0].jobStartEndTime;
        
      });
      // To merge Datepicker and Timepicker
        function mergedDate(selectedDate, selectedTime) {
          var dd = new Date(selectedDate).getDate();
          var mm = new Date(selectedDate).getMonth()+1;
          var yy = new Date(selectedDate).getFullYear();
          var hh = new Date(selectedTime).getHours();
          var ms = new Date(selectedTime).getMinutes();
          var x = yy + ',' + mm + ',' + dd + ' ' + hh + ':' + ms;
          var finaldate = new Date(x);
          console.log(finaldate);
          return finaldate;
        }
    
     
      $scope.editJobData = function() {
        $rootScope.alerts = [];
        var startdate = mergedDate($scope.job.jobStartDateTime, $scope.job.startTime);
        $scope.job.jobStartDateTime = startdate;
      
        var enddate = mergedDate($scope.job.jobStartEndTime, $scope.job.endtime);
        $scope.job.jobStartEndTime = enddate;
        
       
        
        $scope.startTimeStamp = new Date(startdate).getDate();
        $scope.endTimeStamp = new Date(enddate).getDate();
        
        $scope.$watch('job.jobStartEndTime', function () {
        if ($scope.endTimeStamp < $scope.startTimeStamp) {
          $scope.dateError = "End date should be greater than start date";
        }
        });
        
        $scope.sTime = new Date($scope.job.jobStartDateTime).getHours();
        $scope.eTime = new Date($scope.job.jobStartEndTime).getHours();
        
      $scope.$watch('job.endtime', function () {
      if ($scope.eTime < $scope.sTime) {
        $scope.timeError = "End time should be greater than start time";
      }
      });
      if ($scope.endTimeStamp >= $scope.startTimeStamp) {
        //if ($scope.eTime > $scope.sTime) {
            Job.editJobData($scope.job).success(function(result) {
              $rootScope.alerts.push(result.msg);
              $state.go('user.jobList');
            }).error(function(err) {
            $rootScope.alerts.push(err.msg);
            });
        //}
      }
    
    };
      
      $scope.cancel = function() {
        $location.path('/jobs/list');  
      }
      
  }).controller('listNegotiationPerformerController', function($scope, $state, $rootScope, $stateParams, Job) {
      
      $scope.negoData = {};
      Job.getNegotiationsPerformer().success(function(result) {
       
            if(result.type=='success'){
                $scope.negoData = result.negotiations;
            }
       
      });
      
  }).controller('negotiationDetailPerformerController', function($scope, $state, $rootScope, $stateParams, Job) {
      
      $scope.negoData = {};
      $scope.seletedJob = {};
      $scope.showupdate = false;
      Job.getNegotiationDetail($stateParams.negotiationId).success(function(result) {
       
            if(result.type=='success'){
                    $scope.negoData = result.negotiations;
                    $scope.agreedPrice = $scope.negoData.agreedPrice;
                    $scope.chatbox = true;     
                    $scope.userLoginID = $scope.negoData.performerId;
                    $scope.prfileUserID = $scope.negoData.hostId.id;
                    $scope.seletedJob.jobID = $scope.negoData.jobId;
                    $scope.showupdate = true;
            }
      });
      
      $scope.updateAmount = function() {
                
                    if($scope.agreedPrice && $scope.negoData.id){
                        
                        if (confirm("Are you sure! you want to update agrement amount?")) {
                            if(parseFloat($scope.agreedPrice) > 0){
                                var negoupdate = {};
                                negoupdate.agreedPrice = $scope.agreedPrice;
                                negoupdate.id = $scope.negoData.id;
                                negoupdate.negoStatus = 'Done';
                                Job.updateNegotiationPrice(negoupdate).success(function(result) {

                                    if(result.type=='success'){
                                        //$scope.negoData = result.negotiations;
                                    }

                                });
                            }else{
                                alert('Please correct the amount and try again');
                            }
                        }
                    }
      }
      
  });