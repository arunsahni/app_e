angular.module('app', ['ui.bootstrap', 'ui.router', 'ngMessages'])
        .run(function ($rootScope, $state) {

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                /*if (!Auth.authorize(toState.data.access)) {
                    event.preventDefault();
                    $state.go('anon.login');
                }*/
            });
        }).controller('ConfigController', function ($scope) {
   // $scope.auth = Auth;
});