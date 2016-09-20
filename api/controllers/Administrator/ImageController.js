module.exports = {
  uploadBannerImg: function (req, res) {
          req.file('file').upload({dirname: sails.config.appPath + '/assets/images/bannerImages'}, function (err, uploadedFiles) {

                  //return res.negotiate(err.status, {type: 'danger', msg: err});

                  if (uploadedFiles[0].fd) {
                      var pathobj = require('path');
                      var fs      = require('fs');
                      if (pathobj.basename(uploadedFiles[0].fd)) {
                          var fullphotopath = "/images/bannerImages/" + pathobj.basename(uploadedFiles[0].fd);
                           var uploadLocation = process.cwd() +'/assets/images/bannerImages/' + pathobj.basename(uploadedFiles[0].fd);
                           var tempLocation = process.cwd() + '/.tmp/public/images/bannerImages/' +  pathobj.basename(uploadedFiles[0].fd);
                          fs.createReadStream(uploadLocation).pipe(fs.createWriteStream(tempLocation));
                          HomeBanner.create({filePath: fullphotopath, type: 'image'}).exec(function (err, user) {
                              if (err) {
                                  return res.json(err.status, {type: 'danger', msg: 'Error in update', error: err});
                              } else {
                                  return res.json(200, {type: 'success', msg: 'Banner Image added', photoPath: fullphotopath});
                              }
                          });
                      }
                  } else {
                      return res.json(200, {type: 'error', msg: 'Something went wrong!'});
                  }

          });
      },

      getBannerImages: function (req, res) {
          HomeBanner.find({ status: 'active', type: 'image'}).populateAll()
                  .exec(function (err, data) {
                      if (err) {
                          return res.json(err);
                      } else {
                          return res.json(data);
                      }
                    console.log(data);
                  });

      },

      deleteBannerImg : function (req, res) {
          if (req.params.id) {
               HomeBanner.update({id: req.params.id}, {status:"deleted"}).exec(function (err, user) {
                  if (err) {
                      return res.json(err.status, {type: 'danger', msg: 'Error in update', error: err});
                  } else {
                      return res.json(200, {type: 'success', msg: 'Image deleted'});
                  }
              });
          } else {
              return res.json(200, {type: 'error', msg: 'Something went wrong!'});
          }

      },

      updateBannerDescription : function(req,res){
      if (req.body.id)
      {
          HomeBanner.update({id: req.body.id}, {description: req.body.value}).exec(function (err, data) {
              if (err) {
                  return res.json(err.status, {type: 'danger', msg: 'Error in update', error: err});
              } else {
                  return res.json(200, {type: 'success', msg: 'Description updated'});
              }
          });
      }
      else
      {
          return res.json(200, {type: 'error', msg: 'Something went wrong!'});
      }
    },
  };
