module.exports.createNotification = function(params,req,res) {

            Notification.create(params)
            .exec(function(error,result){
                   if (error) {
                        return false;
                    } else {
                        if(result){
                            Notification.findOne({id: result.id}).populateAll().exec(function(err, data) {
                                Notification.message(params.receiver, data);
                            })
                        }
                        //sails.sockets.emit(params.receiver, 'notification', {data: result});
                        //sails.sockets.blast('notification', result);
                        //Notification.publishCreate({id:params.receiver,data:result});
                        return true;
                   }
            }); 

};