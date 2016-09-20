module.exports = {
    registerSocket:function (req,res) {
       // console.log(req.method);
        var params = req.params.all();
        if(req.isSocket){
            //console.log( 'bpcheck' , req.socket.id);
            //console.log(params.params.receiver);
            if(params.params.receiver){
                if(Notification.subscribe(req.socket, params.params.receiver, 'message')){
                    Notification.watch(req.socket);
                }
            }
        }
    },
        getUserUnreadNotifications:function (req,res) {
		var params = req.params.all();
               
                Notification.find({receiver: params.receiver, isRead: false}).populateAll().exec(function(err, data) {
                    if(err) {
                        return res.json({status:200,type:"error"});
                    } else {
                        //console.log(data);
                        if(!data){
                            return res.json({status: 200, type:'nomsg',message:'no unread messages'});
                        }else{
                            return res.json({status: 200, type:'success',unreadmsg:data});
                        }
                        
                    }
                });
                
        },
        
        markAsRead:function (req,res) {
		var params = req.params.all();

                Notification.update({id: params.id},{isRead:true}).exec(function(err, data) {
                    if(err) {
                        return res.json({status:200,type:"error"});
                    } else {
                        return res.json({status: 200, type:'success'});
                    }
                });
                
        }
}