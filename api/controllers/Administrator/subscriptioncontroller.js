module.exports = {
  /*** Lists all the Subscription
  ** plans
  */
     listing: function(req,res){
            Subscription.find({'status':{'!':'deleted'} })
            .exec(function(err,data){
              if(err){
                return res.json(err);
              }
              else{
                console.log('from backednd listing');
                return res.json(data);
              }
           });
         },
};
