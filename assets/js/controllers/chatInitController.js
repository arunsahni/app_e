var socketApp = angular.module('app');
		socketApp.controller('ChatInit',['$scope','$rootScope','$compile',function($scope,$rootScope,$compile){
                      $scope.sender_id="";
                      $scope.receiver_id="";
                      $scope.chatDiv = "";
                      
                            $scope.initChat = function(sender_id,receiver_id){
                                
                                $scope.chatDiv =  
                               '<chat-box' +
                                       ' sender_id="sender_id" '+
                                        'receiver_id="receiver_id">'+
                              '</chat-box>';
                                
                                $scope.sender_id = sender_id;
                                $scope.receiver_id = receiver_id;
                              
                                // Step 1: parse HTML into DOM element
                                var template = angular.element($scope.chatDiv);

                                // Step 2: compile the template
                                var linkFn = $compile(template);

                                // Step 3: link the compiled template with the scope.
                                var element = linkFn($scope);

                                // Step 4: Append to DOM (optional)
                                $('#ChatInit').html(element);
                            }
                            //alert($scope.userLoginID+"=="+$scope.prfileUserID);
                            $scope.initChat($scope.userLoginID,$scope.prfileUserID);
                            //alert($scope.userLoginID);
			
		}]);