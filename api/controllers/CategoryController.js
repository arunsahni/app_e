module.exports = {
create: function(req, res, next) {
        var params = req.params.all();
        // set parent category if exists
        if (params.categoryTitle) {
            Category.findOne({categoryTitle : params.categoryTitle})
                .exec(function(err, category) {
                if (err) {
                    return false; //not found
                } else {

					if(category){
					return res.send('already');
		} else {
		    Category.create(params, function(err, newCategory) {
			    if (err) {
				return next(err);
			    } else {
		    	   }
		    	res.json(newCategory);
		    }); // create the category
		}
                }
            });
      }
    },
    update: function(req, res, next) {
        var params = req.params.all();
    },	
	/*to get only active partent categories - it can be use in front end category and sub category bar*/
	getAllActiveParentCategories:function(req,res){
			var data_from_client = req.query;

			Category.find({ status: "active", parentCat:"null" }).populate('subCategories', { status: "active" }).exec(function(error,results){ 

				if(results){
					return res.json(results);
				}else{
					return res.send('invalid');
				}
			});
	},
       /*to get all active categories including sub categories - it can be use in front*/
	getAllActiveCategories:function(req,res){

			var data_from_client = req.query;

			Category.find({ status: "active" }).sort('categoryTitle ASC').exec(function(error,results){

				if(results){
					return res.json(results);
				}else{
					return res.send('invalid');
				}

			});

	}
};
