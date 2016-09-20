angular.module('app')
  .controller('BookingsController', function($scope, $state, $rootScope, $location, $stateParams, bookingDetails, Job, CurrentUser) {
        
        //For Rating Settings
        $scope.rate = 2;
        $scope.max = 5;
        $scope.isReadonly = false;
        $scope.review = {};
        
        // For Rating value
        $scope.hoveringOver = function(value) {
          $scope.overStar = value;
          $scope.percent = 100 * (value / $scope.max);
          if ($scope.percent < 60) {
            $scope.rating = "Not Good";
          } else if ($scope.percent == 60) {
            $scope.rating = "Good";
          } else if ($scope.percent == 80) {
            $scope.rating = "Very Good"
          } else if ($scope.percent == 100) {
            $scope.rating = "Excellent";
          }
        };
        
        // To Navigate to Previous Page
        if ($state.current.name == 'user.giveReview') {
                
            $scope.cancel = function() {
                $location.path('/jobs/bookingDetail/'+ $stateParams.assignmentID);
            }
        } else if($state.current.name == 'user.giveReviewByPerformer') {
               
            $scope.cancel = function() {
                $location.path('/performer/assignment/'+ $stateParams.assignmentID);
            }
        }
        
        // To save review
        $scope.saveReviewData = function(rate) {
            $scope.review.reviewRating = rate;
            $scope.review.reviewerId = CurrentUser.user().id;
            $scope.review.jobId = $stateParams.jobId;
            
            if ($state.current.name == 'user.giveReview') {
                $scope.review.userId =  $stateParams.performerId;
                $scope.review.assignmentId =  $stateParams.assignmentID;
                console.log($scope.review);
                Job.saveReviews($scope.review).success(function(result){
                    $location.path('/jobs/bookingDetail/'+ $stateParams.assignmentID);
                })
                
            } else if($state.current.name == 'user.giveReviewByPerformer') {
                $scope.review.userId =  $stateParams.hostId;
                $scope.review.assignmentId =  $stateParams.assignmentID;
                Job.saveReviews($scope.review).success(function(result){
                    $location.path('/performer/assignment/'+ $stateParams.assignmentID);
                })
            }
        }
        
}).controller('bookingDetailCustomerController', function($scope, $state, $rootScope, $location, $stateParams, CurrentUser, bookingDetails, Job) {
            $scope.user = CurrentUser.user();
            $scope.assignmentDetail = {};
            
            $scope.userLoginID = "";
            $scope.prfileUserID = "";
            $scope.seletedJob = {};
            $scope.messages = {};
            $scope.jobMessages = [];
            $scope.assignmentID = $stateParams.assignmentID;
            $scope.showCancelbtn = false;
            
            bookingDetails.getBookingInfo($stateParams.assignmentID).success(function(result) {
                $scope.assignmentDetail = result.jobAssignment;
                $scope.rate = $scope.assignmentDetail.performerReview;
                $scope.max = 5;
                $scope.isReadonly = true;
                
                var startTimeStamp = new Date($scope.assignmentDetail.jobId.jobStartDateTime).getTime();
                var currentTimeStamp = new Date().getTime();
                if (startTimeStamp > currentTimeStamp) {
                    $scope.showCancelbtn = true;
                }
                //$scope.userLoginID = $scope.assignmentDetail.jobId.user_id;
               // $scope.prfileUserID = $scope.assignmentDetail.performerId.id;
                //$scope.seletedJob.jobID = $scope.assignmentDetail.jobId.id;
                //alert($scope.seletedJob);
            });
            var reloadData = function() {
                Job.getDisputeMsg({assignmentId: $stateParams.assignmentID}).success(function(result){
                    $scope.jobMessages = result.jobMessages;
                });
            }
            reloadData();

            // To save Messages on Dispute
            $scope.saveMessage = function(msg){
                if (msg) {
                     
                    //$scope.jobMessages.splice(0,0,{message:msg.messag});
                    $scope.messages.message = msg.messag;
                    $scope.messages.jobId = $scope.assignmentDetail.jobId.id;
                    $scope.messages.userId = $scope.user.id;
                    $scope.messages.assignmentId = $stateParams.assignmentID;
                    Job.saveDisputeMsg($scope.messages).success(function(result){
                        $scope.messages = {};
                        reloadData();
                    });
                }
            }
            // To save Cancellation Reason
            $scope.reason = {};
            
            $scope.saveReason = function(value) {
                if (confirm("Are you sure! you want to cancel the assignment?")) {
                    var data = {};
                        data.assignment_id = $stateParams.assignmentID;
                        data.cancelReason = value.msg;
                        data.statusBy = $scope.user.id;
                        
                    bookingDetails.saveReason(data).success(function(result) {
                        var data1 = {};
                        data1.assignment_id = $stateParams.assignmentID;
                        data1.assignmentStatus = 'Cancelled';
                        data1.statusBy = $scope.user.id;
                        $scope.$watch('assignmentDetail', function(newValue, oldValue) {
                            if ($scope.assignmentDetail.assignmentStatus) {
                                $scope.assignmentDetail.assignmentStatus = 'Cancelled';
                                bookingDetails.updateAssignmentStatus(data1).success(function(result) {
                                    $scope.reason = {};
                                });  
                            }
                        });
                    });  
                }
            }
            $scope.cancelStatus = function() {
                var data = {};
                data.assignment_id = $stateParams.assignmentID;
                data.assignmentStatus = 'Started';
                data.statusBy = $scope.user.id;
                bookingDetails.updateAssignmentStatus(data).success(function(result) {
                    $scope.$watch('assignmentDetail', function(newValue, oldValue) {
                        if ($scope.assignmentDetail.assignmentStatus) {
                            $scope.assignmentDetail.assignmentStatus = 'Started';
                            bookingDetails.updateAssignmentStatus(data).success(function(result) {
                                $scope.reason = {};
                            });  
                        }
                    });
                });  
            }
            $scope.updateAssignmentStatus = function(assignmentStatus){
                if (confirm("Are you sure! you want to change the assignment Status?")) {
                   var data = {};
                    data.assignment_id = $stateParams.assignmentID;
                    data.assignmentStatus = assignmentStatus;
                    data.statusBy = $scope.user.id;
                    
                    $scope.$watch('assignmentDetail', function(newValue, oldValue) {
                        if ($scope.assignmentDetail.assignmentStatus) {
                            $scope.assignmentDetail.assignmentStatus = assignmentStatus;
                            bookingDetails.updateAssignmentStatus(data).success(function(result) {
                            });  
                        }
                    });
                }
            }
        
            $scope.chatbox = false; 
            $scope.boxaction = function(){
                    $scope.chatbox = true;     
                    $scope.userLoginID = $scope.assignmentDetail.jobId.user_id;
                    $scope.prfileUserID = $scope.assignmentDetail.performerId.id;
                    $scope.seletedJob.jobID = $scope.assignmentDetail.jobId.id;
            };
    
}).controller('bookingListCustomerController', function($scope, $state, $rootScope, $location, $stateParams,CurrentUser, bookingDetails) {

        $scope.user = CurrentUser.user();
        $scope.showVal = false;
        
        // To Dispaly all Performers & Pagination Settings
        $scope.currentPage = 1;
        $scope.maxSize = 1;
        $scope.itemsPerPage = 10;
       
        bookingDetails.jobAssigneeCount($scope.user.id).then(function(count) {
            $scope.totalItems = parseInt(count.data.count);
            $scope.currentPage = 1;
            $scope.maxSize = 1;
            $scope.itemsPerPage = 10;
            $scope.numofPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
            if ($scope.totalItems < 1) {
                $scope.showVal = true;
                $scope.value = "No Records Found";
                console.log("Valur",$scope.showVal)
            } 
            $scope.$watch('currentPage + itemsPerPage', function () {
                var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
                bookingDetails.getBookingDetails({begin: begin}).then(function(result) {
                    $scope.bookingDetailsData = result.data.jobAssignment;
                });
            });
        });
}).controller('JobListPerformerController', function($scope, $state, $rootScope, $location, $stateParams,CurrentUser, bookingDetails) {


        $scope.user = CurrentUser.user();
        //For Rating Settings
        $scope.rate = 2;
        $scope.max = 5;
        $scope.isReadonly = false;
        $scope.showVal = false;
        // To Dispaly all Performers & Pagination Settings
        $scope.currentPage = 1;
        $scope.maxSize = 1;
        $scope.itemsPerPage = 10;
       // console.log($scope.user);
        bookingDetails.performerJobCount($scope.user.id).then(function(count) {
            $scope.totalItems = parseInt(count.data.count);
            $scope.currentPage = 1;
            $scope.maxSize = 1;
            $scope.itemsPerPage = 10;
            $scope.numofPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
            if ($scope.totalItems < 1) {
                $scope.showVal = true;
                $scope.value = "No Records Found";
                console.log("Valur",$scope.showVal)
            } 
            $scope.$watch('currentPage + itemsPerPage', function () {
            
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
            
            bookingDetails.performerJobs({begin: begin}).then(function(result) {
                $scope.bookingDetailsData = result.data.jobAssignment;
            });
       
        });
        });
}).controller('bookingDetailPerformerController', function($scope, $state, $rootScope, $location, $stateParams, CurrentUser, bookingDetails, Job) {
            $scope.user = CurrentUser.user();
            $scope.assignmentDetail = {};
            
            $scope.userLoginID = "";
            $scope.prfileUserID = "";
            $scope.seletedJob = {};
            $scope.assignmentID = $stateParams.assignmentID;
            bookingDetails.getJobInfo($stateParams.assignmentID).success(function(result) {
                $scope.assignmentDetail = result.jobAssignment;
            });
                
            $scope.updateAssignmentStatus = function(assignmentStatus){
                if (confirm("Are you sure! you want to change the assignment Status?")) {
                    var data = {};
                    data.assignment_id = $stateParams.assignmentID;
                    data.assignmentStatus = assignmentStatus;
                    data.statusBy = $scope.user.id;
                    $scope.$watch('assignmentDetail', function(newValue, oldValue) {
                        if ($scope.assignmentDetail.assignmentStatus) {
                            $scope.assignmentDetail.assignmentStatus = assignmentStatus;
                            bookingDetails.updateAssignmentStatus(data).success(function(result) {
                                
                            });  
                        }
                    });
                }
            }
            
            $scope.messages = {};
            $scope.jobMessages = [];
            var reloadData = function() {
                Job.getDisputeMsg({assignmentId: $stateParams.assignmentID}).success(function(result){
                    $scope.jobMessages = result.jobMessages;
                });
            }
            reloadData();
            // To save Messages on Dispute
            $scope.saveMessage = function(msg){
                if (msg) {
                    
                    //$scope.jobMessages.splice(0,0,{message:msg.messag});
                    $scope.messages.message = msg.messag;
                    $scope.messages.jobId = $scope.assignmentDetail.jobId.id;
                    $scope.messages.userId = $scope.user.id;
                    $scope.messages.assignmentId = $stateParams.assignmentID;
                    
                    Job.saveDisputeMsg($scope.messages).success(function(result){
                        $scope.messages = {};
                        reloadData();
                    });
                }
            }
            $scope.chatbox = false; 
            $scope.boxaction = function(){
                    $scope.chatbox = true;     
                    $scope.userLoginID = $scope.assignmentDetail.performerId.id;
                    $scope.prfileUserID = $scope.assignmentDetail.hostId.id;
                    $scope.seletedJob.jobID = $scope.assignmentDetail.jobId.id;
            };
    
});