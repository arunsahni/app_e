module.exports = {
  /*** Counts the total number of
  **** jobs posted by all the users.
  ****/
  getCount: function(req, res) {
		Job.count({'status':{'!':"deleted"}}).exec(function(error, count){
         	return res.json({
              count: count,
            });
      	});
	},

  /*** Lists all the jobs posted
   *** by all the users from
   *** job table.
   ***/
  listing: function (req, res) {
    var page = req.param("page", 1);
    var limit = req.param("limit", 10);
    var sortBy = req.param("sortBy", "email");
    var sortDir = req.param("sortDir", "asc");
    var text = req.param("text",null);
    if(page && limit) {
         Job.find({'status':{'!':"deleted"}})
            .populate('user_id')
            .populate('jobCategory')
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
    /*** Updates the status of a
      ** particular job to deleted
      **/

  delete : function(req,res){
    var id =req.param("id",null);
    Job.update({id:id},{status:"deleted"})
       .exec(function(err,data){
        if (err){
          return res.json(err);
        }
      else{
           return res.json(data);
          }
  });
},
   /*** Fteches the details of a
    *** particular Job from job table
    ***/
   details: function(req,res){
     var id = req.param("id",null);
     Job.findOne({id:id}).exec(function(err,data){
         if(err){
             return res.json(err);
             }
       else{
             return res.json(data);
           }
     });
   },
   /*** Updates the Value of Job Fields
    *** as per the new form body
    ***/

   update: function(req,res){
     var id= req.body.id;
      Job.update({id:id},req.body)
     .exec(function(err,data){
         if(err){
           return res.json(err);
         }
         else{
           return res.json(data);
         }
       });
   },

};
