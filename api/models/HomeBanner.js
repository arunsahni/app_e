module.exports = {
  attributes: {
  title: {
     type:'string',
  },
  filePath: {
        type: 'string'
        },
  description: {
        type: 'string'
        },
  link: {
    type: 'string'
  },
  status: {
      type: 'string',
      enum: ['active', 'deactive', 'deleted'],
      defaultsTo: 'active'
         }
    }
};
