module.exports = {
// To save Dispute messages
  saveDisputeMsg: function (req, res) {
    jobMessages.create(req.body).exec(function (err, data) {
      if (err) {
        return res.json(err.status, {err: err});
      } else {
        res.json(200, {status: "Success"});
      }
    });
  },
  getDisputeMsg: function (req, res) {
    var parameter = req.params.all();
    jobMessages.find({assignmentId: parameter.assignmentId}).sort( { createdAt: -1 } ).populate('userId').exec(function(err, data) {
        if(err) {
            return res.json(err.status,{err: err});
        } else {
            return res.json({status: 200, jobMessages:data});
        }
    });
  }
}
