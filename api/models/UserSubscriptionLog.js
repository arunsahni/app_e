module.exports = {
    attributes: {
        userId: {
            required: true, // performer
            model: 'user'
        },
        paymentId: {  
            model: 'payment',
            defaultsTo: '0'
        },
        subscriptionName: {
            type: "string"
        },
        subscriptionAmount: {
            type: 'float',
            required: true
        },
        subscriptionStartDate: {
            type: 'date',
            required: true
        },
        subscriptionEndDate: {
            type: 'date',
            required: true
        },
        billingMode: {
            type: "string", // number of days of subscription e.g 1 month = 30
            enum: ['Day', 'Week', 'SemiMonth', 'SemiMonth', 'Month', 'Year'],
            defaultsTo: 'Month'
        }/*,
        feature_online_ticket: {   //On-Line-Ticket-Support
          type: 'boolean',
          defaultsTo: false
        },
        feature_payment_hours: {   //Hour-Release of payment
          type: 'integer',
          defaultsTo: 48
        },
        feature_free_sms: {   //SMS Messages
          type: 'integer',
          defaultsTo: 8
        },
        feature_video_limit: {   //Video Upload per profile
          type: 'integer',
          defaultsTo: 1
        },
        feature_featured_listing: {   //Feature Listings
          type: 'boolean',
          defaultsTo: false
        },
        feature_guarantee: {   //Eligible for Guarantee of service
          type: 'boolean',
          defaultsTo: false
        }*/,
        status: {
            type: 'string',
            enum: ['active', 'deactive', 'deleted'],
            defaultsTo: 'active'
        }
    }
};
