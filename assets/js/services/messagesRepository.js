angular.module('app')
  .factory('Messages', function($http, CurrentUser) {
    var currentUser = CurrentUser.user;
    return {
      getAll: function() {
        return $http.get('/user/' + CurrentUser.user().id + '/messages');
      },
      create: function(message) {
        return $http.post('/user/' + CurrentUser.user().id + '/messages', {body: message});
      },
      remove: function(message) {
        return $http.delete('/user/' + CurrentUser.user().id + '/messages/' + message.id);
      }
    }
  });