module.exports = {
    attributes: {
        jobId: {
            required: true,
            model: 'job'
        },
        userId: {
            required: true,
            model: 'user'
        },
        reviewerId: {
            model: 'user'   // review given by
        },
        assignmentId: {
            model: 'jobAssignment'  
        },
        reviewMessage: {
            type: 'string'
        },
        reviewRating: {
            type: 'integer',
            defaultsTo: '0'   // 1 to 5
        },
        status: {
            type: 'string',
            enum: ['active', 'deactive', 'deleted'],
            defaultsTo: 'active'
        }
    }
};