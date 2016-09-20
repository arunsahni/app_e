module.exports = {
    attributes: {
        jobId: {
            model: 'job'
        },
        userId: {
            model: 'user',
            required: true, //user to booked
        },
        bookingBy: {
            required: true, //user who booked
        },
        agreedPrice: {
          type: 'float'
        },
        siteCommissionPercent: {
          type: 'float'
        },
        processingFeeAmount: {
          type: 'float'
        },
        assignmentUnderSatisfaction: {
           type: 'boolean',
           defaultsTo: false
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
        }
    }
};