module.exports = {
    attributes: {
        templateKey: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        subject: {
            type: 'string'
        },
        content: {
            type: 'string'
        },
        status: {
            type: 'string',
            enum: ['active', 'deactive', 'deleted'],
            defaultsTo: 'active'
        }
    }
};
