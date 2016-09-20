module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        type: {
            type: 'string',
            enum: ['Featured', 'MailOut', 'SMS', 'Free']
        },
        amount: {
            type: 'float',
            required: true
        },
        billingCycleDays: {
            type: 'integer',  // number of days of subscription e.g 1 month = 30, 1 week = 7
            required: true
        },
        status: {
            type: 'string',
            enum: ['active', 'deactive', 'deleted'],
            defaultsTo: 'active'
        }
    }
};
