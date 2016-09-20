// module.exports = {
//   /*** Lists all the Subscription
//   ** plans
//   */
//      listing: function(req,res){
//             Subscription.find({'status':{'!':'deleted'} })
//             .exec(function(err,data){
//               if(err){
//                 return res.json(err);
//               }
//               else{
//                 return res.json(data);
//               }
//            });
//          },
//          /**** DElets an individual record
//          ** Depends on the object_id for a particular
//          ** record to be deleted**/
//     delete : function(req,res){
//            var id =req.param("id",null);
//            Subscription.update({id:id},{status:"deleted"})
//            .exec(function(err,plan){
//              if (err){
//                return res.json(err);
//              }
//              else{
//                    return res.json(data);
//                }
//            });
//             },
//             /**** Fetches the details of a particular
//             **** user based on their Object Ids.
//             ***/
//      details : function(req,res){
//        var id = req.param("id",null);
//        Subscription.findOne({id:id},{select:['name','type','amount','billingCycleDays']}).exec(function(err,plan){
//          if(err){
//            return res.json(err);
//          }
//          else {
//            return res.json(plan);
//          }
//        });
//      },
//      /***** Updates the details of a particular
//       **** subscription plan based on the id of a
//       **    particular plan **/
//       update: function(req,res){
//         var id= req.body.id;
//         Subscription.update({id:id},req.body)
//         .exec(function(err,plan){
//             if(err){
//               return res.json(err);
//             }
//             else{
//               return res.json(plan);
//             }
//           });
//       },
// };
