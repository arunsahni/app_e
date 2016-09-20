module.exports = {
  schema: true,

  attributes: {
    jobCategory: {
       required: true, 
       model: 'category'
    },
    user_id: {
       required: true, 
       model: 'user'
    },
    jobTitle: {
       type: 'string',
       required: true
    },
    jobDescription: {
       type: 'string',
       required: true
    },
    jobStartDateTime: {
       type: 'datetime',
       required: true
    },
    jobStartEndTime: {
       type: 'datetime',
       required: true
    },
    jobBudget: {
       type: 'float'
    },
    jobStatus: {
       type: 'string',
       enum: ['Not started', 'In-progress', 'Completed', 'Cancelled'],
       defaultsTo: 'Not started'
    },
    status: {
      type: 'string',
      enum: ['active', 'deactive', 'deleted'],
      defaultsTo: 'active' 
    }
  }
};
