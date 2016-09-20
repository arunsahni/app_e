
module.exports = {
  /**
   * Save availability data of performer for calendar purpose
   * @return user saved events 
   *
  */
  saveData: function (req, res) {
    Unavailability.create(req.body).exec(function (err, data) {
      if (err) {
        return res.json(err.status, {err: err});
      } else {
        res.json(200, {status: "success", event: data});
      }
    });
  },
  getUnavailableData: function(req, res) {
      var i = req.params.all(),
	userId = i.userId;
    Unavailability.find({userId: userId}).exec(function(err, data) {
        if(err) {
            return res.json(err.status,{err: err});
        } else {
	    return res.json({status:200,type:"success", unavailable:data});
        }
    });
  },
  getBookingData: function(req, res) {
    var i = req.params.all(),
	  userId = i.userId;
    JobAssignment.find({performerId: userId}).populateAll().exec(function(err, result) {
      if(err) {
	     return res.json({status:200,type:"error", message: 'Not found'});
      } else {
	     return res.json({status:200,type:"success", myjobs: result});
      }
    });
  },
  deleteEvent: function(req, res) {
    var parameters = req.params.all();
    Unavailability.destroy({id: parameters.id}).exec(function(err, data) {
        if(err) {
            return res.json(err.status, {err: err});
        } else {
            return res.json({status: "success", id: parameters.id});
        }
    });
  },

  
  /**
   * Update unavailability of performer for calendar purpose
   * @return 
   *
  */
  updateEvent: function(req, res) {
    Unavailability.update({ id: req.body.id}, req.body ).exec(function(err, user){
      if(err) {
        return res.json(err.status, {type: 'danger', msg: 'Opps something went wrong, please try again later.', error:err});
      } else {
        res.json(200, {type: 'success', msg: 'Your event updated Sucessfully!'});
      } 
    });
  },

  /**
   * Get availability data of performer for calendar purpose
   * Used date from params to limit the data sent 
   * @return user events
   *
  */
  getCalData: function(req, res) {
    var i = req.params.all(),
    userId = i.userId;
    //console.log(i);
    Unavailability.find({
          userId: userId, 
          start: { '>': i.start, '<': i.end}
          /*{ start: {'>': i.start, '<': i.end}}*/
      }).exec(function(err, data) {
        if(err) {
          return res.json(err.status,{err: err});
        } else {
          return res.json(data);
        }
    });
  },

};// controller ends here
/*
http://localhost:1337/unavailability/getCalData?userId=563b505b1fbf82722c86438e&
start=2015-11-29&end=2016-01-10&_=1450850191517
*/