angular.module('app')
  .controller('CompanyController', function($scope, $localStorage, $state, $rootScope, $stateParams, CurrentUser, CompanyService, Flash) {
    $localStorage.$reset();
    $scope.user1 = undefined; 
    $scope.user1 = CurrentUser.user();
    $scope.user = {};
    $scope.userRequ = {};
    $scope.userRequ.performerRequirement = {};
    $scope.userCat = {};
    $scope.userCat.servingCategory = {};

$scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };
$scope.pageChanged = function() {
      CompanyService.getAllPerformer($scope.bigCurrentPage, $scope.itemsPerPage, $scope.sortBy, $scope.sortDir,$scope.text).then(function(result) {
        $scope.performerData = result.data;
      });
    };
$scope.sort = function(sortBy) {
      $scope.sortDir = ($scope.sortDir == 'desc') ? 'asc' : 'desc';
      $scope.sortBy = sortBy;
      $scope.pageChanged();
    };
$scope.search = function(text) {
      $scope.text = text;
      $scope.pageChanged();
    };
    var reloadData = function() {
    if($state.current.name == 'user.companyManagePerformers') {
    $scope.maxSize = 5;
    $scope.bigTotalItems = 4;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage = 10;

    $scope.sortDir = 'desc';
    $scope.sortBy = 'createdAt';

    $scope.text="";

    CompanyService.getCount().then(function(result) {
      $scope.bigTotalItems = result.data.count;
      });
          $scope.pageChanged();
   }
};
    reloadData();

      if($state.current.name == 'user.editPerformer') {
          CompanyService.getPerformer($stateParams.performerId).success(function(result) {
                $scope.user = result.data;
                      if(result.data.servingCategory){
         if(result.data.servingCategory.length > 0){
          for (var i=0; i < result.data.servingCategory.length; i++ ){
              $scope.userCat.servingCategory[i] = result.data.servingCategory[i];
          }
        
        }
     }
      
     if(result.data.performerRequirement){
         if(result.data.performerRequirement.length > 0){
          
          for (var i=0; i < result.data.performerRequirement.length; i++ ){
              $scope.userRequ.performerRequirement[i] = result.data.performerRequirement[i];
          }
        
        }
     }
     if(!$scope.user.chatAvail) $scope.user.chatAvail = "1";
     if(!$scope.user.pricingTerm) $scope.user.pricingTerm = "Negotiable";
            }).error(function(err){
             Flash.create('danger', err.msg, 'custom-class');
            });          
      }
      if($state.current.name == 'user.AddPerformer') {
   if(!$scope.user.chatAvail) $scope.user.chatAvail = "1";
   if(!$scope.user.pricingTerm) $scope.user.pricingTerm = "Negotiable";
 }
$scope.addPerformer = function() {
       $scope.user.performerRequirement = [];
       $scope.user.servingCategory = [];
      for (variable in $scope.userCat.servingCategory) {
                if($scope.userCat.servingCategory[variable]){
                    $scope.user.servingCategory.push($scope.userCat.servingCategory[variable]);
                }
      }
      
      for (variable in $scope.userRequ.performerRequirement) {
                if($scope.userRequ.performerRequirement[variable]){
                    $scope.user.performerRequirement.push($scope.userRequ.performerRequirement[variable]);
                }
      }       
      CompanyService.addPerformer($scope.user).success(function(result) {
        var message = 'Performer Add successfully.';
            Flash.create('success', message, 'custom-class');
        //$state.go('user.companyDashboard');
      }).error(function(err) {
        if(err.msg.invalidAttributes == undefined) {
          Flash.create('danger', err.msg, 'custom-class');
        } else {
        var errors = err.msg.invalidAttributes.email[0].message;
           Flash.create('danger', errors, 'custom-class');
      }
      });
    };
$scope.deletePerformer = function(id) {
      var a = confirm("Do you really want to delete performer!");
         if(a != false) {
      CompanyService.deletePerformer(id).success(function(result) {
            reloadData();
            var message = 'Performer delete successfully.';
            Flash.create('success', message, 'custom-class'); 
      }).error(function(err){
          Flash.create('danger', err.msg, 'custom-class');
      });
     }
    };
$scope.edit = function(id) {
      $state.go('user.editPerformer',{performerId : id});
    };
$scope.savePerformer = function() {        
       $scope.user.performerRequirement = [];
       $scope.user.servingCategory = [];
      
      for (variable in $scope.userCat.servingCategory) {
                if($scope.userCat.servingCategory[variable]){
                    $scope.user.servingCategory.push($scope.userCat.servingCategory[variable]);
                }
      }
      
      for (variable in $scope.userRequ.performerRequirement) {
                if($scope.userRequ.performerRequirement[variable]){
                    $scope.user.performerRequirement.push($scope.userRequ.performerRequirement[variable]);
                }
      }
           CompanyService.savePerformer($scope.user).success(function(result) {
            var message = 'Information updated successfully.';
            Flash.create('success', message, 'custom-class');
          $state.go('user.editPerformer');
        }).error(function(err) {
        });        
    }
/*$scope.viewPerformer = function(id) {
      $state.go('anon.performerProfile', {uId: id});
    }
*/
$scope.clearData = function() {
  $state.go($state.current, {}, {reload: true});
} 
$scope.deleteMultiple = function(data) {
        var arr = []; 
      
        // if(a != false) {    
         for(var i in data){  

             if(data[i].Selected=='1'){
                         arr.push(data[i].id);       
         }
     }
    if(arr.length>0) {
        var a = confirm("Do you really want to delete selected Performer ?");
        if(a != false) {    
      CompanyService.deleteMultiple(arr).success(function(result)
    {
               $scope.selectedAll = false;
               reloadData();
    }).error(function(err) {
         $rootScope.alerts.push(err.msg);
      });  
    }
  }
};

$scope.checkAll = function (source) {
        
        if ($scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.performerData, function (performer) { 
            performer.Selected = $scope.selectedAll;
        });
    };
$scope.changeStatus = function(id , status) {
  var a = confirm('Do you really want to change status of selected performer ?');
  if(a!= false) {
CompanyService.changeStatus(id, status).success(function(result) {
               reloadData();
     });
  }
 }
$scope.setPerformer = function(id, name) {
  $localStorage.performerId = id;
  $localStorage.performerName = name; 
  $state.go('user.comapnyPerformerjobs');
} 
})//##


