module.exports = {
  /*** Counts the total number of users
  ** who have their roles designated as
   ** Performers.
   */

  getCount: function(req, res) {
    //return res.json({status: 200, message: 'response from test function of admin!'});
    User.count({isAdmin: false,'status':{'!':'deleted'},'role':{'!':"Customer"}}).exec(function(error, count){
        //res.header("Access-Control-Allow-Origin:*");
          return res.json({
              count: count,
            });
        });
  },
  /** Lists the total no. of
  *** Performers in the User model
  ** also performs pagination
  *** and sorting.
  */
  listing: function (req, res) {
    // console.log(req.param.text);
    var page = req.param("page", 1);
    var limit = req.param("limit", 10);
    var sortBy = req.param("sortBy", "email");
    var sortDir = req.param("sortDir", "asc");
    var text = req.param("text",null);
    if(page && limit) {
        User.find({isAdmin: false}, {select: ['_id', 'firstName', 'email','role','status','lastName','paypalEmail','phoneNumber']})
            .where({'firstName': { startsWith : text },'status':{'!':'deleted'},'role':{'!':"Customer"}})
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
  /**** Updates the status of a user
   ** to deleted and lists back the
   all the other users.
   ***/

  delete : function(req,res){
    var id =req.param("id",null);
    User.update({id:id},{status:"deleted"})
        .exec(function(err,user){
      if (err){
        return res.json(err);
      }
      else{
          //  console.log('from delete'+user);
           return res.json(user);
        }
    });
    },
  changeStatus : function(req,res){
    var id = req.param("id",null);
    var state = req.param("status",null);
    if(state == "active"){
    User.update({id:id},{status:"deactive"})
         .exec(function(err,user){
               if(err){
                  return res.json(err);
                  }
               else{
                  return res.json(user);
                 }
           });
    }
     else{
    User.update({id:id},{status:"active"})
        .exec(function(err,user){
               if(err){
                  return res.json(err);
               }
            else{
               return res.json(user);
               }
        });
      }
  },

    /*** Fetches the details of a user
      **
    details: function(req,res){
      var id = req.param("id",null);
      User.findOne({id:id}).exec(function(err,user){
        if(err){
          return res.json(err);
         }
        else{
          return res.json(user);
        }
      });
    },
    /*** Updates the details of a particular
    user according to the form data
    **

    update: function(req,res){
      var id= req.body.id;
       User.update({id:id},req.body)
      .exec(function(err,user){
          if(err){
            return res.json(err);
          }
          else{
            return res.json(user);
          }
        });
    },*/



};
