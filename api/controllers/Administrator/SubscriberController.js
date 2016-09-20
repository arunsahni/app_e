// module.exports = {
//   getCount: function(req, res) {
//     //return res.json({status: 200, message: 'response from test function of admin!'});
//     UserSubscription.count({isAdmin: false,'status':{'!':'deleted'},'role':'Customer'}).exec(function(error, count){
//         //res.header("Access-Control-Allow-Origin:*");
//           return res.json({
//               count: count,
//             });
//         });
//   },
//
//   /**
//    * Get users listing
//    * Excluding admin & deleted candidates and
//    * also performs sorting
//    *
//   */
//     listing: function (req, res) {
//       // console.log(req.param.text);
//       var page = req.param("page", 1);
//       var limit = req.param("limit", 10);
//       var sortBy = req.param("sortBy", "email");
//       var sortDir = req.param("sortDir", "asc");
//       var text = req.param("text",null);
//       if(page && limit) {
//           UserSubscription.find({'status':{'!':'deleted'}})
//           .populate('userId')
//           // .populate('subscriptionId')
//           // .where({'firstName': { startsWith : text },'status':{'!':'deleted'},'role':"customer"})
//           .sort(sortBy + ' ' + sortDir)
//           .paginate({page: page, limit: limit})
//           .exec(function(error,data)
//           {
//             return res.json(data);
//         });
//       } else {
//         return res.json([ ]);
//       }
//     },
//     delete : function(req,res){
//       var id =req.param("id",null);
//       UserSubscription.update({id:id},{status:"deleted"})
//       .exec(function(err,data){
//         if (err){
//           return res.json(err);
//         }
//         else{
//             //  console.log('from delete'+user);
//              return res.json(data);
//           }
//       });
//      },
//      details : function(req,res){
//        var id = req.param("id",null);
//        UserSubscription.findOne({id:id}).exec(function(err,subscriber){
//          if(err){
//            return res.json(err);
//          }
//          else {
//            return res.json(subscriber);
//          }
//        });
//      },
//      /***** Updates the details of a particular
//       **** subscription plan based on the id of a
//       **    particular plan **/
//       update: function(req,res){
//         var id= req.body.id;
//         UserSubscription.update({id:id},req.body)
//         .exec(function(err,subscriber){
//             if(err){
//               return res.json(err);
//             }
//             else{
//               return res.json(subscriber);
//             }
//           });
//       },
//
//
// };