angular.module('app').controller('TypeaheadCtrl', function($scope, $localStorage, $http, CompanyService) {
       $scope.selected = undefined;
       CompanyService.getAllPerformerAuto().then(function(result) {
        $scope.performerData = result.data.data;
        //$scope.PerformerData =  $localStorage.performerData;
      });
    
})//##
//company controller end

//portfolio image controller start

.controller('PortfolioCompanyImgController', function ($scope, $localStorage ,$rootScope, $state, uploadService, $log, $stateParams, CompanyService) {
      $localStorage.$reset();
      $scope.performerd = {};
      $scope.selected = undefined;
          CompanyService.getAllPerformerAuto().then(function(result) {
          $scope.performerData = result.data.data;
        });
$scope.clear = function()
    {
      $state.go($state.current, {}, {reload: true});
     }
$scope.getImage = function(id, name) {
       $localStorage.performerId = id;
       $scope.performerd.id = id;
        uploadService.getPortfolioImgData($localStorage.performerId).then(function (result) {
        $scope.portfolioImg = result;
      });
  }
  
$scope.uploadImg = function () {
          angular.element('#upload').trigger('click');
     }
$scope.onBlur = function ($event, id) {
         uploadService.updatePortfolioImgDescription($localStorage.performerId, $event.currentTarget.value).then(function (result) {
        });
     }
$scope.deleteImg = function (id,$event)
     {
             uploadService.deletePortfolioImg(id).then(function (result) {
              uploadService.getPortfolioImgData($localStorage.performerId).then(function (result) {
                $scope.portfolioImg = result;
              });
         });
     }
$scope.portfolioImageUpload = function ($files)
      {
          if ($files.length > 0)
          {
              for (var i = 0; i < $files.length; i++)
                {
                $scope.uploadFileService($files[i]);
               }

         }
     },
$scope.uploadFileService = function (file)
             {
                var formData = new FormData();
                formData.append('file', file);
                uploadService.uploadCompanyPortfolioImg($localStorage.performerId,formData).success(function (result) {
                uploadService.getPortfolioImgData($localStorage.performerId).then(function (result) {
                $scope.portfolioImg = result;
              });
         });
      }
})//##
//company portfilio image controller end

