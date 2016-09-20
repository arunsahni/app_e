module.exports = {
    attributes: {
        title: {
            type: 'string',
            required: true
        },
        description: {
            type: 'string'
        },
        photoPath: {
            type: 'string',
            required: true
        },
        linkURL: {
            type: 'string'
        },
        status: {
            type: 'string',
            enum: ['active', 'deactive', 'deleted'],
            defaultsTo: 'active'
        }
    }
};
