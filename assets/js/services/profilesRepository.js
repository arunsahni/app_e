angular.module('app')
  .factory('Profiles', function($http, CurrentUser) {
    var currentUser = CurrentUser.user;
    return {
      getProfileData: function(userID) {
          
          if(!userID) userID = currentUser().id;
          
        return $http.get('/user/getProfileData/' + userID);
      },
      editProfileData: function(userData) {
        return $http.post('/user/editProfileData', userData);
      },updateServingCats: function(userData) {
        return $http.post('/user/updateServingCats', userData);
      },
      
    }
  });