//company  porfolio video controller start

.controller('PortfolioCompanyVideoController', function ($scope, $localStorage, $rootScope, $state, uploadService, CompanyService, $stateParams, $log) {
      $localStorage.$reset();
      $scope.performerd = {};

    if($localStorage.performerId == undefined) {
            $scope.selected = undefined;
            CompanyService.getAllPerformerAuto().then(function(result) {
             $scope.performerData = result.data.data;
         });
     } else {
               $scope.performer.id = $localStorage.performerId;
         }
$scope.clear = function() {
                $state.go($state.current, {}, {reload: true});
  },
$scope.getVideo = function (id) {
           $localStorage.performerId=id;
           $scope.performerd.id = id;
           uploadService.getPortfolioVideoData($localStorage.performerId).then(function (result) {
              $scope.portfolioVideo = result;
       });
  },
$scope.uploadVideo = function () {
         angular.element('#upload').trigger('click');
  },
$scope.onBlur = function ($event, id) {
        uploadService.updatePortfolioVideoDescription($localStorage.performerId, $event.currentTarget.value).then(function (result) {
        });
  },
$scope.deleteVideo = function (id,$event) {
             uploadService.deletePortfolioVideo(id).then(function (result) {
             uploadService.getPortfolioVideoData($localStorage.performerId).then(function (result) {
             $scope.portfolioVideo = result;
            });
       });
  },
$scope.portfolioVideoUpload = function ($files)
            {
               if ($files.length > 0)
                 {
                     for (var i = 0; i < $files.length; i++)
                       {
                           $scope.uploadFileService($files[i]);
                        }
                    }
  },
$scope.uploadFileService = function (file)
              {
                 var formData = new FormData();
                  formData.append('file', file);
                  uploadService.uploadCompanyPortfolioVideo($localStorage.performerId,formData).success(function (result) {
                  uploadService.getPortfolioVideoData($localStorage.performerId).then(function (result) {
                  $scope.portfolioVideo = result;
              });
        });
  }

})//##

//company portfolio video controller end

//company payment controller start

