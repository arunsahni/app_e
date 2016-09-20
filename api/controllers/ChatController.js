/**
 * ChatController
 *
 */

module.exports = {

	addConv:function (req,res) {
		
		var data_from_client = req.params.all();
//console.log(data_from_client);
		if(req.isSocket && req.method === 'POST'){

			// This is the message from connected client
			// So add new conversation
			Chat.create(data_from_client).populateAll()
				.exec(function(error,result){

                                if(result){
                                    
                                    Chat.findOne({ id: result.id }).populateAll().exec(function(err, data_from_client) {
					
                                        if(data_from_client){
                                            
                                            Chat.message(data_from_client.receiver.id, data_from_client);

                                            Chat.message(data_from_client.sender.id, data_from_client);
                                            
                                        }else{
                                            
                                        }
					/*Chat.message(data_from_client.sender.id, {sender:data_from_client.sender.firstName,sender_id:data_from_client.sender.id, message: data_from_client.message,receiver: data_from_client.receiver.firstName,receiver_id: data_from_client.receiver.id,createdAt: data_from_client.createdAt});*/				      
                                    });
                                    
                                }

				}); 
		}
		else if(req.isSocket){
			//console.log( 'bpcheck' , data_from_client.params.receiver);
                        if(data_from_client.params.sender){
                            if(Chat.subscribe(req.socket, data_from_client.params.sender, 'message')){

                            }
                        }
			//Chat.subscribe(req.socket, data_from_client.params.receiver, 'message');
			//Chat.watch(req.socket);
			//console.log( 'User subscribed to ' + req.socket.id );
		}
	},	

	getallUsersmsg:function(req,res){

			var data_from_client = req.query;


			Chat.find(
			{ 
				 
				or: [{ receiver: data_from_client.sender, sender: data_from_client.receiver},{receiver: data_from_client.receiver, sender: data_from_client.sender}] 

			}).populateAll().exec(function(error,results){ 

				if(results){
					//console.log(results);
					return res.json(results);
				}else{
					return res.send('invalid');
				}

			});

			/*Chat.find(
			{ 
				 
				or: [{ receiver: data_from_client.sender, sender: data_from_client.receiver},{receiver: data_from_client.receiver, sender: data_from_client.sender}] 

			} , function(err, results) {
				if(results){
					console.log(results);
					return res.json(results);
				}else{
					return res.send('invalid');
				}
		    	});*/

	}
};

