angular.module('app')
        .controller('ImageController', function ($scope, $state, uploadService, $log) {
            $scope.imageUpload = function (image) {
                if (image) {
                    if (image[0]) {
                        if (image[0].size > 0) {
                            var formData = new FormData();
                            formData.append('file', image[0]);
                            uploadService.uploadProfilePhoto(formData).success(function (result) {
                                $scope.user.profilePhoto = result.photoPath;
                            });
                        }
                    }
                }
            }

        }).controller('PortfolioImgController', function ($scope, $state, uploadService, $log, $stateParams) {
    uploadService.getPortfolioImgData().then(function (result) {
        $scope.portfolioImg = result;
    });
    $scope.uploadImg = function ()
    {
        angular.element('#upload').trigger('click');
    }
    $scope.onBlur = function ($event, id) {
        uploadService.updatePortfolioImgDescription(id, $event.currentTarget.value).then(function (result) {
            console.log(result);
        });
    }
    $scope.deleteImg = function (id,$event)
    {
        
        uploadService.deletePortfolioImg(id).then(function (result) {
             uploadService.getPortfolioImgData().then(function (result) {
              $scope.portfolioImg = result;
             });
        });
    }
    $scope.portfolioImageUpload = function ($files)
    {
        if ($files.length > 0)
        {
            console.log($files);
            for (var i = 0; i < $files.length; i++)
            {
                $scope.uploadFileService($files[i]);
            }
            /*$state.transitionTo($state.current, $stateParams, {
                reload: true,
                inherit: false,
                notify: true
            });*/

        }
    },
            $scope.uploadFileService = function (file)
            {
                var formData = new FormData();
                formData.append('file', file);
                uploadService.uploadPortfolioImg(formData).success(function (result) {
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                });
            }
}).controller('PortfolioVideoController', function ($scope, $state, uploadService, $stateParams, $log) {
   uploadService.getPortfolioVideoData().then(function (result) {
        $scope.portfolioVideo = result;
    });
    $scope.uploadVideo = function ()
    {
        angular.element('#upload').trigger('click');
    }
    $scope.onBlur = function ($event, id) {
        uploadService.updatePortfolioVideoDescription(id, $event.currentTarget.value).then(function (result) {
            console.log(result);
        });
    }
    $scope.deleteVideo = function (id,$event)
    {
        
        uploadService.deletePortfolioVideo(id).then(function (result) {
             uploadService.getPortfolioVideoData().then(function (result) {
             $scope.portfolioVideo = result;
    });
        });
    }
    $scope.portfolioVideoUpload = function ($files)
    {
        if ($files.length > 0)
        {
            console.log($files);
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
                uploadService.uploadPortfolioVideo(formData).success(function (result) {
                    $state.transitionTo($state.current, $stateParams, {
                        reload: true,
                        inherit: false,
                        notify: true
                    });
                });
            }

});