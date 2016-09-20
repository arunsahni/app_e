angular.module('app')
 .factory('ImageService',function($http,CurrentUser){
   return{
   uploadBannerImg : function(formData) {
     console.log('inside service');
     console.log(formData);
       var BannerImg = $http.post('/Administrator/Image/uploadBannerImg' , formData, {transformRequest: angular.identity,
           headers: {'Content-Type': undefined}});
       BannerImg.success(function (result) {
           console.log(result);
       });
       return BannerImg;
   },
   getBannerImages : function(){
     return $http.get('/Administrator/Image/getBannerImages');
   },
   deleteBannerImg : function(id){
     return $http.get('/Administrator/Image/deleteBannerImg/'+ id);
   },
   updateBannerDescription : function(id,value){
     var data = {id:id,value:value};
     return $http.post('/Administrator/Image/updateBannerDescription/', data);
   }
 }
 });
