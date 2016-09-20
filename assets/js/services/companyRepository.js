angular.module('app')
  .factory('CompanyService', function($http, CurrentUser) {
    return {
      addPerformer: function(user) {
        return $http.post('/company/addPerformer/' + CurrentUser.user().id, user);
       },
      getAllPerformer: function(page, limit, sortBy, sortDir, text) {
        return $http.get('/company/getAllPerformer?page=' + page + '&limit=' + limit + '&sortBy=' + sortBy + '&sortDir=' + sortDir + '&text=' + text + '&id=' + CurrentUser.user().id );
      },
       getCount: function() {
        return $http.get('/company/getCount/'  + CurrentUser.user().id);
      },
      deletePerformer: function(performerId) {
        return $http.get('/company/deletePerformer/' + performerId  );
      },
      getPerformer: function(performerId) {
        return $http.get('/company/getPerformer/' + performerId  );
      },
      savePerformer: function(user) {
        return $http.post('/company/savePerformer/' + CurrentUser.user().id, user);
      },
      deleteMultiple: function(arr) {
        return $http.post('/company/deleteMultiple', arr);
      },
       getAllPerformerAuto: function() {
        return $http.get('/company/getAllPerformerAuto/' + CurrentUser.user().id );
      },
      changeStatus: function(id , status) {
         return $http.post('/company/changeStatus?status=' + status + '&id=' + id);
      },
    }
  });
