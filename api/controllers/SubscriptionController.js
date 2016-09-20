module.exports = {
/*function is using to initiate subscription process*/
   createTemp: function(req, res, next) {
        var params = req.body;
        
        if (params) {
            
                    params.ipnURL = sails.config.globals.ipnURLSubscriptionSuccess;
            
		    TempSubscription.create(params, function(err, newtempdata) {
			    if (err) {
				res.json({status:200,message:"error",errordata:err});
			    } else {
		        	res.json({status:200,message:"success",tempId : newtempdata.id});
		    	   }
		    }); // create the category
            
            
      }else{
          res.json({status:200,message:"error"});
      }
},
/*this function will be used to get subscription info by booking engine or success IPN*/
getTempSubscriptionInfo: function(req, res) {
    var params = req.params.all();
    if(params.tempID){
            TempSubscription.findOne({id:params.tempID}).populateAll().exec(function(err, data) {
            if(err) {
                return res.json({status: 200, message:err});
            } else {
                if(data){
                    return res.json({status: 200, message:'success', tempData:data});
                }else{
                    return res.json({status: 200, message:'error'});
                }
            }
        });
    }else{
        return res.json({status: 200, message:'error'});
    }
  }
  ,
/*this function will be call from booking engine after successful subscription payment*/
startUserSubscription: function(req, res) {
    var params = req.params.all();
    if(params.tempID){
            TempSubscription.findOne({id:params.tempID}).populateAll().exec(function(err, data) {
            if(err) {
                return res.json({status: 200, type:'error'});
            } else {
                if(data){
                    /*add users payment info*/
                    var paymentdata = {};
                    
                    paymentdata.hostId = 0;
                    paymentdata.performerId = data.userId.id;
                    if(data.userId.companyId){
                        paymentdata.companyId = data.userId.companyId;
                    }
                    
                    paymentdata.applicationFee = 0;
                    paymentdata.processingFee = 0;
                    paymentdata.amount = data.subscriptionAmount;
                    paymentdata.paymentType = 'Subscription';
                    paymentdata.recurringId = params.recProfileId;
                    paymentdata.paymentStatus = 'In-progress';

                    Payment.create(paymentdata, function(err, pdata) {
                        var currentDate = new Date();
                        var forendDate = new Date();
                        var subsdata = {};
                        subsdata.userId = data.userId.id;
                        subsdata.paymentId = pdata.id
                        subsdata.subscriptionName = data.subscriptionName;
                        subsdata.subscriptionAmount = data.subscriptionAmount;
                        subsdata.subscriptionStartDate = currentDate;
                        if(data.billingMode=='Month'){
                            forendDate.setMonth(currentDate.getMonth() + 1);
                        }else{
                            forendDate.setDate(currentDate.getDate() + 1);
                        }
                        
                        subsdata.subscriptionEndDate = forendDate;
                        subsdata.billingMode = data.billingMode;
                       
                        UserSubscription.findOne({userId:data.userId.id}).exec(function(err, usub) {
                            
                            //enable Feature Listings & Eligible for Guarantee of service for user
                            User.update({ id: data.userId.id}, {feature_featured_listing:true,feature_guarantee:true}, function(errx, uD) {});
                            
                            if(usub){
                               UserSubscription.update({ id: usub.id}, subsdata, function(errx, pdata) {
                                    if(errx){
                                        return res.json({status: 200, type:'error',dataupdate:errx});
                                    }else{
                                        
                                        UserSubscriptionLog.create(subsdata, function(errx, pdata) {
                                            
                                        }); 
                                        
                                         return res.json({status: 200, type:'success'});
                                    }
                                }); 
                                
                            }else{
                                
                                UserSubscription.create(subsdata, function(err, pdata) {
                                    if(err){
                                        return res.json({status: 200, type:'error',datanew:err});
                                    }else{
                                         UserSubscriptionLog.create(subsdata, function(errx, pdata) {
                                            
                                         });
                                         return res.json({status: 200, type:'success'});
                                    }

                                });
                            }
                            
                            
                        });
                        
                        
                        
                        //trigger notification
                        /*var notifydata = {};
                        notifydata.receiver = tempData.userId.id;
                        notifydata.sender = tempData.jobId.user_id;
                        notifydata.message = "You hired for the job - "+tempData.jobId.jobTitle;
                        notifydata.attachedLink = "#/performer/assignment/"+jobAssignData.id;
                        notifydata.jobId = tempData.jobId.id;
                        NotificationService.createNotification(notifydata);*/
                    });
                }else{
                    return res.json({status: 200, message:'error'});
                }
            }
        });
    }else{
        return res.json({status: 200, message:'error'});
    }
  },
/*function will call on users account area to check active subscription, result will be based on specific user*/  
getActiveSubscription: function(req, res) {
    var params = req.params.all();
    if(params.user_id){
        
            var curdate = new Date();
            UserSubscription.findOne({userId:params.user_id, subscriptionEndDate: { $gte: curdate }}).populateAll().exec(function(err, data) {
            if(err) {
                return res.json({status: 200,type:"error", message:err});
            } else {
                if(data){
                    return res.json({status: 200,type:"success", subData:data});
                }else{
                    return res.json({status: 200,type:"noactive"});
                }
            }
        });
    }else{
        return res.json({status: 200,type:"error", message:'error'});
    }
  }
  //cron job to check subscription written in config/cron.js
  
}