/**
 * FileController
 *
 * @description :: Server-side logic for managing files
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
    /**
     * File upload using sails inbuilt skipper module
     * Unique id generated by default for filename
     *
     */
    uploadProfilePhoto: function (req, res) {
        if (req.params.id) {
            req.file('file').upload({dirname: sails.config.appPath + '/assets/images/avatar'}, function (err, uploadedFiles) {
                if (err) {
                    return res.negotiate(err.status, {type: 'danger', msg: err});
                } else {
                    if (uploadedFiles[0].fd) {
                        var pathobj = require('path');
                        if (pathobj.basename(uploadedFiles[0].fd)) {
                            var fullphotopath = "images/avatar/" + pathobj.basename(uploadedFiles[0].fd);

                            //updateing user info
                            User.update({id: req.params.id}, {profilePhoto: fullphotopath}).exec(function (err, user) {
                                if (err) {
                                    return res.json(err.status, {type: 'danger', msg: 'Error in update', error: err});
                                } else {
                                    return res.json(200, {type: 'success', msg: 'Profile updated', photoPath: fullphotopath});
                                }
                            });

                            //return res.json(200, {type: 'success', msg: uploadedFiles.length + ' file(s) uploaded successfully!'});
                        }
                    } else {
                        return res.json(200, {type: 'error', msg: 'Something went wrong!'});
                    }
                }
            });
        } else {
            return res.json(200, {type: 'error', msg: 'Invalid attempt to update profile photo'});
        }
    },
    uploadPortfolioImg: function (req, res) {
        if (req.params.id) {
            req.file('file').upload({dirname: sails.config.appPath + '/assets/images/portfolio'}, function (err, uploadedFiles) {
                if (err) {
                    //return res.negotiate(err.status, {type: 'danger', msg: err});
                } else {
                    if (uploadedFiles[0].fd) {
                        var pathobj = require('path');
                        var fs      = require('fs');
                        if (pathobj.basename(uploadedFiles[0].fd)) {
                            var fullphotopath = "images/portfolio/" + pathobj.basename(uploadedFiles[0].fd);
                             var uploadLocation = process.cwd() +'/assets/images/portfolio/' + pathobj.basename(uploadedFiles[0].fd);
                             var tempLocation = process.cwd() + '/.tmp/public/images/portfolio/' +  pathobj.basename(uploadedFiles[0].fd);
                            fs.createReadStream(uploadLocation).pipe(fs.createWriteStream(tempLocation));
                            Portfolio.create({userId: req.params.id, filePath: fullphotopath, type: 'image'}).exec(function (err, user) {
                                if (err) {
                                    return res.json(err.status, {type: 'danger', msg: 'Error in update', error: err});
                                } else {
                                    return res.json(200, {type: 'success', msg: 'Portfolio image added', photoPath: fullphotopath});
                                }
                            });
                        }
                    } else {
                        return res.json(200, {type: 'error', msg: 'Something went wrong!'});
                    }
                }
            });
        } else {
            return res.json(200, {type: 'error', msg: 'Invalid attempt to update profile photo'});
        }
    },
    getPortfolioImgData: function (req, res) {
        Portfolio.find({userId: req.params.id, status: 'active', type: 'image'}).populateAll()
                .exec(function (err, data) {
                    if (err) {
                        return res.json(err);
                    } else {
                        return res.json(data);
                    }

                });

    },
    updatePortfolioImgDescription: function (req, res) {
        //console.log(req.body.id);
        if (req.body.id)
        {
            Portfolio.update({id: req.body.id, userId: req.body.userid}, {description: req.body.value}).exec(function (err, user) {
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
    deletePortfolioImg: function (req, res) {
        if (req.params.id) {
             Portfolio.update({id: req.params.id}, {status:"deleted"}).exec(function (err, user) {
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

    //Portfolio video process start 

    uploadPortfolioVideo: function (req, res) {
        if (req.params.id) {
            req.file('file').upload({dirname: sails.config.appPath + '/assets/images/portfolio/video/'},{ maxBytes: 1500000000}, function (err, uploadedFiles) {
                if (err) {
                    //return res.negotiate(err.status, {type: 'danger', msg: err});
                } else {
                    if (uploadedFiles[0].fd) {
                        var pathobj = require('path');
                        var fs      = require('fs');
                        if (pathobj.basename(uploadedFiles[0].fd)) {
                            var fullphotopath = "images/portfolio/video/" + pathobj.basename(uploadedFiles[0].fd);
                             var uploadLocation = process.cwd() +'/assets/images/portfolio/video/' + pathobj.basename(uploadedFiles[0].fd);
                             var tempLocation = process.cwd() + '/.tmp/public/images/portfolio/video/' +  pathobj.basename(uploadedFiles[0].fd);
                            fs.createReadStream(uploadLocation).pipe(fs.createWriteStream(tempLocation));
                            Portfolio.create({userId: req.params.id, filePath: fullphotopath, type: 'video'}).exec(function (err, user) {
                                if (err) {
                                    return res.json(err.status, {type: 'danger', msg: 'Error in update', error: err});
                                } else {
                                    return res.json(200, {type: 'success', msg: 'Portfolio image added', photoPath: fullphotopath});
                                }
                            });
                        }
                    } else {
                        return res.json(200, {type: 'error', msg: 'Something went wrong!'});
                    }
                }
            });
        } else {
            return res.json(200, {type: 'error', msg: 'Invalid attempt to update profile photo'});
        }
    },
    getPortfolioVideoData: function (req, res) {
        Portfolio.find({userId: req.params.id, status: 'active', type: 'video'}).populateAll()
                .exec(function (err, data) {
                    if (err) {
                        return res.json(err);
                    } else {
                        return res.json(data);
                    }

                });

    },
    //add comment
    updatePortfolioVideoDescription: function (req, res) {
        //console.log(req.body.id);
        if (req.body.id) {
            Portfolio.update({id: req.body.id, userId: req.body.userid}, {description: req.body.value}).exec(function (err, user) {
                if (err) {
                    return res.json(err.status, {type: 'danger', msg: 'Error in update', error: err});
                } else {
                    return res.json(200, {type: 'success', msg: 'Description updated'});
                }
            });
        } else {
            return res.json(200, {type: 'error', msg: 'Something went wrong!'});
        }
    },
    //add comment
    deletePortfolioVideo: function (req, res) {
        if (req.params.id) {
             Portfolio.update({id: req.params.id}, {status:"deleted"}).exec(function (err, user) {
                if (err) {
                    return res.json(err.status, {type: 'danger', msg: 'Error in update', error: err});
                } else {
                    return res.json(200, {type: 'success', msg: 'Image deleted'});
                }
            });
        } else {
            return res.json(200, {type: 'error', msg: 'Something went wrong!'});
        }

    }
};
