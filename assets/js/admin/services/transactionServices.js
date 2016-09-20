angular.module('app')
  .factory('Transactions', function($http, CurrentUser) {
    var currentUser = CurrentUser.user;
    return {
      getAll: function(page, limit, sortBy, sortDir, text) {
        return $http.get('/Administrator/Transaction/listing?page=' + page + '&limit=' + limit + '&sortBy=' + sortBy + '&sortDir=' + sortDir);
      },
      /*
      create: function(message) {
        return $http.post('/Transaction/' + currentUser().id + '/messages', {body: message});
      },*/
      remove: function(id) {
        return $http.get('/Administrator/Transaction/delete?id='+ id);
      },
      getCount: function() {
        return $http.get('/Administrator/Transaction/getCount');
      },
      getDetails : function(id){
        return $http.get('/Administrator/Transaction/details?id='+ id);
      },
      /*
      update: function(data){
        return $http.post('/Administrator/Transaction/update',data);
      },*/
    }
  });
