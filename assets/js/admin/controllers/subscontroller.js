angular.module('app')
.controller("SubsCtrl",function($scope,$state,Subscriptions,$stateParams){
  if($state.current.name == 'user.editSubscription'){
     $scope.id = $state.params.id;

      Subscriptions.getDetails($scope.id).then(function(result){
        $scope.planDetails = result.data;
        // console.log(result);
    });
 //    $scope.addFeaturebox = function() {
 //   $scope.planDetails.features.push({ })
 // }
      $scope.update = function(id){
        Subscriptions.update($scope.planDetails).then(function(result){
          $scope.planDetails = result.data;
        });
          $state.go('user.subscription');
      }




  }
  else{

  Subscriptions.getAll().then(function(result) {
    $scope.planData = result.data;
    });
  }

    $scope.remove = function(id){
    $scope.id = id;
    Subscriptions.remove($scope.id).then(function(result){
       $scope.removedData = result.data;
    });

    $state.transitionTo($state.current, $stateParams, {
    reload: true,
    inherit: false,
    notify: true
});
    Subscriptions.getAll().then(function(result) {
      $scope.planData = result.data;
    });
  },
    $scope.edit = function(id){
      $scope.id= id;
      $state.go('user.editSubscription',{'id':$scope.id});
    };
});
