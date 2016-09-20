module.exports = {
  attributes: {
    jobId: {
       model: 'job',
       defaultsTo: null
    },
    jobAssignmentId: {
       model: 'jobassignment',
       defaultsTo: null
    },
    hostId: {
       required: true,  // performer or host 
       model: 'user'
    },
    performerId: {
      required: true,  // performer or host 
       model: 'user'
    },
    companyId: {
       required: true, 
       model: 'user',
       defaultsTo: '0'
    },
    subscriptionId: {
       required: true, 
       model: 'subscription',
       defaultsTo: '0'
    },
    applicationFee: {
       type: 'float' // ejizzy fee currently 10% of booking mentioned in booking engine
    },
    processingFee: {
       type: 'float' //additional fee if any - 
    },
    amount: {
       type: 'float' //total agreed amount
    },
    paymentType: {
       type: 'string',
       enum: ['Booking', 'Subscription','Invalid'],
       defaultsTo: 'Invalid'
    },
    paymentGateway: {
       type: 'string',
       enum: ['Paypal'],
       defaultsTo: 'Paypal'
    },
    txnId: {
       type: 'string'
    },
    payKey: {
       type: 'string' //key to release escrow payment
    },
    recurringId: {
       type: 'string' //incase of subscription it will be a recuring profile id
    },
    paymentStatus: {
       type: 'string',   // Payment status by gateway
       enum: ['Escrow', 'Paid','In-progress','Refund'],
       defaultsTo: 'Unknown'
    },
    status: {
      type: 'string',
      enum: ['active', 'deactive', 'deleted'],
      defaultsTo: 'active' 
    },
  }
};
