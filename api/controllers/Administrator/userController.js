/**
 * Admin/userController
 *
 * @description :: Server-side logic for managing admin/users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	test: function(req, res) {
		return res.json({status: 200, message: 'response from test function of admin!'});
	},

	/**
     * Get count of all the users in database
     * Excluding admin & deleted candidates
     *
	*/
	getCount: function(req, res) {
		//return res.json({status: 200, message: 'response from test function of admin!'});
		User.count({isAdmin: false,'status':{'!':'deleted'},'role':'Customer'}).exec(function(error, count){
        //res.header("Access-Control-Allow-Origin:*");
         	return res.json({
              count: count,
            });
      	});
	},

	/**
	 * Get users listing
	 * Excluding admin & deleted candidates and
	 * also performs sorting
	 *
	*/
  	listing: function (req, res) {
		  // console.log(req.param.text);
		var page = req.param("page", 1);
	   	var limit = req.param("limit", 10);
	   	var sortBy = req.param("sortBy", "email");
	   	var sortDir = req.param("sortDir", "asc");
	    var text = req.param("text",null);
			if(page && limit) {
	        User.find({isAdmin: false}, {select: ['_id', 'firstName', 'email','lastName','phoneNumber','status','gender','address']})
				  .where({'firstName': { startsWith : text },'status':{'!':'deleted'},'role':"customer"})
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
		/**
		 * Changes the status of users to deleted
		 *and returns the object of deleted User
		*
		**/
		delete : function(req,res){
			var id =req.param("id",null);
			User.update({id:id},{status:"deleted"})
			.exec(function(err,user){
				if (err){
					return res.json(err);
				}
		  	else{
					   console.log('from delete'+user);
						// return res.json(data);
					}
			});
      },
			/***** Finds the Details of a user
			*** and returns it.
			**/

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
			/***** Updates the details of a particular
       **** user based on the id of a
       **    user **/
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
       },
			 /*** Activates or deactivates
			  *** the status of the user
				***/
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



};
