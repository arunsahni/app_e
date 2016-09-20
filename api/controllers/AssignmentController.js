module.exports = {
createTemp: function(req, res, next) {
        var params = req.body;
        
        if (params) {
            
            JobAssignment.findOne({jobId : params.jobId,performerId : params.userId})
                .exec(function(err, assignment) {
                if (err) {
                    res.json({status:200,message:"error"});
                } else {
                    if(assignment){
                    return res.json({status:200,message:"already"});
		}else{
                    
                    User.findOne({id: params.userId}).exec(function(err, data) {
                        
                        params.siteCommissionPercent = sails.config.globals.siteCommissionIndividual;
                        if(data){
                            if(data.companyId && data.companyId != undefined){
                                params.siteCommissionPercent = sails.config.globals.siteCommissionCompany;
                            }
                        }
                        
                        
                        params.processingFeeAmount = sails.config.globals.processingFee;
                        params.ipnURL = sails.config.globals.ipnURLEscrowSuccess;
                        //console.log(params); return false;
                        TempBooking.create(params, function(err, newtempdata) {
                                if (err) {
                                    res.json({status:200,message:"error"});
                                } else {
                                    res.json({status:200,message:"success",tempId : newtempdata.id});
                               }
                        }); // create the category
                        
                        
                    })
		}
                }
            });
      }else{
          res.json({status:200,message:"error"});
      }
},
// To count Performers
jobAssigneeCount: function(req, res) {
    var params = req.params.all();
	JobAssignment.count({hostId: params.host_id}).exec(function(err, count) {
		if (err) {
			return res.json(err.status,{err: err});
		} else {
			return res.json({status: 200, count: count});
		}
		});
},
//function to get performer's job count for listing pagination
getperformerJobCount: function(req, res) {
    var params = req.params.all();
	JobAssignment.count({performerId: params.performerId}).exec(function(err, count) {
		if (err) {
			return res.json(err.status,{err: err});
		} else {
			return res.json({status: 200, count: count});
		}
		});
},
// For all Job assignee
getBookingDetails: function(req, res) {
    var i = req.params.all(),
        begin = i.begin,
	userId = i.userId;
    JobAssignment.find({hostId: userId}).skip(begin).limit(10).populate('performerId').populate('jobId').exec(function(err, data) {
        if(err) {
            return res.json(err.status,{err: err});
        } else {
            return res.json({status: 200, jobAssignment:data});
        }
    });
  },
// For all Job assignee
gerPerformersJob: function(req, res) {
    var i = req.params.all(),
        begin = i.begin,
	userId = i.performerId;
    JobAssignment.find({performerId: userId}).skip(begin).limit(10).populate('hostId').populate('jobId')
    .sort('createAt desc')
    .exec(function(err, data) {
        if(err) {
            return res.json(err.status,{err: err});
        } else {
            return res.json({status: 200, jobAssignment:data});
        }
    });
  },

// For Individual Job assignee
getBookingInfo: function(req, res) {
    var params = req.params.all();
    JobAssignment.findOne({id: params.id}).populateAll().exec(function(err, data) {
        if(err) {
                return res.json({status:200,type:"error", message: 'Not found'});
        } else {
		userReview.findOne({assignmentId: params.id, userId: data.hostId.id}).exec(function(err, result){
			if (err) {
				return res.json({status:200,type:"error", message: 'Not found'});	
			} else {
				data.userReview = result;
				return res.json({status:200,type:"success", jobAssignment:data});
			}
		});
        }
    });
  },
  // For Performer details page
  getJobInfo: function(req, res) {
    var params = req.params.all();
    JobAssignment.findOne({id: params.id}).populateAll().exec(function(err, data) {
        if(err) {
                return res.json({status:200,type:"error", message: 'Not found'});
        } else {
		userReview.findOne({assignmentId: params.id , userId: data.performerId.id}).exec(function(err, result){
			if (err) {
				return res.json({status:200,type:"error", message: 'Not found'});	
			} else {
				data.userReview = result;
				return res.json({status:200,type:"success", jobAssignment:data});
			}
		});
        }
    });
  },
// To Update Assignment Status
updateAssignmentStatus: function(req, res) {
    var parameter = req.body;
    //console.log(parameter);
    var sDate = new Date();
    JobAssignment.update({id: parameter.assignment_id},{assignmentStatus: parameter.assignmentStatus, statusDate: sDate}).exec(function(err, assignmentStatus){
    if(err) {
      return res.json(err.status, {error:err});
    } else {
        
        if(parameter.statusBy){
            if(assignmentStatus[0].performerId == parameter.statusBy){
                //notify to customer
                
                var notifydata = {};
                notifydata.receiver = assignmentStatus[0].hostId;
                notifydata.sender = 0;
                notifydata.message = "Assignment status changed as "+ parameter.assignmentStatus;
                notifydata.attachedLink = "#/jobs/bookingDetail/"+assignmentStatus[0].id;
                NotificationService.createNotification(notifydata);
                
            }else{
                //notify to performer
                
                var notifydata = {};
                notifydata.receiver = assignmentStatus[0].performerId;
                notifydata.sender = 0;
                notifydata.message = "Assignment status changed as "+ parameter.assignmentStatus;
                notifydata.attachedLink = "#/performer/assignment/"+assignmentStatus[0].id;
                NotificationService.createNotification(notifydata);
            }
        }
        
      res.json(200, {status: assignmentStatus});
    } 

    });
},
// To save Cancelltion reason
saveReason: function(req, res) {
    var parameter = req.body;
    var sDate = new Date();
    JobAssignment.update({id: parameter.assignment_id},{cancelReason: parameter.cancelReason, statusDate: sDate}).exec(function(err, result){
    if(err) {
      return res.json(err.status, {error:err});
    } else {
      res.json(200, {status: 'success'});
    } 

    });	
},

/*function to get temprary booking for booking engine */    
getTempBookingInfo: function(req, res) {
    var params = req.params.all();
    res.header("Access-Control-Allow-Origin","*");
    if(params.tempBookingID){
            TempBooking.findOne({id:params.tempBookingID}).populateAll().exec(function(err, data) {
            if(err) {
                return res.json({status: 200, message:err});
            } else {
                if(data){
                    return res.json({status: 200, message:'success', tempData:data});
                }else{
                    return res.json({status: 200, message:'error'});
                }
            }
        });
    }else{
        return res.json({status: 200, message:'error'});
    }
  },
  /*create new assignment after successful booking*/
  createAssignment: function(req, res) {
        var params = req.body;
        req.header("Access-Control-Allow-Origin","*"); //it is used to access this function from different server/ports
        if (params) {
                    JobAssignment.create(params, function(err, newdata) {
			    if (err) {
				res.json({status:200,message:"error"});
			    } else {
                                
                                  Job.update({id: params.jobId},{jobStatus: 'In-progress'}).exec(function(err, data) {
                                    
                                  });
                                
		        	res.json({status:200,message:"success"});
		    	   }
		    });
      }else{
          res.json({status:200,message:"error"});
      }
},
/*function is used to get all booking info on particular job*/
  getAllAssignmentOnJob: function(req, res) {
    var params = req.params.all();  
    JobAssignment.find({jobId: params.id}).populate('performerId').exec(function(err, data) {
        if(err) {
            return res.json({status:200,type:"error",message: 'Not found'});
            //return res.json(err.status,{err: err});
        } else {
            return res.json({status:200,type:"success", assignments:data});
            //return res.json({status: 200, job:data});
        }
    });
  },

    /**
       * Get jobs data of performer for calendar purpose
       * Used start & end date from params to limit the data sent 
       * @return performer events
       *
    */
    getCalData: function(req, res) {
        var moment = require('moment');
        //moment().format();
        var i = req.params.all(),
        begin = i.begin,
        userId = i.userId;
        JobAssignment.find(
            {
                performerId: userId                
            }
        ).populate('jobId', { jobStartDateTime: { '>': i.start, '<': i.end} })
        .exec(function(err, data) {
            var test = [];
            if(err) {
                return res.json(err.status, {err: err});
            } else {
                for(event in data) {
                    if(data[event].jobId != undefined) {
                        test.push(
                            {
                                id: data[event].jobId.id, 
                                title: data[event].jobId.jobTitle, 
                                start: moment(data[event].jobId.jobStartDateTime).format(),//.toISOString().replace(/\..+/, '')
                                end: moment(data[event].jobId.jobStartEndTime).format(),//.toISOString().replace(/\..+/, '')
                                url: '#/performer/assignment/' + data[event].id,
                                editable: false,
                                color: 'green',
                                className: 'performer-event'
                            }
                        );
                    }
                    if((data.length - 1) == event) {
                        return res.json(test);
                    }
                }
            }
        });
    },


    
};//ends 
