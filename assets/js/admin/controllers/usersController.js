angular.module('app')
.controller('UsersController', function($scope,$state,Users,$stateParams) {
  $scope.maxSize = 5;
  $scope.bigTotalItems = 4;
  $scope.bigCurrentPage = 1;
  $scope.itemsPerPage = 10;

   $scope.sortDir = 'desc';
   $scope.sortBy = 'id';

   $scope.text=" ";

   Users.getCount().then(function(result) {
      $scope.bigTotalItems = result.data.count;
     });

   Users.getAll($scope.bigCurrentPage, $scope.itemsPerPage, $scope.sortBy, $scope.sortDir, $scope.text).then(function(result) {
      $scope.userData = result.data;
     });

   $scope.setPage = function (pageNo) {
     $scope.currentPage = pageNo;
     };

    $scope.pageChanged = function() {
      Users.getAll($scope.bigCurrentPage, $scope.itemsPerPage, $scope.sortBy, $scope.sortDir,$scope.text).then(function(result) {
      $scope.userData = result.data;
     });
    };

    $scope.sort = function(sortBy) {
      $scope.sortDir = ($scope.sortDir == 'desc') ? 'asc' : 'desc';
      $scope.sortBy = sortBy;
      $scope.pageChanged();
     };
    $scope.search = function(text,searchIn) {
      $scope.text = text;
      $scope.pageChanged();
     };

    $scope.remove = function(id){
      $scope.id = id;
        var que = confirm("are you sure u want to delete ?");
        if(que){
      Users.remove($scope.id).then(function(result){
      $scope.removedUser = result.data;
     });
     $state.transitionTo($state.current, $stateParams, {
      reload: true,
      inherit: false,
      notify: true
     });
     Users.getAll($scope.bigCurrentPage,$scope.itemsPerPage, $scope.sortBy, $scope.sortDir,$scope.text).then(function(result) {
        $scope.userData = result.data;
     });
   }
    };
    $scope.ChangeStatus = function(id,status){
     Users.changeStatus(id,status).then(function(result){
       $scope.userDetails = result.data;
     });
     Users.getAll($scope.bigCurrentPage,$scope.itemsPerPage, $scope.sortBy, $scope.sortDir,$scope.text).then(function(result) {
       $scope.userData = result.data;
     });
   };
    $scope.edit = function(id){
      $scope.id= id;
      $state.go('user.editUsers',{'id':$scope.id});
     };
   })

   /*** Controller userd for editing
    *** of users details by the
    *** admin.
    **/
  .controller("EditUsersController",function($scope,$state,$stateParams,Users){
      $scope.open = function($event) {
      $scope.status.opened = true;
     }
      $scope.format = 'dd-MMMM-yyyy';
      $scope.status = {
       opened: false
       };

    $scope.id = $state.params.id;

    Users.getDetails($scope.id).then(function(result){
      $scope.userDetails = result.data;
    });



       $scope.guardianOnSetTime = function ($index, guardian, newDate, oldDate) {
         $log.info($index);
         $log.info(guardian.name);
         $log.info(newDate);
         $log.info(oldDate);
         angular.element('#guardian' + $index).dropdown('toggle');
       };

       $scope.beforeRender = function ($dates) {
         var index = Math.ceil($dates.length / 2);
         $log.info(index);
         $dates[index].selectable = false;
       };

       $scope.config = {
         datetimePicker: {
           startView: 'year'
         }
       };

       $scope.configFunction = function configFunction() {
         return {startView: 'month'};
       };

       $scope.config = {
         configureOnConfig: {
           startView: 'year',
           configureOn: 'config-changed'
         },
         renderOnConfig: {
           startView: 'year',
           renderOn: 'valid-dates-changed'
         }
       };

       var validViews = ['year', 'month', 'day', 'hour', 'minute'];

       $scope.changeConfig = function changeConfig() {
         var newIndex = validViews.indexOf($scope.config.configureOnConfig.startView) + 1;
         console.log(newIndex);
         if (newIndex >= validViews.length) {
           newIndex = 0;
         }
         $scope.config.configureOnConfig.startView = validViews[newIndex];
         $scope.$broadcast('config-changed');
       };

       var selectable = true;

       $scope.renderOnBeforeRender = function ($dates) {
         angular.forEach($dates, function (dateObject) {
           dateObject.selectable = selectable;
         });
       };

       $scope.renderOnClick = function renderOnClick() {
         selectable = (!selectable);
         $scope.$broadcast('valid-dates-changed');
       };




    $scope.update = function(id){
      Users.update($scope.userDetails).then(function(result){
        $scope.userDetails = result.data;
       });
       $state.go('user.users');
     };
   });
