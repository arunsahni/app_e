angular.module('app')
        .factory('uploadService', function ($http, CurrentUser) {
            return {
                uploadProfilePhoto: function (formData) {
                    var imageUpload = $http.post('/file/uploadProfilePhoto/' + CurrentUser.user().id, formData, {transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}});
                    imageUpload.success(function (result) {
                        console.log(result);
                    });
                    return imageUpload;
                },
                getPortfolioImgData: function (userID) {

                    if (!userID)
                        userID = CurrentUser.user().id;
                    return $http.get('/file/getPortfolioImgData/' + userID);
                },
                updatePortfolioImgDescription:function (id,value) {
                    var data={id:id, userid:CurrentUser.user().id,value:value};
                    return $http.post('/file/updatePortfolioImgDescription/', data);
                },
                deletePortfolioImg: function (id) {
                    console.log(id);
                    return $http.get('/file/deletePortfolioImg/' + id);
                },
                uploadPortfolioImg: function (formData) {
                    var PortfolioImg = $http.post('/file/uploadPortfolioImg/' + CurrentUser.user().id, formData, {transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}});
                    PortfolioImg.success(function (result) {
                        console.log(result);
                    });
                    return PortfolioImg;
                },

//video service start

                getPortfolioVideoData: function (userID) {

                    if (!userID)
                        userID = CurrentUser.user().id;
                    return $http.get('/file/getPortfolioVideoData/' + userID);
                },
                updatePortfolioVideoDescription:function (id,value) {
                    var data={id:id, userid:CurrentUser.user().id,value:value};
                    return $http.post('/file/updatePortfolioVideoDescription/', data);
                },
                deletePortfolioVideo: function (id) {
                    return $http.get('/file/deletePortfolioVideo/' + id);
                },
                uploadPortfolioVideo: function (formData) {
                    var PortfolioVideo = $http.post('/file/uploadPortfolioVideo/' + CurrentUser.user().id, formData, {transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}});
                    PortfolioVideo.success(function (result) {
                        console.log(result);
                    });
                    return PortfolioVideo;
                },
//upload image for spacific performer in side company
                 uploadCompanyPortfolioImg: function (id,formData) {
                    var PortfolioImg = $http.post('/file/uploadPortfolioImg/' + id, formData, {transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}});
                    PortfolioImg.success(function (result) {
                        console.log(result);
                    });
                    return PortfolioImg;
                },
//upload video for spacific performer in side company    
            uploadCompanyPortfolioVideo: function (id,formData) {
                    var PortfolioVideo = $http.post('/file/uploadPortfolioVideo/' +id, formData, {transformRequest: angular.identity,
                        headers: {'Content-Type': undefined}});
                    PortfolioVideo.success(function (result) {
                        console.log(result);
                    });
                    return PortfolioVideo;
                }

            }
        });