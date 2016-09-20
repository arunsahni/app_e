module.exports = {
	attributes: {
		sender:{   required:true , model:'user',  dominant: true },
		receiver:{ required:true,  model:'user',  dominant: true },
                companyId: { model: 'user', defaultsTo: 0 },
  		message:{ type:'string', required:true },
                jobId: { model: 'job' }
	}
};