.controller('CopanyPaymentController', function ($scope, CompanyService, $localStorage, $rootScope, $state, paymentService, $stateParams, $log) {
        $scope.key = {};
        $scope.selectedAll = false;
        var checkKey = undefined;
    CompanyService.getAllPerformerAuto().then(function(result) {
             $scope.performerData = result.data.data;
 });
$scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
 };
$scope.searchByName = function(id) {
      $scope.text= id;
      if(checkKey) {

         $scope.search ();
    } else {
      paymentService.getCompanyPaymentPerformerData($scope.bigCurrentPage, $scope.itemsPerPage, $scope.text).then(function(result) {
      $scope.Data = result.data;
        if(Object.keys($scope.Data).length == 0) {
             $rootScope.alerts.push("No Data Found");
         } 
      });
    }
    };

$scope.pageChanged = function() {
       paymentService.getCompanyPaymentData($scope.bigCurrentPage, $scope.itemsPerPage, $scope.sortBy, $scope.sortDir).then(function(result) {
      $scope.Data = result.data;
        if(Object.keys($scope.Data).length == 0) {
             $rootScope.alerts.push("No Data Found");
         } 
    });
};

$scope.sort = function(sortBy) {
     $scope.sortDir = ($scope.sortDir == 'desc') ? 'asc' : 'desc';
     $scope.sortBy = sortBy;
     $scope.pageChanged();
};

var reloadData = function(){
  $rootScope.alerts = [];
  $scope.maxSize = 5;
  $scope.bigTotalItems = 4;
  $scope.bigCurrentPage = 1;
  $scope.itemsPerPage = 10;
  $scope.sortDir = 'desc';
  $scope.sortBy = 'jobStatus';

    paymentService.getCompanyCount().then(function(result) {
    $scope.bigTotalItems = result.data.count;
  });
      $scope.pageChanged();

};
  reloadData();

$scope.search = function() {
      $rootScope.alerts = [];
      $rootScope.alerts = [];
      checkKey = $scope.key;
   if($scope.key == undefined || $scope.key.startKey == "" || $scope.key.endKey == "" || $scope.key.endKey == undefined || $scope.key.startKey == undefined) {
            $scope.pageChanged();
    } else {  
               if ($scope.text) {
                $scope.key.text =  $scope.text;
               }
           paymentService.searchCompanyData($scope.key).success(function(result) {
           $scope.Data = result.data;
   if(Object.keys($scope.Data).length == 0) {
          $rootScope.alerts.push("No Data Found with selected date");
    }
      }).error(function(err) {
         $rootScope.alerts.push(err.msg);
      });  
  }
};
$scope.clearData = function() {
  $scope.text = undefined;
     $state.go($state.current, {}, {reload: true});
};
$scope.AllPerformer = function() {
  $scope.text = undefined;
  $scope.key.text = undefined;  
     $scope.search();
};
$scope.deleteMultiplePayment = function(data) {
        var arr = []; 
      
        // if(a != false) {    
         for(var i in data){  
             if(data[i].Selected=='1'){
                         arr.push(data[i].id);       
         }
     }
    if(arr.length>0) {

        var a = confirm("Do you really want to delete Selected Performer!");
        if(a != false) {    
       paymentService.deleteMultiple(arr).success(function(result)
    {
               $scope.selectedAll = true;
        $scope.pageChanged(); 
    }).error(function(err) {
         $rootScope.alerts.push(err.msg);
      });  
    }
  }
};

$scope.checkAll = function (source) {
        if (!$scope.selectedAll) {

            $scope.selectedAll = true;
        } else { 

            $scope.selectedAll = false;
        } 
        angular.forEach($scope.Data, function (payData) { 
            payData.Selected = $scope.selectedAll;
        });
    };

  })//##
//company payment controller end

//company subscrition paymant controller start

.controller('CopanySubscritionPaymentController', function ($scope, CompanyService, $localStorage, $rootScope, $state, paymentService, $stateParams, $log) {
        $scope.key = {};
        var checkKey = undefined;
        $scope.selectedAll = false;
    CompanyService.getAllPerformerAuto().then(function(result) {
             $scope.performerData = result.data.data;
 });
$scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
 };
$scope.searchByName = function(id) {
      $scope.text= id;
   if(checkKey) {

         $scope.search ();
    } else {
      paymentService.getCompanyPaymentPerformerSubData($scope.bigCurrentPage, $scope.itemsPerPage, $scope.text).then(function(result) {
      $scope.Data = result.data;
        if(Object.keys($scope.Data).length == 0) {
             $rootScope.alerts.push("No Data Found");
         } 
       });
     }
    };

$scope.pageChanged = function() {
       paymentService.getCompanyPaymentPerformerSubData($scope.bigCurrentPage, $scope.itemsPerPage, $scope.sortBy, $scope.sortDir).then(function(result) {
      $scope.Data = result.data;
        if(Object.keys($scope.Data).length == 0) {
             $rootScope.alerts.push("No Data Found");
         } 
    });
};


var reloadData = function(){
      $rootScope.alerts = [];
      $scope.maxSize = 5;
      $scope.bigTotalItems = 4;
      $scope.bigCurrentPage = 1;
      $scope.itemsPerPage = 10;
    
        paymentService.getCompanySubCount().then(function(result) {
        $scope.bigTotalItems = result.data.count;
      });
          $scope.pageChanged();

};
  reloadData();

$scope.search = function() {
      $rootScope.alerts = [];
      $rootScope.alerts = [];
      checkKey = $scope.key;
   if($scope.key == undefined || $scope.key.startKey == "" || $scope.key.endKey == "" || $scope.key.endKey == undefined || $scope.key.startKey == undefined) {
            $scope.pageChanged();
    } else {  
               if ($scope.text) {
                $scope.key.text =  $scope.text;
               }
           paymentService.searchCompanySubData($scope.key).success(function(result) {
           $scope.Data = result.data;
   if(Object.keys($scope.Data).length == 0) {
          $rootScope.alerts.push("No Data Found with selected date");
    }
      }).error(function(err) {
         $rootScope.alerts.push(err.msg);
      });  
  }
};
$scope.clearData = function() {
  $scope.text = undefined;
     $state.go($state.current, {}, {reload: true});
     };
$scope.AllPerformer = function() {
     $scope.text = undefined;
     $scope.key.text = undefined;  
     $scope.search();
};
$scope.deleteMultiplePayment = function(data) {
        var arr = []; 
               for(var i in data){  
             if(data[i].Selected=='1'){
                         arr.push(data[i].id);       
         }
     }
    if(arr.length>0) {

        var a = confirm("Do you really want to delete Selected Performer!");
        if(a != false) {    
       paymentService.deleteMultiple(arr).success(function(result)
    {
               $scope.selectedAll = true;
               $scope.pageChanged(); 
    }).error(function(err) {
         $rootScope.alerts.push(err.msg);
      });  
    }
  }
};

$scope.checkAll = function (source) {
        if (!$scope.selectedAll) {
            $scope.selectedAll = true;
        } else { 
            $scope.selectedAll = false;
        } 
        angular.forEach($scope.Data, function (payData) { 
            payData.Selected = $scope.selectedAll;
        });
    };

  })//##
