module.exports = {
    attributes: {
        userId: {
            required: true, // performer
            model: 'user'
        },
        type: {
            type: 'string',
            enum: ['image', 'video'],
            defaultsTo: 'image'
        },
        filePath: {
            type: 'string',
            defaultsTo: 'images/frontend/profile.jpg'
        },
        description: {
            type: 'string'
        },
        status: {
            type: 'string',
            enum: ['active', 'deactive', 'deleted'],
            defaultsTo: 'active'
        }
    }
};
