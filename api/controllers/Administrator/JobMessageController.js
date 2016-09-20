module.exports = {

  getJobMessage : function(req,res){
    var id = req.param("id");
    jobMessages.find({"assignmentId" : id})
               .where({"status":{"!":"deleted"}})
               .populateAll()
               .sort({createdAt: -1})
               .exec(function(err,messages){
                 if(err){
                   return res.json(err.status,{err:err});
                 }
                 else
                   {
                     return res.json(messages);
                   }
            });
  },
  saveComment : function(req,res){
    jobMessages.create(req.body)
               .exec(function(err,data){
                 if(err)
                 {
                   return res.json(err.status,{err:err});
                 }
                 else
                 {
                   return res.json(data);
                 }
               });
  }


};