// CopanySubscritionPaymentController end 

// companySubscriptionPaymentController for payment  
.controller('companySubscriptionController', function($scope, $state, $rootScope,$location, 
  bookingService,CurrentUser,AccessLevels,paymentService,CompanyService) {
     $scope.subscriptionData = {};
     $scope.subscriptionEndDate = undefined;
     $scope.goldprice = 1;    
     $scope.platinumprice = 2;
     $scope.user = {};
      CompanyService.getAllPerformerAuto().then(function(result) {
             $scope.performerData = result.data.data;
 });
$scope.setPerformer = function(id) {
      $scope.user.id = id;
      $scope.subscriptionData = {};

        $scope.activegold = false;
        $scope.activesilver = false;
        $scope.activeplatinum = false;
        $scope.recurringId = '';
        $scope.subscriptionEndDate = '';
      
       CurrentUser.getActiveSubscription($scope.user.id).then(function(result) {
                if(result.data.type=='success'){
                    
                    $scope.activeSubscriptionData = result.data.subData;
                    if($scope.activeSubscriptionData){
                            $scope.subscriptionEndDate = $scope.activeSubscriptionData.subscriptionEndDate;
                            if($scope.activeSubscriptionData.paymentId){
                                $scope.recurringId = $scope.activeSubscriptionData.paymentId.recurringId;
                            }else{
                                $scope.recurringId = '';
                            }
        
                        if($scope.activeSubscriptionData.subscriptionName=='Gold'){
                            $scope.activegold = true;
                            $scope.activesilver = false;
                            $scope.activeplatinum = false;
                        }else if($scope.activeSubscriptionData.subscriptionName=='Platinum'){
                            $scope.activegold = false;
                            $scope.activesilver = false;
                            $scope.activeplatinum = true;
                        }else{
                            $scope.activegold = false;
                            $scope.activesilver = true;
                            $scope.activeplatinum = false;
                            $scope.subscriptionEndDate = '';
                            $scope.recurringId = '';
                        }
                    
                    }
                }else{
                            $scope.activegold = false;
                            $scope.activesilver = true;
                            $scope.activeplatinum = false;
                            $scope.subscriptionEndDate = '';
                            $scope.recurringId = '';
                        }
            });
    };
$scope.AllPerformer = function() {
      $scope.user = {};
      $scope.subscriptionData = {};
      $scope.subscriptionEndDate = undefined;
      $state.go($state.current, {}, {reload: true});
    };
$scope.initiateSubscription = function(subscriptionName) {
     //$scope.user = CurrentUser.user;   
        //alert($rootScope.recurringId);
       if(subscriptionName){
           var conmsg = "Are you sure! you want to proceed with "+subscriptionName+" plan?";
           if($scope.activegold || $scope.activeplatinum){
               var conmsg = "Are you sure! you want to change your active subscription with "+subscriptionName+" plan?";
           }
           
           if (confirm(conmsg)) {
               
               if(subscriptionName=='Platinum'){
                   $scope.subscriptionData.subscriptionAmount = $scope.platinumprice;
               }else if(subscriptionName=='Gold'){
                   $scope.subscriptionData.subscriptionAmount = $scope.goldprice;
               }else if(subscriptionName=='Silver'){
                   
                   alert('In progress');
                   
               }else{
                   $scope.subscriptionData.subscriptionAmount = $scope.platinumprice;
                   subscriptionName = 'Platinum';
               }
                if(subscriptionName!='Silver'){
                    
                    $scope.subscriptionData.subscriptionName = subscriptionName;
                    $scope.subscriptionData.billingMode = 'Month'; //Month
                    $scope.subscriptionData.userId = $scope.user.id;
                    $scope.subscriptionData.hostName = $location.protocol()+"://"+$location.host()+":"+$location.port();
                    $scope.subscriptionData.successURL = $location.protocol()+"://"+$location.host()+":"+$location.port()+"/#/company/subscriptionsPayment";
                    $scope.subscriptionData.cancelURL = $location.absUrl();
                    $scope.subscriptionData.recuringId = $scope.recurringId;

                    bookingService.creatTempDataForSubscription($scope.subscriptionData).then(function(result) {
                        if(result.data.message=='already'){
                            alert(result.data.message);
                        }else if(result.data.message=='error'){
                            alert(result.data.message);
                        }else if(result.data.message=='success'){
                            //alert(result.data.tempId);
                            window.location.href = AccessLevels.subscriptionEngine+'/'+result.data.tempId;
                        }
                    });
                    
                }
           }
       }else{
           alert('Please select the plan to proceed');
       }  
     };
      })//##
