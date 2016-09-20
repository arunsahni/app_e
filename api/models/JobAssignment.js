module.exports = {
  attributes: {
    jobId: {
       required: true, 
       model: 'job'
    },performerId: {
       required: true, 
       model: 'user'
    },
    hostId: {
       required: true, 
       model: 'user'
    },
    agreedBudget: {
       type: 'float'
    },
    performerRequirmentAgreed: {
       type: 'boolean'
    },
    assignmentUnderSatisfaction: {
       type: 'boolean',
       defaultsTo: false
    },
    performerReview: {
       type: 'integer',
       defaultsTo: '0'   // 1 to 5  //to check while releasing payment
    },
    customerReview: {
       type: 'integer',
       defaultsTo: '0'   // 1 to 5  //to check while releasing payment
    },
    assignmentStatus: {
       type: 'string',
       enum: ['Not started','Started','Completed','Work Done','Cancellation','Cancelled', 'Dispute', 'Dispute Settled'],
       defaultsTo: 'Not started'
    },
    cancelReason :{
        type: 'string' //customer will provide reasion of cancellation
    },
    statusDate :{
        type: 'date'
    },
    disputePaymentTo: {
       type: 'string',
       enum: ['Customer', 'Performer'], //in case of dispute admin will decide to pay
       defaultsTo: 'Customer'
    },
    paymentStatus: {
       type: 'string',
       enum: ['Escrow', 'Paid','In-progress','Refund'],
       defaultsTo: 'In-progress'
    },
    status: {
      type: 'string',
      enum: ['active', 'deactive', 'deleted'],
      defaultsTo: 'active' 
    }
  }
};
