module.exports = {

getCountryList: function(req, res) {
    Country.find()
          .exec(function(err, data){
    if(err) {
      return res.json(err);
    } else {
      return res.json(data);
    } 
    });

  },
  getStateListByCountry: function(req, res) {
    var params = req.body;  
    State.find({country_id:params.country_id})
          .exec(function(err, data){
    if(err) {
      return res.json(err);
    } else {
      return res.json(data);
    } 
    });
  }

}