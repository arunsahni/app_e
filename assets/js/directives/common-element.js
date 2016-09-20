(function() {
	'use strict';
	angular.module('app').directive('headNotification', [headNotificationFunction]);

	function headNotificationFunction() {
		var notiTemplate =
			'<ul class="uib-dropdown-menu" role="menu" aria-labelledby="single-button">' +
     '         <li class="arrow-up"></li>  ' +
    '<li ng-if="unreadNotifications.length > 0" ng-repeat="eachnotify in unreadNotifications">' +
                            '<div class="lt-dropdown-frndreq">' +
                             '   <a href="javascript:void(0)"><img ng-src="{{eachnotify.sender.profilePhoto}}"  /></a> </div>' +
                            '<div class="rt-dropdown-frndreq">' +
                             '   <label ng-if="eachnotify.attachedLink"> ' +
                              '      <a href="{{eachnotify.attachedLink}}" ng-click="readNotification(eachnotify.id)">{{eachnotify.message}}</a>' +
                               ' </label>' +
                                '<label ng-if="!eachnotify.attachedLink"> ' +
                                 '   <a href="javascript:void(0)" ng-click="readNotification(eachnotify.id)">{{eachnotify.message}}</a>' +
                                '</label>' +
                            '</div>' +
                        '</li>' +
                        '<li ng-if="unreadNotifications.length <= 0">' +
                         '  <div class="rt-dropdown-frndreq">' +
                          '      <label>No unread notifications found</label></div>' +
                        '</li></ul>';

		var directive = {
			restrict: 'EA',
			template: notiTemplate,
			replace: true,
			link: link,
			controller: headNotificationController
		};

		function link($scope) {
                        
		}

		return directive;
	}

	headNotificationController.$inject = ['$scope', '$location','$http', 'CurrentUser'];

	function headNotificationController($scope, $location,$http, CurrentUser) {
                       
                       $scope.user = CurrentUser.user; 
                       
                       
                       
                       $scope.unreadNotifications =[];
                       io.socket.get('/notification/registerSocket', {params: {receiver:$scope.user().id}});
                       
                       $scope.getAllNoti = function(){
				CurrentUser.getunreadnotifications($scope.user().id).then(function(result) {
                                    if(result.data.type=='success'){
                                        $scope.unreadNotifications = result.data.unreadmsg;
                                    }else if(result.data.type=='nomsg'){
                                        //$scope.unreadNotifications = result.unreadmsg;
                                    }
                                });
			};
			$scope.getAllNoti();
			//alert('yes');
			io.socket.on('notification',function(obj){
                                //alert('yes called');
                                //console.log('notifi==',obj);	
				if(obj.verb === 'messaged'){
                                    //alert('yes called')
					if(obj.id == $scope.user().id){
						$scope.unreadNotifications.push(obj.data);
					}
					$scope.$digest();
				}
			});
                        
                        
                        $scope.readNotification = function (notificationId) {
                            CurrentUser.markasread(notificationId).then(function(result) {
                                //console.log(result);
                                if(result.data.type=='success'){
                                    $scope.getAllNoti();
                                }
                            });
                        };
	}
})();