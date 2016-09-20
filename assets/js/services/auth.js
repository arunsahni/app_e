angular.module('app')
  .factory('Auth', function($http, $rootScope, LocalService, AccessLevels ) {
    return {
      authorize: function(access) {
        if (access === AccessLevels.user) {
          return this.isAuthenticated();
        } else {
          return true;
        }
      },
      isAuthenticated: function() {
        return LocalService.get('auth_token');
      },
      login: function(credentials) {
        var login = $http.post('/auth/authenticate', credentials);
        login.success(function(result) {
          LocalService.set('auth_token', JSON.stringify(result));
        });
        return login;
      },
      logout: function() {
        // The backend doesn't care about logouts, delete the token and you're good to go.
        LocalService.unset('auth_token');
        $rootScope.alerts = [];
      $rootScope.alerts.push({type:'success', msg:"Successfully logged out."});
      },
      register: function(formData) {
        LocalService.unset('auth_token');
        var register = $http.post('/auth/register', formData);
        /*register.success(function(result) {
          LocalService.set('auth_token', JSON.stringify(result));
        });*/
        return register;
       },
      forgotPassword: function(formData) {
        var forgotPassword = $http.post('/auth/forgotPassword', formData);
        forgotPassword.success(function(result) {
          //show angular message here
        });
        return forgotPassword;
      },
       checkToken: function(token) {
        var checkToken = $http.get('/auth/checkToken/' + token);
        checkToken.success(function(result) {
          //show angular message here
        });
        return checkToken;
      },
      checkEmail: function(token) {
        var checkEmail = $http.get('/auth/checkEmail/' + token);
        checkEmail.success(function(result) {
        LocalService.set('auth_token', JSON.stringify(result));//show angular message here
        });
        return checkEmail;
      },
      resetPassword: function(formData, token) {
        var resetPassword = $http.post('/auth/resetPassword/' + token, formData);
       resetPassword.success(function(result) {
          //show angular message here
        });
        return resetPassword;
      }

    }
  })
  .factory('AuthInterceptor', function($q, $injector) {
    var LocalService = $injector.get('LocalService');

    return {
      request: function(config) {
        var token;
        if (LocalService.get('auth_token')) {
          token = angular.fromJson(LocalService.get('auth_token')).token;
        }
        if (token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
      },
      responseError: function(response) {
        if (response.status === 401 || response.status === 403) {
          LocalService.unset('auth_token');
          $injector.get('$state').go('anon.login');
        }
        return $q.reject(response);
      }
    }
  })
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  });