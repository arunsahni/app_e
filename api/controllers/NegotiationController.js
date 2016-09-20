module.exports = {

  createNego: function (req, res) {
     
    var params = req.params.all();  
     
     if(params){
            JobNegotiation.findOne({jobId : params.jobId,performerId : params.performerId})
                .exec(function(err, negoData) {
                if (err) {
                    res.json({status:200,message:"error"});
                } else {
                    if(negoData){
                        
                        User.findOne({id: negoData.performerId}).exec(function(err, uData) {
                            if(!uData){}else{

                                var emaildata = {};
                                emaildata.negoId = negoData.id;
                                emaildata.firstName = uData.firstName;
                                emaildata.email = uData.email;
                                EmailService.negotiationMailToPerformer(emaildata);
                            }
                        });
                        
                        //trigger notification
                        var notifydata = {};
                        notifydata.receiver = negoData.performerId;
                        notifydata.sender = negoData.hostId;
                        notifydata.message = "Negotiation request for job";
                        notifydata.attachedLink = "#/performer/negotiation/"+negoData.id;
                        notifydata.jobId = params.jobId;
                        NotificationService.createNotification(notifydata);
                        
                        
                    return res.json({status:200,message:"already"});
		}else{
                    
		    JobNegotiation.create(params, function(err, newNegoData) {
			    if (err) {
				res.json({status:200,message:"error"});
			    } else {
                                
                                
                                User.findOne({id: newNegoData.performerId}).exec(function(err, uData) {
                                    if(!uData){}else{
                                        
                                        var emaildata = {};
                                        emaildata.negoId = newNegoData.id;
                                        emaildata.firstName = uData.firstName;
                                        emaildata.email = uData.email;
                                        EmailService.negotiationMailToPerformer(emaildata);
                                    }
                                });
                                
                                
                                
                                 //trigger notification
                                var notifydata = {};
                                notifydata.receiver = newNegoData.performerId;
                                notifydata.sender = newNegoData.hostId;
                                notifydata.message = "Negotiation request for job";
                                notifydata.attachedLink = "#/performer/negotiation/"+newNegoData.id;
                                notifydata.jobId = params.jobId;
                                NotificationService.createNotification(notifydata);
                                
		        	res.json({status:200,message:"success",negoId : newNegoData.id});
		    	   }
		    }); // create the category
		}
                }
            });
     }else{
         res.json({status:200,message:"error"});
     }

  },
  //functoin to get all negotiation request for performers
  getPerformerNegotiations: function (req, res) {
    var params = req.params.all(); 

        JobNegotiation.find({performerId: params.performerId}).sort('createdAt DESC').populateAll().exec(function(err, data) {
            if(err) {
                return res.json({status:200,type:"error"});
            } else {
                if(!data){
                    return res.json({status: 200, type:'nodata',message:'no data'});
                }else{
                    return res.json({status: 200, type:'success',negotiations:data});
                }
            }
        });
    
  },
  //functoin to check negotiation detail for performer just pass id to get info
  getNegotiationDetail: function (req, res) {
    var params = req.params.all(); 

        JobNegotiation.findOne({id: params.id}).populateAll().exec(function(err, data) {
            if(err) {
                return res.json({status:200,type:"error"});
            } else {
                if(!data){
                    return res.json({status: 200, type:'nodata',message:'no data'});
                }else{
                    return res.json({status: 200, type:'success',negotiations:data});
                }
            }
        });
  },
  //functoin to update negotiation amount from performer
  updateNegotiationPrice: function (req, res) {
      var params = req.params.all(); 
      if(params){
 
          if(params.agreedPrice){
            JobNegotiation.update({id: params.id},{agreedPrice: params.agreedPrice, negoStatus:params.negoStatus}).exec(function(err, data) {
                if(err) {
                    return res.json({status:200,type:"error"});
                } else {
                    if(!data){
                        return res.json({status: 200, type:'nodata'});
                    }else{
                        
                         //trigger notification
                        if(data[0]){
                            var notifydata = {};
                            notifydata.receiver = data[0].hostId;
                            notifydata.sender = data[0].performerId;
                            notifydata.message = "Negotiation agreed @ $"+data[0].agreedPrice;
                            notifydata.attachedLink = "#/performer/profile/"+data[0].performerId;
                            notifydata.jobId = data[0].jobId;
                            NotificationService.createNotification(notifydata);
                        }
                        return res.json({status: 200, type:'success'});
                    }
                }
            });
          }
          
      }
  },
  //functoin to check negotiation detail for performer just pass id to get info
  getAmount: function (req, res) {
    var params = req.params.all(); 

        JobNegotiation.findOne({jobId: params.jobId,performerId: params.performerId,negoStatus:'Done'}).exec(function(err, data) {
            if(err) {
                return res.json({amount:0});
            } else {
                if(!data){
                    return res.json({amount:0});
                }else{
                    return res.json({amount: data.agreedPrice});
                }
            }
        });
  }
}