module.exports = {
    attributes: {
        title: {
            type: 'string',
            required: true
        },userId: {
            required: true, 
            model: 'user'
        },
        description: {
            type: 'string'
        },
        filePath: {
            type: 'string',
            required: true
        },
        uploadType: {
            type: 'string',
            enum: ['profilePhoto', 'Photo', 'Video']
        },
        status: {
            type: 'string',
            enum: ['active', 'deactive', 'deleted'],
            defaultsTo: 'active'
        }
    }
};