angular.module('app')
  .controller('ModalInstanceCtrl', function($scope, $state, $rootScope, $location, $stateParams, $uibModalInstance, CurrentUser, modalData, unavailService) {
      $scope.user = CurrentUser.user();
      $scope.unavailableData = {};
      $scope.eventData = modalData;
      //if month view show previous, day db not manipulated (advance date saved for calendar compatebility)
      if($scope.eventData.allDay == true) { 
        var previousDay = new Date($scope.eventData.endDate);
        previousDay.setDate(previousDay.getDate()-1);
        $scope.eventData.modalEndDate = moment(previousDay).format('YYYY-MM-DD');
      } else {
        $scope.eventData.modalEndDate = $scope.eventData.endDate;
      }

//console.log($scope.eventData);
      $scope.saveReason = function(data) {
        if (data) {
          data.start = $scope.eventData.startDate;
          data.end = $scope.eventData.endDate;
          data.userId = $scope.user.id;
          data.status = 'Unavailable';
          data.allDay = $scope.eventData.allDay;
          unavailService.saveData(data).success(function(result){
            $uibModalInstance.close(result); 
          });
        }
      };

      //delete event from database and calendar without refreshing 
      $scope.deleteEvent = function(data) {
        if(confirm('Are you sure you want to delete this event ?')) {
          unavailService.deleteEvent($scope.eventData.id).success(function(result){
            $uibModalInstance.close(result); 
          });
        }
      };

      $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
      }
});