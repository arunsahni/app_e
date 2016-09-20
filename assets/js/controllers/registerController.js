angular.module('app')
.controller('PreRegisterController', function($scope, $state, $rootScope, $location) {
    $rootScope.searchBar = "";
    
    $scope.setSelection = function(accountType) {
      $location.path('/register/'+accountType);
    }
    
}).controller('RegisterController', function($scope, $state, $rootScope, Auth, $stateParams, $location) {

$rootScope.searchBar = "";
$scope.user = {};

$scope.canMoveForward = true;
$rootScope.alerts = [];
    $scope.pid = "";
    if($location.search().pid){
        $scope.pid = $location.search().pid;
    }


    if($stateParams.restrationType=='comp'){
        $scope.user.iscompany = "company";
        $scope.user.role = "Company";
    }else if($stateParams.restrationType=='per'){
        $scope.user.iscompany = "";
        $scope.user.role = "Performer";
    }else{
        $scope.user.iscompany = "";
        $scope.user.role = "Customer";
    }
    
    //registration for front-end users
    $scope.register = function() {
      $rootScope.alerts = [];
      $scope.canMoveForward = false;
      Auth.register($scope.user).success(function(result) {
        $scope.canMoveForward = true;
        $rootScope.alerts.push(result);
        $state.go('anon.login');
      }).error(function(err) {
        $scope.canMoveForward = true;
        if(err.msg.invalidAttributes == undefined) {
          $rootScope.alerts.push(err.msg);
        } else {
        var errors = err.msg.invalidAttributes.email[0].message;
        $rootScope.alerts.push(errors);
      }
      });
    };

    //toglling form user to company 
    $scope.setFlag = function() {
            console.log('check flag',$scope.user.iscompany);
            if($scope.user.iscompany=='individual'){
                    $scope.flag = true;
                    $scope.user.role = 'Performer';
            } else{
                    $scope.flag = false;
            }
    };



    //send email to reset pasaword
    $scope.forgotPassword = function() {
    $scope.canMoveForward = false;
      $rootScope.alerts = [];
      Auth.forgotPassword($scope.user).success(function(result) {
        $scope.canMoveForward = true;
        $rootScope.alerts.push(result);
        $state.go('anon.login');
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