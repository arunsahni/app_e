angular.module('app')
  .factory('contactService', function($http) {
    return {
      contactUs: function(contact) {
      var register = $http.post('/Contact/create', contact);
        register.success(function(result) {
          console.log(result);
        });
        return register;
      }
       
    }
  });