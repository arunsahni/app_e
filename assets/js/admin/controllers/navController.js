angular.module('app')
        .controller('NavController', function ($scope, Auth, CurrentUser, $location) {
            $scope.isCollapsed = true;
            $scope.auth = Auth;
            $scope.user = CurrentUser.user;

            $scope.logout = function () {
                Auth.logout();
            }
            var param = ($location.url().split('/'));
            $scope.isActive = $scope.isSubActive = param[1];
            $scope.submenu = function (text) {
                $scope.isActive = text;
            };
            $scope.subActive = function (text) {
                $scope.isSubActive = text;
            };
        });