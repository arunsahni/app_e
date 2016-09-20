angular.module('app')
  .controller('PerformersController', function($scope, $state , $rootScope, Profiles, $location,CurrentUser,$stateParams,Job,uploadService,bookingService,AccessLevels) {
                       
                     
                      $scope.myPopover = {
                        isOpen: false,
                        templateUrl: 'myPopoverTemplate.html',
                        open: function open() {
                          $scope.myPopover.isOpen = true;
                        },
                        close: function close() {
                          $scope.myPopover.isOpen = false;
                        }
                      };
  
                        //alert(AccessLevels.bookingEngineHire);
                        $scope.hirebox = false;
                        $scope.chatbox = false;
                        $scope.user = CurrentUser.user;
                        $scope.userRole = $scope.user().role;
                        $scope.userLoginID = $scope.user().id;
                        $scope.prfileUserID = $stateParams.uId;
                        
                        if($state.current.name == 'user.performerProfileView'){
                            $scope.prfileUserID = $scope.user().id;
                        }
                        
                        $scope.performerInfo = {};
                        Profiles.getProfileData($scope.prfileUserID).then(function(result) {
                            $scope.performerData = result.data;
                            //console.log($scope.performerData);
                            
                            $scope.performerInfo.workPrice = $scope.performerData.workPrice;
                            $scope.performerData.feature_guarantee = $scope.performerData.feature_guarantee;
                        });
                        
                        $scope.portFolioData = {};
                        uploadService.getPortfolioImgData($scope.prfileUserID).then(function(result) {
                            $scope.portFolioData = result.data;
                             //$(".group4").colorbox({rel:'group4', slideshow:false});
                        });
                        
                        $scope.JobList =  {};
                        if($scope.user().role =='Customer'){
                            Job.getMyNewJobs().then(function(result) {
                                if(result.data.jobsData){
                                    $scope.JobList = result.data.jobsData;
                                }
                            //console.log($scope.JobList);
                            });
                            
                            var negoData = {};
                            $scope.initNegotiation = function(){
                                
                                if(!$scope.seletedJob.jobID){
                                    alert('Please select a job to start negotiation');
                                }else if(!$scope.prfileUserID || !$scope.userLoginID){
                                    alert('Invalid request');
                                }else{
                                    negoData.jobId = $scope.seletedJob.jobID;
                                    negoData.performerId = $scope.prfileUserID;
                                    negoData.hostId = $scope.userLoginID;
                                    negoData.agreedPrice = $scope.performerInfo.workPrice;
                                    Job.createNegotiation(negoData).then(function(result) {
                                        
                                        $scope.chatbox = true;
                                        $scope.hirebox = false;
                                        
                                    });
                                }
                            }
                            
                            $scope.initNegotiationHiring = function(){
                                
                                if(!$scope.seletedJob.jobID){
                                    alert('Please select a job to hire');
                                }else if(!$scope.prfileUserID || !$scope.userLoginID){
                                    alert('Invalid request');
                                }else{
                                    Job.getAgreedAmount($scope.seletedJob.jobID,$scope.prfileUserID).success(function(result) {
                                            if(result.amount > 0){
                                                $scope.performerInfo.workPrice = result.amount;
                                            }
                                    });
                                }
                            }
                        }
                        
                        
                        if($location.search().lnkaction=='hire'){
                            $scope.hirebox = true;
                            $scope.chatbox = false;
                        }else if($location.search().lnkaction=='chat'){
                            /*$scope.chatbox = true;
                            $scope.hirebox = false;*/
                            $scope.hirebox = true;
                            $scope.chatbox = false;
                        }
                        //console.log('----===',$location);
                        $scope.boxaction = function(actionName){
                                
                                if(actionName=='hire'){
                                    $scope.initNegotiationHiring();
                                    $scope.hirebox = true;
                                    $scope.chatbox = false;
                                }else if(actionName=='chat'){
                                    $scope.initNegotiation();
                                }else{
                                    $scope.hirebox = false;
                                    $scope.chatbox = false;
                                }
                        };
                        $scope.seletedJob = {};
                        $scope.seletedJob.jobID = "";
                        $scope.setJobToProcess = function(){
                            if($scope.seletedJob.jobID){
                                //console.log('chatbox',$scope.chatbox);
                            }else{
                                    $scope.hirebox = true;
                                    $scope.chatbox = false;
                            }
                        };
                        $scope.performerInfo.acceptTerm= "";
                        $scope.initiateBooking = function(){
                            if(!$scope.seletedJob.jobID){
                                alert('Please select a job to hire');
                            }else{
                                $scope.bookingData = {};
                                $scope.bookingData.jobId = $scope.seletedJob.jobID;
                                $scope.bookingData.userId = $scope.prfileUserID;
                                $scope.bookingData.bookingBy = $scope.userLoginID;
                                $scope.bookingData.agreedPrice = $scope.performerInfo.workPrice;
                                
                                $scope.bookingData.hostName = $location.protocol()+"://"+$location.host()+":"+$location.port();
                                $scope.bookingData.successURL = $location.protocol()+"://"+$location.host()+":"+$location.port()+"/#/jobs/myBokinglist";
                                $scope.bookingData.cancelURL = $location.absUrl();
                                
                                if($scope.performerData.feature_guarantee==true){
                                    $scope.bookingData.assignmentUnderSatisfaction = true;
                                }else{
                                    $scope.bookingData.assignmentUnderSatisfaction = false;
                                }
                                
                                if($scope.performerData.performerRequirement.length > 0){
                                    if($scope.performerInfo.acceptTerm==true){
                                        //hiring process will start
                                        if(parseFloat($scope.performerInfo.workPrice) > 0){
                                            //alert("Initiating request to booking engine ..1");
                                            //console.log($scope.bookingData);
                                            bookingService.creatTempDataForBooking($scope.bookingData).then(function(result) {
                                                if(result.data.message=='already'){
                                                    alert(result.data.message);
                                                }else if(result.data.message=='error'){
                                                    alert(result.data.message);
                                                }else if(result.data.message=='success'){
                                                    //alert(result.data.tempId);
                                                    window.location.href = AccessLevels.bookingEngineHire+'/'+result.data.tempId;
                                                }
                                            });
                                            //window.location.href ='http://localhost:1338/#/hire';
                                        }else{
                                            alert('Invalid amount');
                                        }
                                    }else{
                                        alert('Please accept the terms before hiring');
                                    }
                                }else{
                                        if(parseFloat($scope.performerInfo.workPrice) > 0){
                                            
                                             bookingService.creatTempDataForBooking($scope.bookingData).then(function(result) {
                                                if(result.data.message=='already'){
                                                    alert(result.data.message);
                                                }else if(result.data.message=='error'){
                                                    alert(result.data.message);
                                                }else if(result.data.message=='success'){
                                                    //alert(result.data.tempId);
                                                    window.location.href = AccessLevels.bookingEngineHire+'/'+result.data.tempId;
                                                }
                                            });
                                            
                                        }else{
                                            alert('Invalid amount');
                                        }
                                }
                            }
                        };
                      // To display performer review
                      $scope.reviews = [];
                      Job.getReviews($scope.prfileUserID).success(function(result){
                          $scope.reviews = result.performerReview;
                          
                          /*var countRatings = 0;
                          angular.forEach($scope.reviews, function(value){
                               countRatings = countRatings + value.reviewRating;
                          });
                          $scope.totalRatings = countRatings;
                          */
                      });
                    
});