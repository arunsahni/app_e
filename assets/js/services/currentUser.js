angular.module('app')
  .factory('CurrentUser', function($http,LocalService) {
    return {
      user: function() {
        if (LocalService.get('auth_token')) {
          return angular.fromJson(LocalService.get('auth_token')).user;
        } else {
          return {};
        }
      },
      getunreadnotifications: function(user_id) {
        return $http.get('/notification/getUserUnreadNotifications/',{ params: { receiver: user_id} });
      },
      markasread: function(notificationId) {
        return $http.get('/notification/markAsRead/',{ params: { id: notificationId} });
      },
      getActiveSubscription: function(user_id) {
        return $http.get('/subscription/getActiveSubscription/',{ params: { user_id: user_id} });
      }
    };
  });