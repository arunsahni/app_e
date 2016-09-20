module.exports = {
addPerformer: function(req,res) {
	req.body.companyId = req.params.id;
	req.body.status = 'active';
	req.body.role = 'Performer';
	User.create(req.body).exec(function(err, data){
		if(data) {
			User.update({id: req.params.id}, {performerId: data.id});
	   return res.json(200, {type: 'success', msg: 'Account successfully created!'});
	   		} else {
	   			return res.json(405,{type:'danger', msg: err});
	   		}
	});
},//##
getCount: function(req, res) {
		//return res.json({status: 200, message: 'response from test function of admin!'});
		User.count({companyId: req.param('id'),'status':{'!':'deleted'},'role':'Performer'}).exec(function(error, count){
        //res.header("Access-Control-Allow-Origin:*");
         	return res.json({
              count: count,
            });
      	});
	},//##
getAllPerformer: function(req,res) {
		var page = req.param("page", 1);
	   	var limit = req.param("limit", 10);
	   	var sortBy = req.param("sortBy", "createdAt");
	   	var sortDir = req.param("sortDir", "asc");
	    var text = req.param("text",null);
filterObj =  {
                    //firstName : keyword_string
                     status:{'!':'deleted'},role:"Performer",
                     or: [{
                            status:{'!':'deleted'},role:"Performer",
                            //workPrice:{'>': parseInt(minPrice)},
                            //workPrice:{'<=': maxPrice},
                            firstName: {'like': '%'+text+'%'}
                          },
                          { lastName: {'like': '%'+text+'%'} }
                          ,
                          { displayName: {'like': '%'+text+'%'} }
                          ,
                          { zipCode: text }
                          ,
                          { companyName: {'like': '%'+text+'%'} }
                          , 
                          { phoneNumber: {'like': '%'+text+'%'} }
                          ,
                          { email: {'like': '%'+text+'%'} }
                          ]
                          //grossRating:ratingarray,
                         // servingCategory:categoryarray
                    };

			if(page && limit) {
	        User.find({companyId: req.param('id')})
				  .where(filterObj)
	        .sort(sortBy + ' ' + sortDir)
	        .paginate({page: page, limit: limit})
	     		.exec(function(error,data)
					{
	     		  return res.json(data);
	    	});
	  	} else {
	    	return res.json([ ]);
	  	}
},//##

deletePerformer: function(req,res) {
	User.update({id: req.params.id},{status:'deleted'}).exec(function(err,user)
	{
		if(user) {
	      return res.json(200, {type: 'success', data: user});
		} else {
		  return res.json(405,{type:'danger', msg: err});
		}
	});

},//##
getPerformer: function(req,res) {
	User.findOne({id:req.params.id,status: 'active'}).populateAll().exec(function(err,user){
    if(user) {
	      return res.json(200, {type: 'success', data: user});
		} else {
		  return res.json(405,{type:'danger', msg: err});
		}
	});
},//##
savePerformer: function(req,res) {
    req.body.companyId = req.params.id;
	User.update({id: req.body.id},req.body).exec(function(err,user)
	{
		if(!err) {
	      return res.json(200, {type: 'success', data: user});
		} else {
		  return res.json(405,{type:'danger', msg: err});
		}
	});
},//##
deleteMultiple: function(req, res) {
  for(var i=0; i<req.body.length; i++)
  {
      User.update({id: req.body[i]},{status: 'deleted'}).exec(function(err, data) {
        if(err)
        {
           return res.json(400, {type: 'danger', msg: 'Opps something went wrong please try again'});
        }
      });
  }
         return res.json(200, {type: 'Sucess', msg: 'Your Job Sucessfully deleted!'});
},//##
getAllPerformerAuto: function(req,res) {
	User.find({companyId:req.params.id,status: 'active'},{select: ['id', 'firstName']}).exec(function(err,user){
    if(user) {
	      return res.json(200, {type: 'success', data: user});
		} else {
		  return res.json(405,{type:'danger', msg: err});
		}
	});
},//##


getCompanyPaymentData: function(req,res) {
		var page = req.param("page", 1);
	   	var limit = req.param("limit", 10);
	   	//var sortBy = req.param("sortBy", "email");
	   	//var sortDir = req.param("sortDir", "asc");
	    var text = req.param("text",null);
			if(page && limit) {
	        Payment.find({$and:[{companyId: req.param('id')},{paymentType: 'Booking'}]})
				  .where({'status':{'!':'deleted'}})
		    .populate('performerId')
		    .populate('jobId')
            .sort('createdAt desc')
 	        .paginate({page: page, limit: limit})
              	.exec(function(error,data)
					{
	     		  return res.json(data);
	    	});
	  	} else {
	    	return res.json(error);
	  	}
},//##

getCompanyPaymentPerformerData: function(req,res) {
		var page = req.param("page", 1);
	   	var limit = req.param("limit", 10);
	   	//var sortBy = req.param("sortBy", "email");
	   	//var sortDir = req.param("sortDir", "asc");
	    var text = req.param("text",null);
			if(page && limit) {
	        Payment.find({$and:[{paymentType: 'Booking'},{performerId:req.param('text')}]})
				  .where({'status':{'!':'deleted'}})
		    .populate('performerId')
		    .populate('jobId')
            .sort('createdAt desc')
 	        .paginate({page: page, limit: limit})
              	.exec(function(error,data)
					{
	     		  return res.json(data);
	    	});
	  	} else {
	    	return res.json(error);
	  	}
},//##

searchCompanyData: function(req, res) {
	var page = req.param("page", 1);
	   	var limit = req.param("limit", 10);
	   	//var sortBy = req.param("sortBy", "email");
	   	//var sortDir = req.param("sortDir", "asc");
	    var text = req.param("text",null);
    if(req.body.startKey > req.body.endKey )
    {
      return res.json(405,{type: 'danger',msg:"Please select proper date formate"});
    } else { if(req.body.text!= undefined) {
       Payment.find({$and:[{$and:[{companyId: req.params.id},{performerId:req.body.text}]},{ createdAt : {$gte: req.body.startKey , $lte: req.body.endKey}}]})
            .where({'status':{'!':'deleted'}})
            .populate('performerId')
		    .populate('jobId')
            .sort('createdAt desc')
 	        .exec(function(err, data) {
      if (data) {
           return res.json(200, {data:data});
      } else {
        return res.json(401,{type: 'danger',msg:"Oops somthing went rong please try again later"});
         }
       });
    } else {
   Payment.find({$and:[{$and:[{companyId: req.params.id},{paymentType: 'Booking'}]},{ createdAt : {$gte: req.body.startKey , $lte: req.body.endKey}}]})
            .where({'status':{'!':'deleted'}})
            .populate('performerId')
		    .populate('jobId')
            .sort('createdAt desc')
 	        .exec(function(err, data) {
      if (data) {
           return res.json(200, {data:data});
      } else {
        return res.json(401,{type: 'danger',msg:"Oops somthing went rong please try again later"});
         }
       });
 	}
   }
  },//##
  getCompanyCount: function(req, res) {
    //return res.json({status: 200, message: 'response from test function of admin!'});
    Payment.count({$and:[{companyId: req.param('id')},{paymentType: 'Booking'}]})
      .where({'status':{'!':'deleted'}})
      .exec(function(error, count){
        //res.header("Access-Control-Allow-Origin:*");
          return res.json({
              count: count,
            });
        });
  },//##

  getCompanyPaymentPerformerSubData: function(req,res) {
		var page = req.param("page", 1);
	   	var limit = req.param("limit", 10);
	   	//var sortBy = req.param("sortBy", "email");
	   	//var sortDir = req.param("sortDir", "asc");
	    var text = req.param("text",null);
			if(page && limit) {
	        Payment.find({$and:[{companyId: req.param('id')},{paymentType: 'Subscription'}]})
				  .where({'status':{'!':'deleted'}})
		    .populate('performerId')
		    .populate('jobId')
            .sort('createdAt desc')
 	        .paginate({page: page, limit: limit})
              	.exec(function(error,data)
					{
	     		  return res.json(data);
	    	});
	  	} else {
	    	return res.json(error);
	  	}
},//##
 getCompanySubCount: function(req, res) {
    //return res.json({status: 200, message: 'response from test function of admin!'});
    Payment.count({$and:[{companyId: req.param('id')},{paymentType: 'Subscription'}]}).where({'status':{'!':'deleted'}}).exec(function(error, count){
        //res.header("Access-Control-Allow-Origin:*");
          return res.json({
              count: count,
            });
        });
  },//##
  getCompanyPaymentPerformerSubIdData: function(req,res) {
  	var page = req.param("page", 1);
	   	var limit = req.param("limit", 10);
	   	//var sortBy = req.param("sortBy", "email");
	   	//var sortDir = req.param("sortDir", "asc");
	    var text = req.param("text",null);
			if(page && limit) {
	        Payment.find({$and:[{$and:[{paymentType: 'Subscription'},{companyId: req.param('id')}]},{performerId:req.param('text')}]})
			.where({'status':{'!':'deleted'}})
		    .populate('performerId')
		    .populate('jobId')
            .sort('createdAt desc')
 	        .paginate({page: page, limit: limit})
              	.exec(function(error,data)
					{
	     		  return res.json(data);
	    	});
	  	} else {
	    	return res.json(error);
	  	}

  },//##
  searchCompanySubData: function(req, res) {
  	var page = req.param("page", 1);
	   	var limit = req.param("limit", 10);
	   	//var sortBy = req.param("sortBy", "email");
	   	//var sortDir = req.param("sortDir", "asc");
	    var text = req.param("text",null);
    if(req.body.startKey > req.body.endKey )
    {
      return res.json(405,{type: 'danger',msg:"Please select proper date formate"});
    } else { if(req.body.text!= undefined) {
       Payment.find({$and:[{$and:[{$and:[{companyId: req.params.id},{paymentType: 'Subscription'}]},{performerId:req.body.text}]},{ createdAt : {$gte: req.body.startKey , $lte: req.body.endKey}}]})
            .where({'status':{'!':'deleted'}})
            .populate('performerId')
		    .populate('jobId')
            .sort('createdAt desc')
 	        .exec(function(err, data) {
      if (data) {
           return res.json(200, {data:data});
      } else {
        return res.json(401,{type: 'danger',msg:"Oops somthing went rong please try again later"});
         }
       });
    } else {
   Payment.find({$and:[{$and:[{companyId: req.params.id},{paymentType: 'Subscription'}]},{ createdAt : {$gte: req.body.startKey , $lte: req.body.endKey}}]})
            .where({'status':{'!':'deleted'}})
            .populate('performerId')
		    .populate('jobId')
            .sort('createdAt desc')
 	        .exec(function(err, data) {
      if (data) {
           return res.json(200, {data:data});
      } else {
        return res.json(401,{type: 'danger',msg:"Oops somthing went rong please try again later"});
         }
       });
 	}
   }
  },//##
  changeStatus: function(req,res) {
  	if(req.param('status') == 'deactive') {
  		  User.update({id: req.param('id')},{status: 'active'}).exec(function(err, data) {
        if(err)
        {
           return res.json(400, {type: 'danger', msg: 'Opps something went wrong please try again'});
        } else {
        	 return res.json(200, {type: 'success', msg: 'Performer status successfully changed'});
         }
      });  
  	} else {
    User.update({id: req.param('id')},{status: 'deactive'}).exec(function(err, data) {
        if(err)
        {
           return res.json(400, {type: 'danger', msg: 'Opps something went wrong please try again'});
        } else {
        	 return res.json(200, {type: 'success', msg: 'Performer status successfully changed'});
        }
      });  
  	}
   
 }
};