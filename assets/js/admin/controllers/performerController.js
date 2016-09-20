angular.module('app')
.controller("PerformerController",function($scope,$state,$stateParams,Performers){
    $scope.maxSize = 5;
    $scope.bigTotalItems = 4;
    $scope.bigCurrentPage = 1;
    $scope.itemsPerPage = 10;

    $scope.sortDir = 'desc';
    $scope.sortBy = 'id';

    $scope.text=" ";

    Performers.getCount().then(function(result) {
      $scope.bigTotalItems = result.data.count;
    });

    Performers.getAll($scope.bigCurrentPage, $scope.itemsPerPage, $scope.sortBy, $scope.sortDir, $scope.text).then(function(result) {
      $scope.userData = result.data;
    });

     $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
     };

     $scope.pageChanged = function() {
       Performers.getAll($scope.bigCurrentPage, $scope.itemsPerPage, $scope.sortBy, $scope.sortDir,$scope.text).then(function(result) {
       $scope.userData = result.data;
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

     $scope.remove = function(id){
       $scope.id = id;
        Performers.remove($scope.id).then(function(result){
        $scope.removedUser = result.data;
       });
        $state.transitionTo($state.current, $stateParams, {
        reload: true,
        inherit: false,
        notify: true
       });
        Performers.getAll($scope.bigCurrentPage,$scope.itemsPerPage, $scope.sortBy, $scope.sortDir,$scope.text).then(function(result) {
        $scope.userData = result.data;
       });
     };
     $scope.ChangeStatus = function(id,status){
      Performers.changeStatus(id,status).then(function(result){
      $scope.userDetails = result.data;
    });
     Performers.getAll($scope.bigCurrentPage,$scope.itemsPerPage, $scope.sortBy, $scope.sortDir,$scope.text).then(function(result) {
      $scope.userData = result.data;
   });
  }
});
/*if($state.current.name == 'user.editPerformers'){
  $scope.id = $state.params.id;
  Performers.getDetails($scope.id).then(function(result){

    $scope.userDetails = result.data;
  });
  $scope.update = function(id){
  Performers.update($scope.userDetails).then(function(result){
      $scope.userDetails = result.data;
    });
    $state.go('user.Performers');
  };
}
else{*/
/*
$scope.edit = function(id){
 $scope.id= id;
 $state.go('user.editPerformers',{'id':$scope.id});
};*/
