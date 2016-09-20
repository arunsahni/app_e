angular.module('app')
.controller("TransactionCtrl",function($scope,$state,$stateParams,Transactions){
  $scope.maxSize = 5;
  $scope.bigTotalItems = 4;
  $scope.bigCurrentPage = 1;
  $scope.itemsPerPage = 10;

  $scope.sortDir = 'desc';
  $scope.sortBy = 'id';

  Transactions.getCount().then(function(result) {
  $scope.bigTotalItems = result.data.count;
  });

  Transactions.getAll($scope.bigCurrentPage, $scope.itemsPerPage, $scope.sortBy, $scope.sortDir).then(function(result) {
  $scope.transactionData = result.data;
  });

  $scope.setPage = function (pageNo) {
   $scope.currentPage = pageNo;
  };

  $scope.pageChanged = function() {
   Transactions.getAll($scope.bigCurrentPage, $scope.itemsPerPage, $scope.sortBy, $scope.sortDir).then(function(result) {
     $scope.transactionData = result.data;
   });
  };

  $scope.sort = function(sortBy) {
   $scope.sortDir = ($scope.sortDir == 'desc') ? 'asc' : 'desc';
   $scope.sortBy = sortBy;
   $scope.pageChanged();
  };

  $scope.remove = function(id){
   $scope.id = id;
   Transactions.remove($scope.id).then(function(result){
   $scope.deletedTransaction = result.data;
  });
  $state.transitionTo($state.current, $stateParams, {
  reload: true,
  inherit: false,
  notify: true
});
};

$scope.details = function(id){
  $scope.id= id;
  $state.go('user.transactionDetails',{'id':$scope.id});
};
})
/*** Controller for editing the
 *** details of the transactions
 ****/
 .controller("TransactionDetailController",function($scope,$state,$stateParams,Transactions){
   $scope.id = $state.params.id;
   Transactions.getDetails($scope.id).then(function(result){
     $scope.transactionDetails = result.data;
   });
   /*
 $scope.update = function(id){
   Transactions.update($scope.transactionDetails).then(function(result){
       $scope.transactionDetails = result.data;
     });
     $state.go('user.transactions');
   };*/
 });
