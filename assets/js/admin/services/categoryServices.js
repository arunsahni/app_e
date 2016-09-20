angular.module('app')
.factory('Categories',function($http, CurrentUser){
  var currentUser = CurrentUser.user;
  return{
    create:function(data){
      return $http.post('/Administrator/Category/create',data);
    },
    getparentCat:function(){
      return $http.get('/Administrator/Category/getParentCat');
    },
    getDetails:function(){
      return $http.get('/Administrator/Category/getDetails');
    },
    remove:function(id){
      return $http.get('/Administrator/Category/remove?id='+id);
    },
    getOne:function(id){
      return $http.get('/Administrator/Category/getOne?id='+id);
    },
    update: function(data){
      return $http.post('/Administrator/Category/update',data);
    },
    changeStatus: function(id,status){
      return $http.get('/Administrator/Category/changeStatus?id='+ id + '&status=' + status);
    },
  }
});
