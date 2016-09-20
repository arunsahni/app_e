angular.module('app')
  .factory('Jobs', function($http, CurrentUser) {
    var currentUser = CurrentUser.user;
    return {
      getAll: function(page, limit, sortBy, sortDir, text) {
        return $http.get('/Administrator/jobs/listing?page=' + page + '&limit=' + limit + '&sortBy=' + sortBy + '&sortDir=' + sortDir);
      },
      create: function(message) {
        return $http.post('/jobs/' + currentUser().id + '/messages', {body: message});
      },
      remove: function(id) {
        return $http.get('/Administrator/jobs/delete?id='+ id);
      },
      getCount: function() {
        return $http.get('/Administrator/jobs/getCount');
      },
      getDetails : function(id){
        return $http.get('/Administrator/jobs/details?id='+ id);
      },
      update: function(data){
        return $http.post('/Administrator/jobs/update',data);
      },
      getAssignedMembers: function(id){
        return $http.get('/Administrator/booking/assignedPerformers?id='+ id);
      }
  }
  });
