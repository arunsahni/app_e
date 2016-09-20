angular.module('app')
  .factory('Subscriptions', function($http, CurrentUser) {
    var currentUser = CurrentUser.user;
    return {
      getAll: function() {
        return $http.get('/Administrator/subscription/listing');
      },
      create: function(message) {
        return $http.post('Administrator/subscription/' + currentUser().id + '/messages', {body: message});
      },
      remove: function(id) {
        return $http.get('/Administrator/subscription/delete?id='+ id);
      },
      getCount: function() {
        return $http.get('/Administrator/subscription/getCount');
      },
      getDetails: function(id){
        return $http.get('/Administrator/subscription/details?id='+ id);
      },
      update: function(data){
        return $http.post('/Administrator/subscription/update',data);
      },
    }
  });
