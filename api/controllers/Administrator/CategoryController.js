module.exports = {
  create : function(req,res){
  Category.create({categoryTitle: req.body.categoryTitle,
                   parentCat: req.body.parentCat,
                })
                  .exec(function(err,category){
                    if(err){
                      return res.json(err);
                    }
                    else{
                      return res.json(category);
                    }
                  });
},
           getParentCat : function(req,res){
                  Category.find({ status: "active", parentCat:"null" })
                  .populate('subCategories')
                  .exec(function(error,results){
                      if(results){
                         //console.log(results);
                         return res.json(results);

                           }
                      else{
                          return res.send('invalid');
                          }
                        });
                      },
                      getDetails: function(req,res){
                        Category.find({'status':{'!':'deleted'}})
                        .populate('parentCat')
                        .exec(function (err,categories){
                          if(err){
                            return res.json(err);
                          }
                          else{
                            return res.json(categories);
                          }
                        });
                      },
                      remove: function(req,res){
                        var id =req.param("id",null);
                        Category.update({id:id},{status:"deleted"})
                        .exec(function(err,data){
                          if (err){
                            return res.json(err);
                          }
                          else{
                              //  console.log('from delete'+user);
                               return res.json(data);
                            }
                        });
                      },
                      update: function(req,res){
                        var id= req.body.id;
                         Category.update({id:id},req.body)
                        .exec(function(err,data){
                            if(err){
                              return res.json(err);
                            }
                            else{
                              return res.json(data);
                            }
                          });
                      },
                      getOne: function(req,res){
                        var id = req.param("id",null);
                        Category.findOne({id:id}).exec(function(err,data){
                          if(err){
                            return res.json(err);
                           }
                          else{
                            return res.json(data);
                          }
                        });
                      },
                      changeStatus : function(req,res){
              			    var id = req.param("id",null);
              			    var state = req.param("status",null);
              			    if(state == "active"){
              			    Category.update({id:id},{status:"deactive"})
              			            .exec(function(err,user){
              			               if(err){
              			                  return res.json(err);
              			                  }
              			               else{
              			                  return res.json(user);
              			                 }
              			           });
              			    }
              			     else{
              			    Category.update({id:id},{status:"active"})
              			            .exec(function(err,user){
              			               if(err){
              			                  return res.json(err);
              			               }
              			            else{
              			               return res.json(user);
              			               }
              			        });
              			      }
              			  },
};
