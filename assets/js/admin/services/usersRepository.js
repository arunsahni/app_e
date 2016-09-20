angular.module('app')
  .factory('Users', function($http, CurrentUser) {
    var currentUser = CurrentUser.user;
    return {
      getAll: function(page, limit, sortBy, sortDir, text) {
        return $http.get('/Administrator/user/listing?page=' + page + '&limit=' + limit + '&sortBy=' + sortBy + '&sortDir=' + sortDir + '&text=' + text);
      },
      create: function(message) {
        return $http.post('/user/' + currentUser().id + '/messages', {body: message});
      },
      remove: function(id) {
        return $http.get('/Administrator/user/delete?id='+ id);
      },
      getCount: function() {
        return $http.get('/Administrator/user/getCount');
      },
      getDetails : function(id){
        return $http.get('/Administrator/user/details?id='+ id);
      },
      update: function(data){
        return $http.post('/Administrator/user/update',data);
      },
    }
  });
