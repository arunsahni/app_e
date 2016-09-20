module.exports = {
// To save Reviews
  saveReviews: function (req, res) {
    var assignmentId =  req.body.assignmentId;
    var userId =  req.body.userId;
    var userrating = req.body.reviewRating;
    
      userReview.findOne({assignmentId: assignmentId, userId:userId}).exec(function(err, data) {
        if (data) {
           res.json(200, {status: 'Success'});
        }else{
           userReview.create(req.body).exec(function (err, urdata) {
              if(urdata){
                JobAssignment.findOne({id: assignmentId}).exec(function(err, jAdata) {
                    if (jAdata) {
                       if (jAdata.performerId == userId) {
                           JobAssignment.update({id:assignmentId},{performerReview:userrating}).exec(function(err, assignmentStatus){
                            
                           });
                       }else if (jAdata.hostId == userId) {
                           JobAssignment.update({id:assignmentId},{customerReview:userrating}).exec(function(err, assignmentStatus){
                            
                           });
                       }
                    }
                  });
                
                //update user gross

                  userReview.find({userId: userId}).average('reviewRating').exec(function(err, result){
                          if (result) {
                            
                                    User.update({id: userId},{grossRating: result[0].reviewRating}).exec(function(err, user){
                                                  if(err) {
                                                    return res.json(err.status, {error:err});
                                                  } else {
                                                    res.json(200, {status: 'Success'});
                                                  } 
                                     });
                          }
                              
                  });
              }
            
           });
        }
        
        
        
	  
        
      });
  },
  getReviews: function(req, res) {
    var i = req.params.all(),
	userId = i.userId;
    userReview.find({userId: userId}).populate('reviewerId').exec(function(err, data) {
        if(err) {
            return res.json(err.status,{err: err});
        } else {
            return res.json({status: 200, performerReview:data});
        }
    });
  }
}