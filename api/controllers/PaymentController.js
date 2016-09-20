module.exports = {
    ipn: function (req, res) {
        var params = req.params.all();
        res.send(200);
        //console.log('check params',params);

        /*var params = { 
         txn_id: '1252',
         txn_type: 'recurring_payment',
         recurring_payment_id: 'I-98EKR51CXUBJ' 
         }*/

        if (params) {
            if (params.txn_type == 'recurring_payment_profile_cancel') {
                var recurring_payment_id = params.recurring_payment_id;
                //we will update users subscription for recurring profile id
                Payment.findOne({recurringId: recurring_payment_id}).exec(function (err, pData) {
                    if (pData) {
                        if (pData.performerId) {

                            var notifydata = {};
                            notifydata.receiver = pData.performerId;
                            notifydata.sender = 0;
                            notifydata.message = "Your active subscription has been cancelled";
                            notifydata.attachedLink = "#/performer/subscriptions";
                            NotificationService.createNotification(notifydata);
                            Payment.update({ id: pData.id}, {recurringId:''}, function(errx, puData) {});

                            /*var currentDate = new Date();
                             var usub = {};
                             usub.subscriptionEndDate = currentDate;
                             UserSubscription.update({ id: pData.performerId}, usub, function(errx, usData) {
                             
                             var notifydata = {};
                             notifydata.receiver = pData.performerId;
                             notifydata.sender = 0;
                             notifydata.message = "Your active subscription has been cancelled";
                             notifydata.attachedLink = "#/performer/subscriptions";
                             NotificationService.createNotification(notifydata);
                             
                             });*/


                            /*UserSubscription.destroy({userId:pData.performerId}).exec(function deleteCB(err){
                             
                             });*/
                        }
                    }
                });
            } else if (params.txn_type == 'recurring_payment') {
                var recurring_payment_id = params.recurring_payment_id;

                var txn_id = 0
                if (params.txn_id) {
                    txn_id = params.txn_id;
                }


                Payment.findOne({recurringId: recurring_payment_id}).exec(function (err, pData) {
                    if (pData) {
                        if (pData.performerId) {
                            if (pData.paymentStatus == 'In-progress') {
                                //update existing payment
                                pData.paymentStatus = 'Paid';
                                pData.txnId = txn_id;
                                if (params.amount) {
                                    pData.amount = params.amount;
                                }
                                Payment.update({id: pData.id}, pData).exec(function (err, pUData) {
                                    //payment received notificaton

                                    var notifydata = {};
                                    notifydata.receiver = pData.performerId;
                                    notifydata.sender = 0;
                                    notifydata.message = "Your recurring payment is confirmed";
                                    notifydata.attachedLink = "#/performer/subscriptionsPayment";
                                    NotificationService.createNotification(notifydata);


                                });
                            } else {
                                //create new payment
                                delete pData.id;
                                delete pData.createdAt;
                                delete pData.updatedAt;
                                pData.paymentStatus = 'Paid';
                                pData.txnId = txn_id;
                                if (params.amount) {
                                    pData.amount = params.amount;
                                }
                                Payment.create(pData, function (err, pdata) {
                                    //recurring payment received

                                    UserSubscription.findOne({userId: pData.performerId}).exec(function (err, usub) {
                                        var currentDate = new Date();
                                        var forendDate = new Date();
                                        usub.subscriptionStartDate = currentDate;
                                        if (usub.billingMode == 'Month') {
                                            forendDate.setMonth(currentDate.getMonth() + 1);
                                        } else {
                                            forendDate.setDate(currentDate.getDate() + 1);
                                        }
                                        usub.subscriptionEndDate = forendDate;
                                        usub.paymentId = pData.id;
                                        UserSubscription.update({id: usub.id}, usub, function (errx, usData) {

                                            User.update({id: pData.performerId}, {feature_featured_listing: true, feature_guarantee: true}, function (errx, uD) {
                                            });

                                            var notifydata = {};
                                            notifydata.receiver = usub.id;
                                            notifydata.sender = 0;
                                            notifydata.message = usub.billingMode + " subscription payment released";
                                            notifydata.attachedLink = "#/performer/subscriptionsPayment";
                                            NotificationService.createNotification(notifydata);


                                        });
                                    });

                                });
                            }
                        }
                    }
                });
            }

            var ipnd = {};
            ipnd.ipnData = params;
            IpnLog.create(ipnd, function (err, ipnd) {
            });
        }

    },
    escrowSuccess: function (req, res) {

        //req.header("Access-Control-Allow-Origin","*");
        var params = req.params.all();
        res.send(200);
        //console.log('check params',params);
        //return true;
        //console.log('check params all',req.params.all());

        /*
         first response
         var params = { transaction: [ 'NONE', 'NONE' ],
         log_default_shipping_address_in_transaction: 'false',
         action_type: 'PAY_PRIMARY',
         ipn_notification_url: 'http://192.155.246.146:1238/ejizzy/ejizzyPayKeySuccess',
         charset: 'windows-1252',
         transaction_type: 'Adaptive Payment PAY',
         notify_version: 'UNVERSIONED',
         cancel_url: 'http://localhost:1337/#/performer/profile/5653008a45d8ab3525eb4e45?lnkaction=hire',
         verify_sign: 'AFcWxV21C7fd0v3bYYYRCpSSRl31AswNF4o2CTyYEQZ.6WpPSVmEoiuq',
         sender_email: 'brijeshbuy@yopmail.com',
         fees_payer: 'SECONDARYONLY',
         return_url: 'http://localhost:1337/#/jobs/myBokinglist',
         memo: 'Hiring "Brij Performer" for job : job 2',
         reverse_all_parallel_payments_on_error: 'false',
         tracking_id: '5668075a9d3cffab1a86842a',
         pay_key: 'AP-0MH95149YB243811H',
         status: 'INCOMPLETE',
         test_ipn: '1',
         payment_request_date: 'Wed Dec 09 00:49:39 PST 2015',
         id: undefined };
         
         final response
         { payment_request_date: 'Mon Dec 14 23:08:43 PST 2015',
         transaction: [ 'USD 1.50', '7YY316551T536472F' ],
         cancel_url: 'http://192.155.246.146:1237/#/performer/profile/565591d043b9d95a1206c7a1?lnkaction=hire',
         pay_key: 'AP-2A180060RL056942N',
         sender_email: 'bpcust123@yopmail.com',
         charset: 'windows-1252',
         tracking_id: '566fbbbf377b87dc64637453',
         log_default_shipping_address_in_transaction: 'false',
         verify_sign: 'AFcWxV21C7fd0v3bYYYRCpSSRl31AQc5cVWL0.D-PvkfQHEV0M6KrnME',
         test_ipn: '1',
         status: 'COMPLETED',
         ipn_notification_url: 'http://192.155.246.146:1237/payment/escrowSuccess',
         fees_payer: 'SECONDARYONLY',
         return_url: 'http://192.155.246.146:1237/#/jobs/myBokinglist',
         transaction_type: 'Adaptive Payment PAY',
         reverse_all_parallel_payments_on_error: 'false',
         resend: 'true',
         action_type: 'PAY_PRIMARY',
         notify_version: 'UNVERSIONED',
         memo: 'Hiring "Brijesh Performer" for job : neeeded jumping castle for an event' }
         
         */
        //console.log(params);   
        if (params) {
            if ((params.status == 'INCOMPLETE' || params.status == 'COMPLETED') && params.tracking_id && params.pay_key) {

                if (params.tracking_id) {
                    TempBooking.findOne({id: params.tracking_id}).populateAll().exec(function (err, tempData) {
                        if (err) {
                            //console.log(err);
                            return res.json({status: 200, message: err});
                        } else {

                            if (tempData) {

                                if (tempData.jobId.id) {

                                    Payment.findOne({jobId: tempData.jobId.id, payKey: params.pay_key}).exec(function (err, paymentData) {

                                        if (paymentData) {
                                            if (params.status == 'COMPLETED') {
                                                var jobassignid = paymentData.jobAssignmentId;
                                                var paymentrecid = paymentData.id;
                                                var performerId = paymentData.performerId;

                                                JobAssignment.update({id: jobassignid}, {paymentStatus: 'Paid'}).exec(function (err, jobData) {
                                                    Payment.update({id: paymentrecid}, {paymentStatus: 'Paid'}).exec(function (err, resp) {
                                                        if (resp) {
                                                            //trigger notification
                                                            var notifydata = {};
                                                            notifydata.receiver = performerId;
                                                            notifydata.sender = 0;
                                                            notifydata.message = "Payment released on " + tempData.jobId.jobTitle;
                                                            notifydata.attachedLink = "#/performer/assignment/" + jobassignid;
                                                            notifydata.jobId = tempData.jobId.id;
                                                            NotificationService.createNotification(notifydata);
                                                        }

                                                    });
                                                });
                                            } else if (params.status == 'INCOMPLETE' && params.reason_code == 'Refund') {

                                                var jobassignid = paymentData.jobAssignmentId;
                                                var paymentrecid = paymentData.id;
                                                var performerId = paymentData.performerId;

                                                JobAssignment.update({id: jobassignid}, {paymentStatus: 'Refund'}).exec(function (err, jobData) {
                                                    Payment.update({id: paymentrecid}, {paymentStatus: 'Refund'}).exec(function (err, resp) {
                                                        if (resp) {
                                                            //trigger notification
                                                            var notifydata = {};
                                                            notifydata.receiver = performerId;
                                                            notifydata.sender = 0;
                                                            notifydata.message = "Payment refunded on " + tempData.jobId.jobTitle;
                                                            notifydata.attachedLink = "#/performer/assignment/" + jobassignid;
                                                            notifydata.jobId = tempData.jobId.id;
                                                            NotificationService.createNotification(notifydata);
                                                        }

                                                    });
                                                });
                                            }
                                        } else {


                                            var assignmentData = {};
                                            assignmentData.jobId = tempData.jobId.id;
                                            assignmentData.performerId = tempData.userId.id;
                                            assignmentData.hostId = tempData.jobId.user_id;
                                            assignmentData.agreedBudget = tempData.agreedPrice;
                                            assignmentData.performerRequirmentAgreed = true;
                                            assignmentData.assignmentStatus = 'Started';
                                            assignmentData.paymentStatus = 'Escrow';
                                            if(tempData.assignmentUnderSatisfaction==true){
                                                assignmentData.assignmentUnderSatisfaction = true;
                                            }else{
                                                assignmentData.assignmentUnderSatisfaction = false;
                                            }
                                            

                                            JobAssignment.create(assignmentData, function (err, jobAssignData) {
                                                if (err) {
                                                } else {
                                                    Job.update({id: tempData.jobId.id}, {jobStatus: 'In-progress'}).exec(function (err, jobData) {
                                                        var paymentdata = {};
                                                        paymentdata.jobId = tempData.jobId.id;
                                                        paymentdata.hostId = tempData.jobId.user_id;
                                                        paymentdata.performerId = tempData.userId.id;
                                                        paymentdata.jobAssignmentId = jobAssignData.id;
                                                        //paymentdata.companyId = tempData.jobId.id;
                                                        paymentdata.applicationFee = (tempData.agreedPrice * tempData.siteCommissionPercent / 100);
                                                        paymentdata.processingFee = 0;
                                                        paymentdata.amount = tempData.agreedPrice;
                                                        paymentdata.paymentType = 'Booking';
                                                        paymentdata.payKey = params.pay_key;
                                                        paymentdata.paymentStatus = 'Escrow';

                                                        Payment.create(paymentdata, function (err, pdata) {
                                                            //trigger notification
                                                            var notifydata = {};
                                                            notifydata.receiver = tempData.userId.id;
                                                            notifydata.sender = tempData.jobId.user_id;
                                                            notifydata.message = "You hired for the job - " + tempData.jobId.jobTitle;
                                                            notifydata.attachedLink = "#/performer/assignment/" + jobAssignData.id;
                                                            notifydata.jobId = tempData.jobId.id;
                                                            NotificationService.createNotification(notifydata);
                                                        });

                                                    });
                                                }
                                            });


                                        }


                                    });

                                }
                            }
                            //return res.json({status: 200, message:'success', tempData:data});
                        }
                    });
                }

            }

            var ipnd = {};
            ipnd.ipnData = params;
            IpnLog.create(ipnd, function (err, ipnd) {
            });
        }
    }
    /*it will be a cron job function which run automatically to release performer's payment in every 24 hours*/
}