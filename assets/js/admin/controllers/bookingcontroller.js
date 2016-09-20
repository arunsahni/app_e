angular.module('app')
.controller("BookingController",function($scope,$state,$stateParams,Bookings){
  $scope.maxSize = 5;
  $scope.bigTotalItems = 4;
  $scope.bigCurrentPage = 1;
  $scope.itemsPerPage = 10;

  $scope.sortDir = 'desc';
  $scope.sortBy = 'id';

  Bookings.getCount().then(function(result) {
   $scope.bigTotalItems = result.data.count;
     });

  Bookings.getAll($scope.bigCurrentPage, $scope.itemsPerPage, $scope.sortBy, $scope.sortDir).then(function(result) {
    $scope.bookingData = result.data;
     });


  $scope.setPage = function (pageNo) {
     $scope.currentPage = pageNo;
    };

  $scope.pageChanged = function() {
   Bookings.getAll($scope.bigCurrentPage, $scope.itemsPerPage, $scope.sortBy, $scope.sortDir).then(function(result) {
     $scope.bookingData = result.data;
    });
   };

  $scope.sort = function(sortBy) {
   $scope.sortDir = ($scope.sortDir == 'desc') ? 'asc' : 'desc';
   $scope.sortBy = sortBy;
   $scope.pageChanged();
    };

$scope.remove = function(id){
  $scope.id = id;
  Bookings.remove($scope.id).then(function(result){
  $scope.deletedBooking = result.data;
    });
    $state.transitionTo($state.current, $stateParams, {
    reload: true,
    inherit: false,
    notify: true
  });
Bookings.getAll($scope.bigCurrentPage,$scope.itemsPerPage, $scope.sortBy, $scope.sortDir).then(function(result) {
  $scope.bookingData = result.data;
     });
    };
    $scope.edit = function(id){
      $state.go('user.editbookings',{'id':id});
    };
  })

  /*** Controller for editing
    **  the booking details
    **/


 .controller("EditBookingController",function($state,$scope,$stateParams,Bookings){
     $scope.id = $state.params.id;

       Bookings.getDetails($scope.id).then(function(result){
       $scope.bookingDetails = result.data;
     });

   $scope.update = function(){

      Bookings.update($scope.bookingDetails).then(function(result){
         $scope.bookingDetails = result.data;
       });
       $state.go('user.bookings');
     };
  })
    /*** Controller for listing
    **** the bookings which have
    **** their agreementStatus as
    **** Dispute.
    ****/
    .controller("DisputeJobController",function($state,$scope,$stateParams,Bookings){

      $scope.maxSize = 5;
      $scope.bigTotalItems = 4;
      $scope.bigCurrentPage = 1;
      $scope.itemsPerPage = 10;

      $scope.sortDir = 'desc';
      $scope.sortBy = 'id';

      Bookings.disputedCount().then(function(result){
        $scope.bigTotalItems = result.data.count;
      });

      Bookings.disputedList($scope.bigCurrentPage, $scope.itemsPerPage, $scope.sortBy, $scope.sortDir).then(function(result) {
      $scope.disputedData = result.data;
      });

    $scope.details = function(id){
       $state.go('user.disputedDetail',{'id':id});
    }
  })
  /*** Controller for viewing
   *** the details of the
   *** disputed booking
   ***/

  .controller("DisputedDetailController",function($scope,$state,$stateParams,Bookings,CurrentUser){

    $scope.id = $state.params.id;
    $scope.jobMessage = {};
    Bookings.getDetails($scope.id).then(function(result){
      $scope.bookingDetails = result.data;
    });
    $scope.jobMessages = [];
    Bookings.getJobMessage($scope.id).success(function(result){
      $scope.jobMessages = result;
    });
    $scope.settle ='false';

    $scope.saveComment = function(jobMessages){
        $scope.jobMessage.assignmentId = $scope.id;
        $scope.jobMessage.userId = CurrentUser.user().id;
        $scope.jobMessage.jobId = $scope.bookingDetails.jobId.id;
        $scope.jobMessage.message = jobMessages.message;

        Bookings.saveComment($scope.jobMessage).success(function(result){
        $scope.jobMessages = result.data;
      });
      $state.transitionTo($state.current, $stateParams, {
      reload: true,
      inherit: false,
      notify: true
    });
    }
    $scope.Settlement = function(payTo,id){
      var que = confirm("Are you sure you want to update?");
      if(que){
      Bookings.settleDispute(payTo,id).success(function(result){
        $scope.bookingDetails = result.data;
    });
//     var notifydata = {};
// notifydata.receiver = customer_id;
// notifydata.sender = admin_id;
// notifydata.message = "Dispute settled for job "+jobId.jobTitle;
// notifydata.attachedLink = "#/jobs/bookingDetail/5669578e2f6cb584219baf2c";  jobassignment record id //5669578e2f6cb584219baf2c
// notifydata.jobId = tempData.jobId.id;
// NotificationService.createNotification(notifydata);
   }
 };
});
