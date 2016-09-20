module.exports = {
    attributes: {
        userId: {
            model: 'user',
            required: true, //performer id
        },
        subscriptionName: {
            type: "string"
        },
        subscriptionAmount: {
          type: 'float'
        },
        billingMode: {
            type: "string", // number of days of subscription e.g 1 month = 30
            enum: ['Day', 'Week', 'SemiMonth', 'SemiMonth', 'Month', 'Year'],
            defaultsTo: 'Month'
        },
        ipnURL: {
          type: 'string'
        },
        hostName: {
          type: 'string'
        },
        successURL: {
          type: 'string'
        },
        cancelURL: {
          type: 'string'
        },
        recuringId: {
          type: 'string'
        }
    }
};