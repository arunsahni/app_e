module.exports ={
  /*** REturns the count of
  **** total no of transactions
  ****/
  getCount: function(req, res) {
    Payment.count({'status':{'!':'deleted'}}).exec(function(error, count){
          return res.json({
              count: count,
            });
        });
  },
  /** Lists the total no. of
  *** transactions in the Payment model
  ** also performs pagination
  *** and sorting.
  */
  listing: function (req, res) {
    var page = req.param("page", 1);
    var limit = req.param("limit", 10);
    var sortBy = req.param("sortBy", "email");
    var sortDir = req.param("sortDir", "asc");
    var text = req.param("text",null);
    if(page && limit) {
         Payment.find({'status':{'!':'deleted'}})
         .populate('jobId')
         .populate('companyId')
         .populate('hostId')
        // .where({'firstName': { startsWith : text },'status':{'!':'deleted'},'role':{'!':"Customer"}})
        .sort(sortBy + ' ' + sortDir)
        .paginate({page: page, limit: limit})
        .exec(function(error,data)
        {
          return res.json(data);
      });
    } else {
      return res.json([ ]);
    }
  },

  /*** Updates the status of a
   *** particular transaction
   *** to deleted
   ***/
  delete : function(req,res){
    var id =req.param("id",null);
    Payment.update({id:id},{status:"deleted"})
    .exec(function(err,data){
      if (err){
        return res.json(err);
      }
      else{
           return res.json(data);
        }
    });
   },

   /*** Returns the details of the transaction
    **  based on the id of the transaction
    ****/
   details: function(req,res){
     var id = req.param("id",null);
      Payment.findOne({id:id})
      .populate('jobId')
      .populate('companyId')
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

    /*** Updates the details of the
     *** transactions as per the
     *** new details entered
     **
   update: function(req,res){
     var id= req.body.id;
      Payment.update({id:id},req.body)
     .exec(function(err,data){
         if(err){
           return res.json(err);
         }
         else{
           return res.json(data);
         }
       });
   },*/

};
