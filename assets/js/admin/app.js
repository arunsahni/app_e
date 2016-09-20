angular.module('app', ['ui.bootstrap', 'ui.router', 'imageupload', 'ngMessages'])
        .run(function ($rootScope, $state, Auth) {

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                if (!Auth.authorize(toState.data.access)) {
                    event.preventDefault();
                    $state.go('anon.login');
                }
            });
        }).controller('ConfigController', function ($scope, Auth) {
    $scope.auth = Auth;
});
