angular.module('app')
.controller("UserSubscriptionCtrl",function($scope,$state,Subscribers,$stateParams){
  if($state.current.name == 'user.editSubscribers'){
  $scope.id = $state.params.id;
  Subscribers.getDetails($scope.id).then(function(result){

    $scope.subscriberDetails = result.data;
  });
$scope.update = function(id){
  Subscribers.update($scope.subscriberDetails).then(function(result){
      $scope.subscriberDetails = result.data;
    });
    $state.go('user.usersubscriptions');
};
}

else{
  $scope.maxSize = 5;
  $scope.bigTotalItems = 4;
  $scope.bigCurrentPage = 1;
  $scope.itemsPerPage = 10;

  $scope.sortDir = 'desc';
  $scope.sortBy = 'id';

  Subscribers.getCount().then(function(result) {
    $scope.bigTotalItems = result.data.count;
  });
  Subscribers.getAll($scope.bigCurrentPage, $scope.itemsPerPage, $scope.sortBy, $scope.sortDir).then(function(result) {
    // console.log(result);
   $scope.subscriberData = result.data;
  });
  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
    Subscribers.getAll($scope.bigCurrentPage, $scope.itemsPerPage, $scope.sortBy, $scope.sortDir,$scope.text).then(function(result) {
      $scope.subscriberData = result.data;
    });
  };
}
  $scope.remove = function(id){
  $scope.id = id;
  Subscribers.remove($scope.id).then(function(result){
     $scope.removedData = result.data;
  });

  $state.transitionTo($state.current, $stateParams, {
  reload: true,
  inherit: false,
  notify: true
});
  Subscribers.getAll().then(function(result) {
    $scope.planData = result.data;
  });
};
$scope.edit = function(id){
  $scope.id= id;
  $state.go('user.editSubscribers',{'id':$scope.id});
};



});
