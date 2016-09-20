angular.module('app')
  .factory('Performer', function($http, CurrentUser) {
    var currentUser = CurrentUser.user;
    return {
      getProfileData: function() {
        return $http.get('/performer/getProfileData/' + currentUser().id);
      },
      editProfileData: function(userData) {
        return $http.post('/performer/editProfileData', userData);
      },
      
    }
  }).factory('PerformerSearch', function($http) {
    return {
      performerSearchList: function(dataoffset, datalimit, searchData) {
          //console.log(dataoffset+", "+datalimit);
        return $http.get('/search/performer/',{ params: { offset: dataoffset, limit: datalimit, sData: searchData} });
      }
    }
  });