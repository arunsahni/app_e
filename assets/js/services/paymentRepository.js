angular.module('app')
  .factory('paymentService', function($http, CurrentUser) {
    return {
      getPaymentData: function(page,limit,sortBy,sortDir) {
        return $http.get('/performer/getPaymentData?page=' + page + '&limit=' + limit + '&sortBy=' + sortBy + '&sortDir=' + sortDir + '&id=' +CurrentUser.user().id);
      },
      getCount: function() {
        return $http.get('/performer/getCount/' +CurrentUser.user().id);
      },
      searchData: function(key) {
        return $http.post('/performer/searchData/' + CurrentUser.user().id, key);
      },
      deleteMultiple: function(arr) {
        return $http.post('/performer/deleteMultiple', arr);
      },
      getSubscriptionsPaymentData: function(page,limit,sortBy,sortDir) {
        return $http.get('/performer/getSubscriptionsPaymentData?page=' + page + '&limit=' + limit + '&sortBy=' + sortBy + '&sortDir=' + sortDir + '&id=' +CurrentUser.user().id);
      },
      getSubscriptionsCount: function() {
        return $http.get('/performer/getSubscriptionsCount/' +CurrentUser.user().id);
      },
      searchSubscriptionsData: function(key) {
        return $http.post('/performer/searchSubscriptionsData/' + CurrentUser.user().id, key);
      },
      getCompanyPaymentData: function(page,limit,sortBy,sortDir) {
        return $http.get('/company/getCompanyPaymentData?page=' + page + '&limit=' + limit + '&sortBy=' + sortBy + '&sortDir=' + sortDir  +  '&id=' +CurrentUser.user().id);
      },
      getCompanyPaymentPerformerData : function(page,limit,text) {
        return $http.get('/company/getCompanyPaymentPerformerData?page=' + page + '&limit=' + limit + '&text=' + text );
      },
      searchCompanyData: function(key) {
        return $http.post('/company/searchCompanyData/' + CurrentUser.user().id,key);
      },
       getCompanyCount: function() {
        return $http.get('/company/getCompanyCount/' +CurrentUser.user().id);
      },
      getCompanyPaymentPerformerSubData: function(page,limit,text) {
        if(text){
          return $http.get('/company/getCompanyPaymentPerformerSubIdData?page=' + page + '&limit=' + limit + '&text=' + text +  '&id=' +CurrentUser.user().id);
        } else {
        return $http.get('/company/getCompanyPaymentPerformerSubData?page=' + page + '&limit=' + limit +  '&id=' +CurrentUser.user().id);
         }
      },
      getCompanySubCount: function() {
        return $http.get('/company/getCompanySubCount/' +CurrentUser.user().id);
      },
      searchCompanySubData: function(key) {
        return $http.post('/company/searchCompanySubData/' + CurrentUser.user().id,key);
      }
    }
  })