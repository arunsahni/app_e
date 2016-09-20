angular.module('app')
  .controller('PaymentController', function($scope, $state, $rootScope, paymentService) {
  	      $scope.key = {};
var reloadData = function(){

  if($state.current.name == 'user.performerPayments') {
  $rootScope.alerts = [];
  $scope.maxSize = 5;
  $scope.bigTotalItems = 4;
  $scope.bigCurrentPage = 1;
  $scope.itemsPerPage = 10;
  $scope.sortDir = 'desc';
  $scope.sortBy = 'createdAt';

  paymentService.getCount().then(function(result) {
   $scope.bigTotalItems = result.data.count;
  });

  paymentService.getPaymentData($scope.bigCurrentPage, $scope.itemsPerPage, $scope.sortBy, $scope.sortDir, $scope.text).then(function(result) {
   $scope.Data = result.data;
  });


  $scope.setPage = function (pageNo) {
   $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
   paymentService.getPaymentData($scope.bigCurrentPage, $scope.itemsPerPage, $scope.sortBy, $scope.sortDir).then(function(result) {
      $scope.Data = result.data;
     if(Object.keys($scope.Data).length == 0) {
           $rootScope.alerts.push("No Data Found");
        }
   });
  };

  $scope.sort = function(sortBy) {
    console.log(sortBy);
   $scope.sortDir = ($scope.sortDir == 'desc') ? 'asc' : 'desc';
   $scope.sortBy = sortBy;
   $scope.pageChanged();
    paymentService.getPaymentData($scope.bigCurrentPage, $scope.itemsPerPage, $scope.sortBy, $scope.sortDir, $scope.text).then(function(result) {
  $scope.Data = result.data;
  });
 };

 $scope.sortFilter = function(filter) {
    paymentService.getFilterJobs(filter).then(function(result) {
  $scope.Data = result.data;
  });
 };
    }
  };
  reloadData();
  	$scope.search = function() {
        $rootScope.alerts = [];
        $rootScope.alerts = [];
        if($scope.key == undefined || $scope.key.startKey == "" || $scope.key.endKey == "")
        {
           reloadData();
        } else {
       paymentService.searchData($scope.key).success(function(result) {
        $scope.Data = result.data;
         if(Object.keys($scope.Data).length == 0) {
           $rootScope.alerts.push("No Data Found with selected date");
        }
      }).error(function(err) {
      	console.log(err.msg)
      	 $rootScope.alerts.push(err.msg);
      });  
     }
    };
    $scope.clearData = function() {
  $state.go($state.current, {}, {reload: true});
    };

    $scope.deleteMultiple = function(data) {
    	
       var arr = []; 
         var a = confirm("Do you really want to delete payment details!");
         if(a) {
         
       for(var i in data){
             console.log(data[i]);    
             if(data[i].SELECTED==1){
             	       
                         arr.push(data[i].id);       
         }
     }
    paymentService.deleteMultiple(arr).success(function(result)
    {
    	
               reloadData();
    }).error(function(err) {
         $rootScope.alerts.push(err.msg);
      });
  }
};

     $scope.closeAlert = function(index) {
      $rootScope.alerts.splice(index, 1);
    };
})
//Performer Payment controller end

//subscription Payment controller start

.controller('subscriptionPaymentController', function($scope, $state, $rootScope,$location, 
  bookingService,CurrentUser,AccessLevels,paymentService) {
     $scope.subscriptionData = {};
     $scope.goldprice = 1;    
     $scope.platinumprice = 2;
     
     $scope.initiateSubscription = function(subscriptionName) {
     $scope.user = CurrentUser.user;   
        //alert($rootScope.recurringId);
       if(subscriptionName){
           var conmsg = "Are you sure! you want to proceed with "+subscriptionName+" plan?";
           if($rootScope.activegold || $rootScope.activeplatinum){
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
                    $scope.subscriptionData.userId = $scope.user().id;
                    $scope.subscriptionData.hostName = $location.protocol()+"://"+$location.host()+":"+$location.port();
                    $scope.subscriptionData.successURL = $location.protocol()+"://"+$location.host()+":"+$location.port()+"/#/performer/subscriptionsPayment";
                    $scope.subscriptionData.cancelURL = $location.absUrl();
                    $scope.subscriptionData.recuringId = $rootScope.recurringId;

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
   })
//subscription Payment controller end

//performer subscrition payment controller start

.controller('subscriptionPaymentListingController', function($scope, $state, $rootScope,$location, 
  bookingService,CurrentUser,AccessLevels,paymentService) {
                $scope.key = {};

  var reloadData = function(){
              $scope.key = {};

  $rootScope.alerts = [];
  $scope.maxSize = 5;
  $scope.bigTotalItems = 4;
  $scope.bigCurrentPage = 1;
  $scope.itemsPerPage = 10;
  $scope.sortDir = 'desc';
  $scope.sortBy = 'createdAt';
  paymentService.getSubscriptionsCount().then(function(result) {
   $scope.bigTotalItems = result.data.count;
  });

  paymentService.getSubscriptionsPaymentData($scope.bigCurrentPage,
   $scope.itemsPerPage, $scope.sortBy, $scope.sortDir, $scope.text).then(function(result) {
   $scope.Data = result.data;
  });


  $scope.setPage = function (pageNo) {
   $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
   paymentService.getSubscriptionsPaymentData($scope.bigCurrentPage, $scope.itemsPerPage, $scope.sortBy, $scope.sortDir).then(function(result) {
      $scope.Data = result.data;
     if(Object.keys($scope.Data).length == 0) {
           $rootScope.alerts.push("No Data Found");
        }
   });
  };

  $scope.sort = function(sortBy) {
    console.log(sortBy);
   $scope.sortDir = ($scope.sortDir == 'desc') ? 'asc' : 'desc';
   $scope.sortBy = sortBy;
   $scope.pageChanged();
    paymentService.getPaymentData($scope.bigCurrentPage, $scope.itemsPerPage, $scope.sortBy, $scope.sortDir, $scope.text).then(function(result) {
  $scope.Data = result.data;
  });
 };

 $scope.sortFilter = function(filter) {
    paymentService.getFilterJobs(filter).then(function(result) {
  $scope.Data = result.data;
  });
 };
    
  };
  reloadData();
    $scope.search = function() {
        $rootScope.alerts = [];
        $rootScope.alerts = [];
        console.log($scope.key);
        if($scope.key == undefined || $scope.key.startKey == "" || $scope.key.endKey == "")
        {
           reloadData();
        } else {
       paymentService.searchSubscriptionsData($scope.key).success(function(result) {
        $scope.Data = result.data;
         if(Object.keys($scope.Data).length == 0) {
           $rootScope.alerts.push("No Data Found with selected date");
        }
      }).error(function(err) {
        console.log(err.msg)
         $rootScope.alerts.push(err.msg);
      });  
     }
    };
    $scope.clearData = function() {
  $state.go($state.current, {}, {reload: true});
    };
     $scope.closeAlert = function(index) {
      $rootScope.alerts.splice(index, 1);
    };    
    
});

