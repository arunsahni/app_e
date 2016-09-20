/**
 * PerformerController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  getPaymentData: function (req, res) {
    var page = req.param("page", 1);
    var limit = req.param("limit", 10);
    //var sortBy = req.param("sortBy", "createdAt");
    //var sortDir = req.param("sortDir", "asc");
    var text = req.param("text",null);
    if(page && limit) {
         Payment.find({$and: [{$and: [{$and: [{'status':{'!':"deleted"}},{paymentType: 'Booking'}]}]},{performerId: req.param('id')}]})
         .populate('performerId')
         .populate('jobId')
         .populate('hostId')
        .sort('createdAt desc')
        .paginate({page: page, limit: limit})
        .exec(function(err,data)
        {
          if(err) {
            return res.json(err.status,{err: err});

          } else {
                return res.json(data);
          }
      });
    } else {
      return res.json([ ]);
    }
  },//#

  searchData: function(req, res) {
    if(req.body.startKey > req.body.endKey )
    {
      return res.json(405,{type: 'danger',msg:"Please select proper date formate"});
    } else {
   Payment.find({$and:[{performerId: req.params.id},{ createdAt : {$gte: req.body.startKey , $lte: req.body.endKey}}]}).populate('performerId').populate('jobId')
    .populate('hostId').exec(function(err, data) {
      if (data) {
           return res.json(200, {data:data});
      } else {
        return res.json(401,{type: 'danger',msg:"Oops somthing went rong please try again later"});
      }
    });
  }
  
}, //##

 getCount: function(req, res) {
    //return res.json({status: 200, message: 'response from test function of admin!'});
    Payment.count({$and: [{$and: [{$and: [{'status':{'!':"deleted"}},{paymentType: 'Booking'}]},{paymentStatus: 'Escrow'}]},{performerId: req.param('id')}]}).exec(function(error, count){
        //res.header("Access-Control-Allow-Origin:*");
          return res.json({
              count: count,
            });
        });
  },//##


  deleteMultiple: function(req, res) {
  for(var i=0; i<req.body.length; i++)
  {
       Payment.update({id: req.body[i]},{status: 'deleted'}).exec(function(err, data) {
        if(err)
        {
           return res.json(400, {type: 'danger', msg: 'Opps something went wrong please try again'});
        }
      });
  }
         return res.json(200, {type: 'Sucess', msg: 'Your Job Sucessfully deleted!'});

},


 getSubscriptionsPaymentData: function (req, res) {
    var page = req.param("page", 1);
    var limit = req.param("limit", 10);
    //var sortBy = req.param("sortBy", "createdAt");
    //var sortDir = req.param("sortDir", "asc");
    var text = req.param("text",null);
    if(page && limit) {
         Payment.find({$and: [{$and: [{'status':{'!':"deleted"}},{paymentType: 'Subscription'}]},{performerId: req.param('id')}]})
         .populate('performerId')
         .populate('jobId')
         .populate('hostId')
        .sort('createdAt desc')
        .paginate({page: page, limit: limit})
        .exec(function(err,data)
        {
          if(err) {
            return res.json(err.status,{err: err});

          } else {
                return res.json(data);
          }
      });
    } else {
      return res.json([ ]);
    }
  },//#

searchSubscriptionsData: function(req, res) {
    console.log(req.body);
    if(req.body.startKey > req.body.endKey )
    {
      return res.json(405,{type: 'danger',msg:"Please select proper date formate"});
    } else {
   Payment.find({$and:[{performerId: req.params.id},{ createdAt : {$gte: req.body.startKey , $lte: req.body.endKey}}]}).populate('performerId').populate('jobId')
    .populate('hostId').exec(function(err, data) {
      if (data) {
           return res.json(200, {data:data});
      } else {
        return res.json(401,{type: 'danger',msg:"Oops somthing went rong please try again later"});
      }
    });
  }
  
}, //##


  /*searchSubscriptionsData: function(req, res) {
    console.log(req.body);
    if(req.body.startKey > req.body.endKey )
    {
      return res.json(405,{type: 'danger',msg:"Please select proper date formate"});
    } else {
   Payment.find({$and: [{$and: [{'status':{'!':"deleted"}},{paymentType: 'Subscription'}]},{performerId: req.param('id')}]}).populate('performerId').populate('jobId')
    .populate('hostId').exec(function(err, data) {
      if (data) {
           return res.json(200, {data:data});
      } else {
        return res.json(401,{type: 'danger',msg:"Oops somthing went rong please try again later"});
      }
    });
  }
  
}, //##*/

 getSubscriptionsCount: function(req, res) {
    //return res.json({status: 200, message: 'response from test function of admin!'});
    Payment.count({$and: [{$and: [{'status':{'!':"deleted"}},{paymentType: 'Subscription'}]},{performerId: req.param('id')}]}).exec(function(error, count){
        //res.header("Access-Control-Allow-Origin:*");
          return res.json({
              count: count,
            });
        });
  },//##



};//#controller ends here