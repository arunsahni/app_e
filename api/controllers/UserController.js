/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  create: function (req, res) {
    if (req.body.password !== req.body.confirmPassword) {
      return res.json(401, {err: 'Password doesn\'t match, What a shame!'});
    }
    User.create(req.body).exec(function (err, user) {
      if (err) {
        return res.json(err.status, {err: err});
      }
      // If user created successfuly we return user and token as response
      if (user) {
        // NOTE: payload is { id: user.id}
        res.json(200, {user: user, token: jwToken.issue({id: user.id})});
      }
    });
  },//#
  
  getProfileData: function(req, res) {
    User.findOne({ id: req.params.id, isAdmin: false, status: 'active'}).populateAll()
          .exec(function(err, data){
    if(err) {
      return res.json(err);
    } else {
      return res.json(data);
    } 

    });

  },//#   

  editProfileData: function(req, res) {
     
    User.update({ id: req.body.id, isAdmin: false}, req.body ).exec(function(err, user){
    if(err) {
      return res.json(err.status, {type: 'danger', msg: 'Opps something went wrong, please try again later.',error:err});
    } else {
      res.json(200, {type: 'success', msg: 'Your profile updated Sucessfully!'});
    } 

    });

  },updateServingCats: function(req, res) {
      
      //console.log(Object.keys(req.body.categoryId)[0]);
      //;
      if(req.body.performer){
          PerformerServingCategory.destroy({performerId:req.body.performer}).exec(function(err, response) {
                if (err) {
            
                }else{
                    if(req.body.categoryId){
                        for (var i = 0; i < Object.keys(req.body.categoryId).length; i++){
                        
                            PerformerServingCategory.create({performerId:req.body.performer,categoryId:req.body.categoryId[i]}).exec(function (err, resp) {

                          });
                        }
                    }
                    res.json(200, {type: 'success', msg: 'Category updated'});
                    /*PerformerServingCategory.create(req.body).exec(function (err, resp) {
                    if (err) {
                      return res.json(err.status, {err: err});
                    }
                    // If user created successfuly we return user and token as response
                    if (resp) {
                      // NOTE: payload is { id: user.id}
                      res.json(200, {type: 'success', msg: 'Category updated'});
                    }
                  });*/

                }
     });
          
      }
      
      
      
  }//#   
};