module.exports = {
    attributes: {
        jobId: {
            model: 'job'
        },
        performerId: {
            required: true
        },
        hostId: {
            model: 'user',
            required: true
        },
        agreedPrice: {
          type: 'float'
        },
        negoStatus: {
           type: 'string',
           enum: ['Done', 'Hired','Cancel','In-progress'],
           defaultsTo: 'In-progress'
        },
        status: {
          type: 'string',
          enum: ['active', 'deactive', 'deleted'],
          defaultsTo: 'active' 
        }
    }
};