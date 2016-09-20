angular.module('app')
  .controller('NavController', function($scope, $rootScope, $state, $timeout, $location, Auth, CurrentUser, Categories) {
    $scope.isCollapsed = true;
    $scope.auth = Auth;
    $scope.user = CurrentUser.user;
    $rootScope.categoryDataAll = [];
    $rootScope.categoryData = [];
    $scope.search = [];
    $scope.currState = $state;
    $scope.mobileNavClass = '';
    
    $scope.unreadNotifications = {};
    //alert($scope.user().id);
    //console.log($scope.user());
    
    /*$scope.loadTopNotifications = function () {
    
        if($scope.user().id != undefined){

            CurrentUser.getunreadnotifications($scope.user().id).then(function(result) {
                //console.log(result);
                if(result.data.type=='success'){
                    $scope.unreadNotifications = result.data.unreadmsg;
                }else if(result.data.type=='nomsg'){
                    //$scope.unreadNotifications = result.unreadmsg;
                }
            });
        }
    
    }*/
    $rootScope.activeSubscriptionData = {};
    $rootScope.activegold = false;
    $rootScope.activesilver = false;
    $rootScope.activeplatinum = false;
    $rootScope.recurringId = '';
    $rootScope.subscriptionEndDate = '';
    
    
    
    $scope.loadActiveSubscription = function () {
    
        $rootScope.subscriptionTabDisplay = true;
        $rootScope.paymentTabDisplay = true;
        
        if($scope.user().id != undefined){
            
            //tab will be hide in case of company
            //console.log($scope.user().companyId);
            if($scope.user().companyId != undefined){
                if($scope.user().companyId && $scope.user().companyId !=0){
                    $rootScope.subscriptionTabDisplay = false;
                    $rootScope.paymentTabDisplay = false;   
                }
            }
            
            CurrentUser.getActiveSubscription($scope.user().id).then(function(result) {
                //console.log(result);
                if(result.data.type=='success'){
                    
                    $rootScope.activeSubscriptionData = result.data.subData;
                    
                    if($rootScope.activeSubscriptionData){
                            $rootScope.subscriptionEndDate = $rootScope.activeSubscriptionData.subscriptionEndDate;
                            //console.log($rootScope.activeSubscriptionData);
                            if($rootScope.activeSubscriptionData.paymentId){
                                $rootScope.recurringId = $rootScope.activeSubscriptionData.paymentId.recurringId;
                            }else{
                                $rootScope.recurringId = '';
                            }
                        if($rootScope.activeSubscriptionData.subscriptionName=='Gold'){
                            $rootScope.activegold = true;
                            $rootScope.activesilver = false;
                            $rootScope.activeplatinum = false;
                        }else if($rootScope.activeSubscriptionData.subscriptionName=='Platinum'){
                            $rootScope.activegold = false;
                            $rootScope.activesilver = false;
                            $rootScope.activeplatinum = true;
                        }else{
                            $rootScope.activegold = false;
                            $rootScope.activesilver = true;
                            $rootScope.activeplatinum = false;
                            $rootScope.subscriptionEndDate = '';
                            $rootScope.recurringId = '';
                        }
                    
                    }
                }else{
                            $rootScope.activegold = false;
                            $rootScope.activesilver = true;
                            $rootScope.activeplatinum = false;
                            $rootScope.subscriptionEndDate = '';
                            $rootScope.recurringId = '';
                        }
            });
        }
    
    }
    
    //console.log($scope.unreadNotifications);

    //set active class for selected tab
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
//console.log($state);

    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams){ //console.log(toState);
          if(toState.data.access == 0) { 
            $scope.userRole = 'anon';
          } else if($scope.user().role != undefined) {
            $scope.userRole = $scope.user().role;
          } else {
            $scope.userRole = 'anon';
          }
          $scope.setUserDashUrl();
    });
    
    //set users dashboard url and pass it to navigation
    $scope.setUserDashUrl = function() {
      $scope.userDashUrl = '#/';
      //alert($scope.user().role);
      if($scope.user().role != undefined) {
        if($scope.user().role == 'Customer') {
          $scope.userDashUrl = '#/user/editProfile';
        }else if($scope.user().role == 'Performer') {
          $scope.userDashUrl = '#/performer/editProfile';
          
          $scope.loadActiveSubscription();
          
        } else {
            $scope.userDashUrl = '#/company/editProfile';
          //$scope.userDashUrl = '#/' + angular.lowercase($scope.user().role) + '/dashboard';
        }
        
        //$scope.loadTopNotifications();
      }
    };

    //set parmeters data in case of page refresh
    $timeout(function() {
      if($rootScope.searchKeyword != null || $rootScope.searchKeyword != '') { 
        angular.element("input[name=searchKeyword]").val($rootScope.searchKeyword);
      }
    });

    //get all categories parent and children
    Categories.getAllActiveParentCategories().then(function(result) {
      $rootScope.categoryData = result.data;
    });

    //get all parent categories
    Categories.getAllActiveCategories().then(function(result) {
      $rootScope.categoryDataAll = result.data;
    });

    //search performer from header tab
    $scope.searchPerformer = function() {
      console.log($scope);
      if($scope.search.searchKeyword != null && $scope.search.searchCategory != null && $scope.search.searchCategory != '' && $scope.search.searchKeyword != '') {
        $state.go('anon.searchPerformer', $scope.search);
        return true;
      }
      if($scope.search.searchKeyword != null && $scope.search.searchKeyword != '') {
        $state.go('anon.searchPerformer', $scope.search);
        return true;
      }
      if($scope.search.searchCategory != null && $scope.search.searchCategory != '') {
        $state.go('anon.searchPerformer', $scope.search);
        return true;
      }
      $state.go('anon.searchPerformerNull');
    };

  //search customer from header tab
    $scope.searchCustomer = function() {
      $state.go('anon.searchCustomer');
    };

    $scope.logout = function() {
      $rootScope.userRole = 'anon';
      Auth.logout();
    };

  //mobile navigation controll starts here
    $scope.setMoblNav = function() {
      $scope.mobileNavClass = ($scope.mobileNavClass == '') ? 'in' : '';
    };

  });
