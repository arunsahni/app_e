angular.module('app')
  .factory('unavailService', function($http, CurrentUser) {
    return {
      saveData: function(data) {
        return $http.post('/unavailability/saveData', data);
      },
      getUnavailableData: function(req) {
        return $http.get('/unavailability/getUnavailableData/', {params: {userId: CurrentUser.user().id}});
      },
      getBookingData: function(req) {
        return $http.get('/unavailability/getBookingData/', {params: {userId: CurrentUser.user().id}});
      },
      deleteEvent: function(id) { 
        return $http.get('/unavailability/deleteEvent/', {params: {id: id}});
      },
      updateEvent : function(eventData) { 
        return $http.post('/unavailability/updateEvent', eventData);
      }
    }
  })