var request = require('request');
module.exports.cron = {
  //this will be a cron job function which will run on daily basis at every 5 hours 
  /*Seconds: 0-59
Minutes: 0-59
Hours: 0-23
Day of Month: 1-31
Months: 0-11
Day of Week: 0-6*/
    
  checkUsersSubscription: {
    schedule: '0 0 */5 * * *',
    onTick: function () {
      
      
      var currentDate = new Date();
      UserSubscription.find().exec(function(err, usub) {
          
                if(usub){
                     for (variable in usub) {
                                //console.log(usub[variable]);
                               var userId = usub[variable].userId; 
                               var usersubscriptionend =  new Date(usub[variable].subscriptionEndDate);
                               if(currentDate > usersubscriptionend){
                                   User.update({ id: userId}, {feature_featured_listing:false,feature_guarantee:false}, function(errx, uD) {});
                                   console.log('subscription not active',usersubscriptionend);
                               }else{
                                   User.update({ id: userId}, {feature_featured_listing:true,feature_guarantee:true}, function(errx, uD) {});
                                   
                                    /*var notifydata = {};
                                    notifydata.receiver = userId;
                                    notifydata.sender = 0;
                                    notifydata.message = "testing cron running";
                                    notifydata.attachedLink = "#/performer/subscriptions";
                                    NotificationService.createNotification(notifydata);*/
                                    
                                    console.log('subscription active',usersubscriptionend);
                               }
                      }
                }
      })
      
    }
  },
  /*it will be a cron job function which run automatically to release performer's payment in every hour*/
  releasePayment: {
    schedule: '0 0 */1 * * *',
    onTick: function () {
      
      
      //24 hours releasing process
        var currentDate = new Date();
        //var twentyfourhours = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
        var condition = {
            paymentType: 'Booking',
            paymentStatus: 'Escrow'
        };
        Payment.find(condition).populate('jobAssignmentId').populate('performerId').exec(function (err, data) {
            if (err) {

            } else {
                if (data) {
                    for (variable in data) {
                        escrowreleaseFunction(data[variable]);
                    }
                }
                //return res.json({status: 200, type: "success", assignments: data});
            }
        });

        var escrowreleaseFunction = function (paymentData) {


            var performerid = paymentData.performerId.id;
            var secondaryEmail = paymentData.performerId.paypalEmail;
            var payKey = paymentData.payKey;
            var applicationFee = paymentData.applicationFee;
            var processingFee = paymentData.processingFee;
            var amount = paymentData.amount;
            var primaryAmount = (applicationFee + processingFee);
            var secondaryAmount = (amount - primaryAmount);

            if (performerid) {
                var assignmentUnderSatisfaction = paymentData.jobAssignmentId.assignmentUnderSatisfaction;
                var assignmentStatus = paymentData.jobAssignmentId.assignmentStatus;
                var paymentStatus = paymentData.jobAssignmentId.paymentStatus;
                var performerReview = paymentData.jobAssignmentId.performerReview;
                var updatedAt = new Date(paymentData.jobAssignmentId.updatedAt);
                var statusDate = new Date(paymentData.jobAssignmentId.statusDate);
                
                //console.log(assignmentStatus+"=="+paymentStatus+"=="+performerReview);
                if (assignmentStatus == 'Completed' && paymentStatus == 'Escrow') {
                    //payment can release
                    //checking performer active subscription for fast release

                    var timeDiff = Math.abs(currentDate.getTime() - statusDate.getTime()) / 3600000;
                    //console.log("1===="+performerid+"===",timeDiff)
                    
                    /*var notifydata = {};
                    notifydata.receiver = performerid;
                    notifydata.sender = 0;
                    notifydata.message = "testing cron running--"+timeDiff;
                    notifydata.attachedLink = "#/performer/subscriptions";
                    NotificationService.createNotification(notifydata);
                    */
                    
                    UserSubscription.findOne({userId: performerid, subscriptionEndDate: {$gte: currentDate}}).exec(function (err, subUserData) {

                        if (subUserData) {

                            if (timeDiff >= 24) {
                                //24 hour release
                                if (performerReview > 2 || performerReview == 0) {
                                    //console.log("2===="+payKey+"==="+primaryAmount+"==="+secondaryAmount+"==="+secondaryEmail)
                                    //releasing process
                                    releaseFundApi(payKey, primaryAmount, secondaryAmount, secondaryEmail);

                                } else if (performerReview == 1 || performerReview == 2) {
                                     //console.log("3===="+performerid+"===",timeDiff)
                                    //refund process
                                    fullRefundApi(payKey);
                                }
                            }

                        } else {
                            //console.log('normal',timeDiff);
                            //48 hour release
                            if (timeDiff >= 48) {
                                //48 hour release
                                if (assignmentUnderSatisfaction == true) {

                                    if (performerReview > 2 || performerReview == 0) {
                                        //releasing process
                                        releaseFundApi(payKey, primaryAmount, secondaryAmount, secondaryEmail);

                                    } else if (performerReview == 1 || performerReview == 2) {
                                        //full refund process
                                        fullRefundApi(payKey);
                                    }

                                } else {
                                    //pay to performer
                                    releaseFundApi(payKey, primaryAmount, secondaryAmount, secondaryEmail);
                                }
                            }
                        }

                    });
                } else if (assignmentStatus == 'Cancelled') {
                    //refund logic
                }
            }


        }

        //separate function to call escrow payment release
        var releaseFundApi = function (payKey, primaryAmount, secondaryAmount, secondaryEmail) {


            request({
                url: sails.config.globals.escrowReleaseApi, //URL to hit
                method: 'POST',
                //Lets post the following key/values as form
                form: {
                    payKey: payKey,
                    primaryAmount: primaryAmount,
                    secondaryAmount: secondaryAmount,
                    secondaryEmail: secondaryEmail,
                }
            }, function (error, response, body) {
                if (error) {
                    console.log('error', error);
                }
                else {
                    var respRec = JSON.parse(body);
                    if (respRec) {
                        //console.log(respRec);
                        if (respRec.type == 'success') {
                            if (respRec.data.paymentExecStatus == 'COMPLETED') {

                                //response IPN will update related record & data with notification

                            }
                        }
                    }
                }
            });


        }
        //separate function to call full refund api
        var fullRefundApi = function (payKey) {
            
            request({
                url: sails.config.globals.fullRefundApi, //URL to hit
                method: 'POST',
                //Lets post the following key/values as form
                form: {
                    payKey: payKey
                }
            }, function (error, response, body) {
                if (error) {
                    console.log('error', error);
                }
                else {
                    //response IPN will update related record & data with notification
                }
            });
            
        }
    }
  }
};