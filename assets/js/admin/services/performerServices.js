angular.module('app')
  .factory('Performers', function($http, CurrentUser) {
    var currentUser = CurrentUser.user;
    return {
      getAll: function(page, limit, sortBy, sortDir, text) {
        return $http.get('/Administrator/performer/listing?page=' + page + '&limit=' + limit + '&sortBy=' + sortBy + '&sortDir=' + sortDir + '&text=' + text);
      },
      create: function(message) {
        return $http.post('/performer/' + currentUser().id + '/messages', {body: message});
      },
      remove: function(id) {
        return $http.get('/Administrator/performer/delete?id='+ id);
      },
      getCount: function() {
        return $http.get('/Administrator/performer/getCount');
      },
      changeStatus: function(id,status){
        return $http.get('/Administrator/performer/changeStatus?id='+ id + '&status=' + status);
      },
    /*  getDetails : function(id){
        return $http.get('/Administrator/performer/details?id='+ id);
      },
      update: function(data){
        return $http.post('/Administrator/performer/update',data);
      },*/
    }
  });
