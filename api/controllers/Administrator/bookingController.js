module.exports ={
  /**** Gets the total count of bookings
  ****  needed for pagination from the
  ***   JobAssignment schema.
  ***/
  getCount: function(req, res) {
    JobAssignment.count({'status':{'!':'deleted'}}).exec(function(error, count){
          return res.json({
              count: count,
            });
        });
  },
  /** Lists the total no. of
  *** bookings in the JobAssignment model
  **  also performs pagination
  *** and sorting.
  */
  listing: function (req, res) {
    var page = req.param("page", 1);
    var limit = req.param("limit", 10);
    var sortBy = req.param("sortBy", "email");
    var sortDir = req.param("sortDir", "asc");
    var text = req.param("text",null);
    if(page && limit) {
         JobAssignment.find({'status':{'!':'deleted'}})
                      .populate('jobId')
                      .populate('hostId')
                      .populate('performerId')
                      .sort(sortBy + ' ' + sortDir)
                      .paginate({page: page, limit: limit})
                      .exec(function(error,data)
                           {
                            return res.json(data);
                          });
                       }
                    else {
                       return res.json([ ]);
                         }
   },
   /*** Sets the status of a
    *** particular booking to
    *** deleted(Job Assignment)
    ***/

  delete : function(req,res){
    var id =req.param("id",null);
    JobAssignment.update({id:id},{status:"deleted"})
                 .exec(function(err,data){
                    if (err){
                      return res.json(err);
                            }
                   else{
                   return res.json(data);
                       }
                });
    },
    /*** Fetches the details of a
    **** particular booking from
    **** job Assignment schema.
    ***/
   details: function(req,res){
     var id = req.param("id",null);
     JobAssignment.findOne({id:id})
                  .populate('performerId')
                  .populate('jobId')
                  .populate('hostId')
                  .exec(function(err,data){
       if(err){
         return res.json(err);
        }
       else{
         return res.json(data);
       }
     });
   },
    /*** Updates the Booking details
    **** of a particular booking from
    **** Job Assignment schema.
    ****/

   update: function(req,res){
     var id= req.body.id;
      JobAssignment.update({id:id},req.body)
                   .exec(function(err,data){
                     if(err)
                     {
                       return res.json(err);
                     }
                   else{
                     return res.json(data);
                 }
            });
    },
    /*** Fetches the details of the
    ***  performers assigned for a
    ***  particular job
    ***/

  assignedPerformers: function(req,res){
     var id = req.param("id",null);
     JobAssignment.findOne({jobId:id})
                  .populate('performerId')
                  .exec(function(err,data){
                    if(err){
                     return res.json(err);
                       }
                    else{
                     return res.json(data);
                       }
                });
   },
   /*** Gets the count of disputed
   **** bookings (i.e. where
        assignmentStatus is Dispute)
    ***/
   disputedCount: function(req,res){
     JobAssignment.count({'status':{'!':'deleted'},'assignmentStatus':'Dispute'})
                  .exec(function(error, count){
                     return res.json({
                        count: count,
                      });
                 });
   },
   /*** Lists the bookings which have
   ***  the assignment status as
   ***  Dispute.
   ***/
   disputedList: function(req,res){
     var page = req.param("page", 1);
     var limit = req.param("limit", 10);
     var sortBy = req.param("sortBy", "email");
     var sortDir = req.param("sortDir", "asc");
     var text = req.param("text",null);
      if(page && limit) {
          JobAssignment.find({'status':{'!':'deleted'}})
                       .populate('jobId')
                       .populate('hostId')
                       .populate('performerId')
                       .where({'assignmentStatus':'Dispute'})
                       .sort(sortBy + ' ' + sortDir)
                       .paginate({page: page, limit: limit})
                       .exec(function(error,data)
                           {
                         return res.json(data);
                           });
                      }
       else {
       return res.json([ ]);
            }
    },


    settleDispute : function(req,res){
      var id = req.param("id",null);
      var payTo = req.param("paymentTo",null);
       JobAssignment.update({id:id},{assignmentStatus:"Dispute Settled",disputePaymentTo:payTo})
                    .exec(function(err,data){
                      if(err)
                      {
                        return res.json(err);
                      }
                    else{
                      return res.json(data);
                  }
             });
     },
};
