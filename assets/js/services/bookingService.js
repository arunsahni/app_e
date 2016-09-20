angular.module('app')
  .factory('bookingService', function($http, CurrentUser) {
    return {
      creatTempDataForBooking: function(bookingdata) {
        return $http.post('/assignment/createTemp', bookingdata);
      },
      creatTempDataForSubscription: function(subscriptiondata) {
        return $http.post('/subscription/createTemp', subscriptiondata);
      }
    }
  })

  .factory('bookingDetails', function($http, CurrentUser) {
    return {
      getBookingDetails: function(req) {
        //return $http.get('/assignment/getBookingDetails?begin=',+parseInt(req.begin));
        return $http.get('/assignment/getBookingDetails/',{params: {userId: CurrentUser.user().id, begin: req.begin}});
      },
      jobAssigneeCount: function(host_id) {
        return $http.get('/assignment/jobAssigneeCount',{params: {host_id: host_id }});
      },
      getBookingInfo: function(id) {
        return $http.get('/assignment/getBookingInfo/',{params: {id: id }});
      },
      getJobInfo: function(id) {
        return $http.get('/assignment/getJobInfo/',{params: {id: id }});
      },
      updateAssignmentStatus: function(data){
        return $http.post('/assignment/updateAssignmentStatus/', data)
      },
      performerJobCount: function(performer_id) {
        return $http.get('/assignment/getperformerJobCount',{params: {performerId: performer_id }});
      },
      performerJobs: function(req) {
        return $http.get('/assignment/gerPerformersJob',{params: {performerId: CurrentUser.user().id, begin: req.begin}});
      },
      saveReason: function(data){
        return $http.post('/assignment/saveReason/', data)
      },
      companyPerformerJobs: function(req) {
        return $http.get('/assignment/gerPerformersJob',{params: {performerId: req.id, begin: req.begin}})
      }
    }
  });