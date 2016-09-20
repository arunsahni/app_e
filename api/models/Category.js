module.exports = {
  attributes: {
    categoryTitle: {
       type: 'string',
       required: true
    },

    //owner or parent of the one-to-many relationship
    parentCat: {
       model: 'category',
       defaultsTo: null
    },
	//sub categories
	subCategories: {
	collection: 'category',
	via: 'parentCat'
	},
    status: {
      type: 'string',
      enum: ['active', 'deactive', 'deleted'],
      defaultsTo: 'active' 
    }
  }
};
