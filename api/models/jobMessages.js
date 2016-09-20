module.exports = {
    attributes: {
        jobId: {
            required: true, 
            model: 'job'
        },
        userId: {
            model: 'user'   // performer/host/admin
        },
        assignmentId: {
            model: 'jobAssignment'  
        },
        message: {
            type: 'string'
        },
        status: {
            type: 'string',
            enum: ['active', 'deactive', 'deleted'],
            defaultsTo: 'active'
        }
    }
};
