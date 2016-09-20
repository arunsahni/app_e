angular.module('app')
  .factory('CurrentUser', function(LocalService) {
    return {
      user: function() {
        if (LocalService.get('admin_auth_token')) {
          return angular.fromJson(LocalService.get('admin_auth_token')).user;
        } else {
          return {};
        }
      }
    };
  });