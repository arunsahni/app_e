angular.module('app')
 .controller("BannerImgController",function($scope,$state,$log,ImageService){
   //$scope.selected = undefined;

  //  $scope.getImages = function() {
           ImageService.getBannerImages().then(function (result) {
           $scope.bannerImage = result;
         });
    //  };

   $scope.uploadImg = function ()
         {
             angular.element('#upload').trigger('click');
        }

   $scope.onBlur = function ($event, id) {
            ImageService.updateBannerDescription( $event.currentTarget.value).then(function (result) {
               console.log(result);
           });
        }
   $scope.deleteImg = function (id,$event)
        {
                ImageService.deleteBannerImg(id).then(function (result) {
                 ImageService.getBannerImages().then(function (result) {
                   $scope.bannerImage = result;
                 });
            });
        }
   $scope.BannerImageUpload = function ($files)
         {
             if ($files.length > 0)
             {
                 for (var i = 0; i < $files.length; i++)
                   {
                   $scope.uploadFileService($files[i]);
                  }

            }
        },
   $scope.uploadFileService = function (file)
                {
                   var formData = new FormData();
                   formData.append('file', file);
                   ImageService.uploadBannerImg(formData).success(function (result) {
                   ImageService.getBannerImages().then(function (result) {
                   $scope.bannerImage = result;
                   console.log(result);
                 });
            });
         }
 });
