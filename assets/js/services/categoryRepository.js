angular.module('app')
  .factory('Categories', function($http) {
    return {
      getAllActiveParentCategories: function() {
        return $http.get('/category/getAllActiveParentCategories');
      },
      getAllActiveCategories: function() {
        return $http.get('/category/getAllActiveCategories');
      }
    }
  });
