angular.module('app')
  .factory('Bookings', function($http, CurrentUser) {
    var currentUser = CurrentUser.user;
    return {
      getAll: function(page, limit, sortBy, sortDir) {
        return $http.get('/Administrator/booking/listing?page=' + page + '&limit=' + limit + '&sortBy=' + sortBy + '&sortDir=' + sortDir);
      },
      create: function(message) {
        return $http.post('/booking/' + currentUser().id + '/messages', {body: message});
      },
      remove: function(id) {
        return $http.get('/Administrator/booking/delete?id='+ id);
      },
      getCount: function() {
        return $http.get('/Administrator/booking/getCount');
      },
      getDetails : function(id){
        return $http.get('/Administrator/booking/details?id='+ id);
      },
      update: function(data){
        return $http.post('/Administrator/booking/update',data);
      },
      disputedList: function(page, limit, sortBy, sortDir){
        return $http.get('/Administrator/booking/disputedList?page=' + page + '&limit=' + limit + '&sortBy=' + sortBy + '&sortDir=' + sortDir);
      },
      disputedCount: function(){
        return $http.get('/Administrator/booking/disputedCount');
      },
     getJobMessage: function(id){
       return $http.get('/Administrator/jobMessage/getJobMessage?id='+ id);
     },
     saveComment: function(data){
       return $http.post('/Administrator/jobMessage/saveComment',data);
     },
     settleDispute: function(paymentTo,id){
       return $http.get('/Administrator/booking/settleDispute?id='+id+'&paymentTo='+paymentTo);
     }
    }
  });
