module.exports = {
    attributes: {
        userId: {
            required: true,
            model: 'user'
        },
        start: {
            type: 'string',
            required: true
        },
        end: {
            type: 'string'
        },
        allDay: {
            type: 'boolean',
            defaultsTo: false
        },
        title: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        status: {
            type: 'string',
            enum: ['Available', 'Unavailable'],
            defaultsTo: 'Available'
        }
    }
};