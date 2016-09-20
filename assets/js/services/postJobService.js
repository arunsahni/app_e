angular.module('app')
  .factory('postJobService', function($http, CurrentUser) {
    var currentUser = CurrentUser.user();
    return {
      postJob: function(job) {
        return $http.post('/job/postJob/' + currentUser.id, job);
      },
    }
  });