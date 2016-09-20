module.exports = {
	attributes: {
		sender:{   required:true , model:'user',  dominant: true },
		receiver:{ required:true,  model:'user',  dominant: true },
  		message:{ type:'string', required:true },
                attachedLink:{ type:'string'},
                jobId: {
                    model: 'job'
                },
                isRead: {
                    type: 'boolean',
                    defaultsTo: false
                },
                status: {
                  type: 'string',
                  enum: ['active', 'deactive', 'deleted'],
                  defaultsTo: 'active' 
                }
	}
};