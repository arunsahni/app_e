// angular.module('app')
//   .factory('Subscribers', function($http, CurrentUser) {
//     var currentUser = CurrentUser.user;
//     return {
//       getAll: function() {
//         return $http.get('/Administrator/Subscriber/listing');
//       },
//       create: function(message) {
//         return $http.post('Administrator/Subscriber/' + currentUser().id + '/messages', {body: message});
//       },
//       remove: function(id) {
//         return $http.get('/Administrator/Subscriber/delete?id='+ id);
//       },
//       getCount: function() {
//         return $http.get('/Administrator/Subscriber/getCount');
//       },
//       getDetails: function(id){
//         return $http.get('/Administrator/Subscriber/details?id='+ id);
//       },
//       update: function(data){
//         return $http.post('/Administrator/Subscriber/update',data);
//       },
//     }
//   });
