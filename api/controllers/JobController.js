module.exports = {

  /**
   *  
   * Posting a job 
   *
  */
	 postJob: function (req, res) {
    if(req.body.jobBudget > 0) {
    Job.create( {jobCategory: req.body.jobCategory, user_id: req.params.id,
    jobTitle: req.body.jobTitle, jobDescription: req.body.jobDescription, 
    jobStartDateTime: req.body.jobStartDateTime, jobStartEndTime: req.body.jobStartEndTime,
    jobBudget: req.body.jobBudget, jobStatus: 'Not started', status: 'active'}).exec(function (err, data) {
      if (err) {
        return res.json(err.status, {err: err});
      } else {
              return res.json({status: 200, message: 'Thank you for posting job on ejizzy'});
             }
    });
  } else {
          return res.json(400, {type: 'danger', msg: 'Please enter a valid budget'});
  }
  },//#

  getCount: function(req, res) {
    //return res.json({status: 200, message: 'response from test function of admin!'});
    Job.count({$and: [{'status':{'!':"deleted"}},{user_id: req.param('id')}]}).exec(function(error, count){
        //res.header("Access-Control-Allow-Origin:*");
          return res.json({
              count: count,
            });
        });
  },

//All job data related with logedin user id

  getJobData: function(req, res) {
    var page = req.param("page", 1);
    var limit = req.param("limit", 10);
    var sortBy = req.param("sortBy", "createdAt");
    var sortDir = req.param("sortDir", "asc");
    var text = req.param("text",' ');
    var text1 = req.param("text1", ' ');
    if(page && limit) {
         Job.find({$and: [{'status':{'!':"deleted"}},{user_id: req.param('id')}]})
        .where({'jobStatus': { startsWith : text }})
        .where({'jobTitle': { startsWith : text1 }})
        .populate('user_id')
        .sort(sortBy + ' ' + sortDir)
        .paginate({page: page, limit: limit})
        .exec(function(err,data)
        {
          if(err) {
            return res.json(err.status,{err: err});

          } else {
                return res.json(data);
          }
      });
    } else {
      return res.json([ ]);
    }
  },//#

/*getJobFilter: function(req, res) {
  Job.find({$and:[{$and:[{jobStatus: req.body.jobStatus}, {'status':{'!':"deleted"}}]}, {user_id: req.params.id}]})
  .exec(function(err,data)
  {
       if(err) {
            return res.json(err.status,{err: err});
          } else {
                return res.json(data);
          }
  });
},*/

//spacific job data for editing job details with spacific job id

  getData: function(req, res) {
    Job.find({id: req.params.id}).populate('jobCategory').exec(function(err, data) {
   if(err) {
    return res.json(err.status,{err: err});
   } else {
    return res.json({status: 200, job:data});
   }
    });
  },//#

  //save data after editing

  editJobData: function(req, res) {
    Category.find({$or:[{categoryTitle: req.body.jobCategory},{_id: req.body.id}]}).exec(function(err,data) {
    if(req.body.jobBudget > 0) {

     if(data[0]!=undefined) { 
     req.body.jobCategory = data[0].id;   
     Job.update({ id: req.body.id}, req.body ).exec(function(err, user){

     if(err) {
        return res.json(err);
     } else {
        return res.json(200, {type: 'Sucess', msg: 'Your Job details updated Sucessfully!'});
   }
     });
     
   } else {
       return res.json(400, {type: 'danger', msg: 'Opps something went wrong please try again'});
   } 
 } else {
      return res.json(400, {type: 'danger', msg: 'Please enter a valid budget'});
}
    });
  },//#
  //delete job by user

  deleteJob: function(req, res) {
    Job.update({id: req.params.id},{status: 'deleted'}).exec(function(err, data) {

  if(err) {
            return res.json(400, {type: 'danger', msg: 'Opps something went wrong please try again'});
     } else {
       return res.json(200, {type: 'Sucess', msg: 'Your Job Sucessfully deleted!'});
     }

    });
  },//#
//search by title 
  searchData: function(req, res) {
    
    Job.find({$and: [{jobTitle: req.body.key},{user_id: req.params.id}]}).exec(function(err, data) {
      if(err) {
         return res.json(400, {type: 'danger', msg: 'Opps something went wrong please try again'});
       } else {
               return res.json(200, {job: data});
       }

  });
}, //##

deleteMultiple: function(req, res) {
  for(var i=0; i<req.body.length; i++)
  {
      Job.update({id: req.body[i]},{status: 'deleted'}).exec(function(err, data) {
        if(err)
        {
           return res.json(400, {type: 'danger', msg: 'Opps something went wrong please try again'});
        }
      });
  }
         return res.json(200, {type: 'Sucess', msg: 'Your Job Sucessfully deleted!'});

},//##
getMyNewJobs: function(req, res) {

    var requestdata = req.params.all();
    if(requestdata.userID){
        
        
        Job.find({user_id: requestdata.userID, status: 'active', jobStatus: 'Not started'}, {select: ['id', 'jobTitle']}).exec(function(err, data) {
            if(err) {
                    return res.json(400, {type: 'danger', msg: 'Opps something went wrong please try again'});
            } else {
                    return res.json(200, {jobsData: data});
            }
       });
        
    }
  },//##
  getJobDetailByID: function(req, res) {
    var params = req.params.all();  
    Job.findOne({id: params.id}).populate('jobCategory').exec(function(err, data) {
        if(err) {
            return res.json({status:200,type:"error",message: 'Not found'});
            //return res.json(err.status,{err: err});
        } else {
            return res.json({status:200,type:"success", job:data});
            //return res.json({status: 200, job:data});
        }
    });
  },

};