module.exports = {
  attributes: {
    performerId: {
       model:'user'
    },
    categoryId: {
       model:'category',
       required: true
    },
    status: {
      type: 'string',
      enum: ['active', 'deactive', 'deleted'],
      defaultsTo: 'active' 
    }
  }
};