// companySubscriptionPaymentController for payment end
// company performer job list controller start
.controller('companyPerformerJobListController', function($scope,$localStorage, $state, $rootScope, $location, $stateParams,CurrentUser, bookingDetails) {
        $scope.user = {};
        $scope.user.id =  $localStorage.performerId;
        $scope.performerName = $localStorage.performerName;
        //For Rating Settings
        $scope.rate = 2;
        $scope.max = 5;
        $scope.isReadonly = false;
        $scope.showVal = false;
        // To Dispaly all Performers & Pagination Settings
        $scope.currentPage = 1;
        $scope.maxSize = 1;
        $scope.itemsPerPage = 10;
        bookingDetails.performerJobCount($scope.user.id).then(function(count) {
            $scope.totalItems = parseInt(count.data.count);
            $scope.currentPage = 1;
            $scope.maxSize = 1;
            $scope.itemsPerPage = 10;
            $scope.numofPages = Math.ceil($scope.totalItems / $scope.itemsPerPage);
            if ($scope.totalItems < 1) {
                $scope.showVal = true;
                $scope.value = "No Records Found";
            } 
            $scope.$watch('currentPage + itemsPerPage', function () {
            
            var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
            
            bookingDetails.companyPerformerJobs({begin: begin,id:$localStorage.performerId}).then(function(result) {
                $scope.bookingDetailsData = result.data.jobAssignment;
            });
       
        });
        });
}).controller('bookingDetailCompanyPerformerController', function($scope, $state, $localStorage, $rootScope, $location, $stateParams, CurrentUser, bookingDetails, Job) {
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
                    data.statusBy = $localStorage.performerId;
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
/*.controller('CompanyProfileController', function($scope, $localStorage, $http, CompanyService) {
       $scope.selected = undefined;
       CompanyService.getAllPerformerAuto().then(function(result) {
        $scope.performerData = result.data.data;
        //$scope.PerformerData =  $localStorage.performerData;
      });
    
})*///##