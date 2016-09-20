(function() {
	'use strict';

	angular.module('app');
	angular.module('app').directive('chatBox', ['$timeout', SimpleChat]);

	function SimpleChat($timeout) {
		var chatTemplate =
			'<div class="container">' + 
                                '<div class="row">' + 
                                    '<div class="col-md-12">' + 
                                        '<div class="panel panel-primary">' + 
                                            '<div class="panel-heading">' + 
                                                '<span class="glyphicon glyphicon-comment"></span> Chat' + 
                                            '</div>' + 
                                            '<div class="panel-body">' + 
                                             '   <ul class="chat"  ng-repeat="chat in chatList | orderBy:predicate">' + 
                                                 ' <li ng-if="chat.sender.id!=sender_id" class="left clearfix"><span class="chat-img pull-left">' + 
                                                  '      <img src="http://placehold.it/50/55C1E7/fff&text=U" alt="User Avatar" class="img-circle" />' + 
                                                   ' </span>' + 
                                                    '    <div class="chat-body clearfix">' + 
                                                     '       <div class="header">' + 
                                                      '          <strong class="primary-font">{{ chat.sender.firstName }} </strong> <small class="pull-right text-muted">' + 
                                                       '             <span class="glyphicon glyphicon-time"></span>{{ chat.createdAt | date:"MM-dd-yyyy hh:m a"}}</small>' + 
                                                        '    </div>' + 
                                                         '   <p>{{ chat.message }}</p>' + 
                                                        '</div>' + 
                                                    '</li>' + 
                                                    '<li ng-if="chat.sender.id==sender_id" class="right clearfix"><span class="chat-img pull-right">' + 
                                                     '   <img src="http://placehold.it/50/FA6F57/fff&text=ME" alt="User Avatar" class="img-circle" />' + 
                                                    '</span>' + 
                                                     '   <div class="chat-body clearfix">' + 
                                                      '      <div class="header">' + 
                                                       '         <small class=" text-muted"><span class="glyphicon glyphicon-time"></span>{{ chat.createdAt | date:"MM-dd-yyyy hh:m a"}}</small>' + 
                                                        '        <strong class="pull-right primary-font">{{ chat.sender.firstName }}</strong>' + 
                                                         '   </div>' + 
                                                          '  <p>{{ chat.message }}</p>' + 
                                                        '</div>' + 
                                                    '</li>' + 
                                                '</ul>' + 
                                            '</div>' + 
                                            '<div class="panel-footer">' + 
                                            '<form>	' + 
                                             '   <div class="input-group">' + 
                                             '      <input id="btn-input" type="text" ng-model = "chatMessage" class="form-control input-sm" placeholder="Type your message here..." />' + 
                                                    '<span class="input-group-btn">' + 

                                                       ' <button ng-click="sendMsg()" class="btn btn-warning btn-sm" id="btn-chat">Send</button>	' + 		
                                                    '</span>' + 
                                                '</div>' + 
                                                    '</form>' + 
                                            '</div>' + 
                                        '</div>' + 
                                    '</div>' + 
                                '</div>' + 
                            '</div>';

		var directive = {
			restrict: 'EA',
			template: chatTemplate,
			replace: true,
			link: link,
			controller: ChatController
		};

		function link($scope) {
                        //console.log('bpcheck',$scope);
			/*if (!scope.inputPlaceholderText) {
				scope.inputPlaceholderText = 'Write your message here...';

			}

			if (!scope.submitButtonText || scope.submitButtonText === '') {
				scope.submitButtonText = 'Send';
			}

			if (!scope.title) {
				scope.title = 'Chat';
			}

			scope.$msgContainer = $('.msg-container-base'); // BS angular $el jQuery lite won't work for scrolling
			scope.$chatInput = $(element).find('.chat-input');

			var elWindow = scope.$msgContainer[0];
			scope.$msgContainer.bind('scroll', _.throttle(function() {
				var scrollHeight = elWindow.scrollHeight;
				if (elWindow.scrollTop <= 10) {
					scope.historyLoading = true; // disable jump to bottom
					scope.$apply(scope.infiniteScroll);
					$timeout(function() {
						scope.historyLoading = false;
						if (scrollHeight !== elWindow.scrollHeight) // don't scroll down if nothing new added
							scope.$msgContainer.scrollTop(360); // scroll down for loading 4 messages
					}, 150);
				}
			}, 300));*/
		}

		return directive;
	}

	ChatController.$inject = ['$scope', '$location','$http','$log'];

	function ChatController($scope, $location,$http,$log) {
                        
                        //$scope.sender_id = $location.search().sender;
			//$scope.receiver_id = $location.search().receiver;

//console.log($location.host()+":"+$location.host());
			$scope.predicate = '-createdAt';
			$scope.reverse = false;
			$scope.baseUrl = "";
			$scope.chatList =[];

			$scope.getAllchat = function(){
				io.socket.get('/chat/addconv', {params: {sender:$scope.sender_id,receiver:$scope.receiver_id}});
				$http.get($scope.baseUrl+'/chat/getallUsersmsg', {params: {sender:$scope.sender_id,receiver:$scope.receiver_id}})
					 .success(function(success_data){
					 		$scope.chatList = success_data;
							//console.log(success_data);
					 		//$log.info(success_data);
					 });
			};
			$scope.getAllchat();
			
			$scope.chatMessage="";
			io.socket.on('chat',function(obj){
				//console.log(obj.data);		
				if(obj.verb === 'messaged'){
					//$log.info($scope.sender_id +"=="+ $scope.receiver_id);
					//$log.info(obj.data);
					if(obj.data.sender.id != $scope.sender_id && obj.data.sender.id != $scope.receiver_id){
						//alert(obj.data.sender.firstName + " trying to connect you..");
					}else{
						$scope.chatList.push(obj.data);
					}
					$scope.$digest();
				}
			});
                        
                       
			$scope.sendMsg = function(){
                                
                                if(!$scope.receiver_id || !$scope.seletedJob.jobID){
                                    if(!$scope.seletedJob.jobID){
                                        alert('Please select a job for negotiation');
                                    }
                                }else{
                                    //$log.info($scope.chatMessage);
                                        io.socket.post('/chat/addconv/',{jobId:$scope.seletedJob.jobID,sender:$scope.sender_id,receiver:$scope.receiver_id,message: $scope.chatMessage});
                                        $scope.chatMessage = "";
                                }
			};
		
	}
})();
/*angular.module('app').directive("chatButton", function(){
	return {
		restrict: "E",
		template: "<button addbuttons>Chat</button>"
	}
});
angular.module('app').directive("addbuttons", function($compile){
	return function(scope, element, attrs){
		element.bind("click", function(){
			scope.count++;
			angular.element(document.getElementById('ChatInit')).append($compile("<chat-box sender_id='sender_id' receiver_id='receiver_id'></chat-box>")(scope));
		});
	};
});*/