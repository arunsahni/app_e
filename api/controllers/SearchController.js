/**
 * Search controller  - performer searching will be from this controller
 *
 */

module.exports = {
        //method to search performer with pagination


    performer : function(req, res){
        //console.log(req.query);
        
        var offset = req.query.offset || 0;
        var limit = req.query.limit || 100;
        var reqdata = JSON.parse(req.query.sData);
        var filterObj = {};
        var keyword_string = reqdata.keyword;
        var minPrice = reqdata.minPrice || 0;
        var maxPrice = reqdata.maxPrice || 0;
     
        var ratingarray = reqdata.RatingsNew;
        var categoryarray = reqdata.CategoryNew;
        //console.log(categoryarray);
        
        //Object.keys(req.body.categoryId).length
       
            //console.log(minPrice);
            filterObj =  {
                    //firstName : keyword_string
                     status:"active",role:"Performer",
                     workPrice:{'>': 0},
                     or: [{
                            status:"active",role:"Performer",
                            //workPrice:{'>': parseInt(minPrice)},
                            //workPrice:{'<=': maxPrice},
                            firstName: {'like': '%'+keyword_string+'%'}
                          },
                          { lastName: {'like': '%'+keyword_string+'%'} }
                          ,
                          { displayName: {'like': '%'+keyword_string+'%'} }
                          ,
                          { zipCode: keyword_string }
                          ,
                          { companyName: {'like': '%'+keyword_string+'%'} }
                          
                          ]
                          //grossRating:ratingarray,
                         // servingCategory:categoryarray
                    };

                    if(parseInt(minPrice) > 0 & parseInt(maxPrice) > 0){
                        filterObj[ 'workPrice' ] = {'>': parseInt(minPrice), '<=': parseInt(maxPrice)};
                        //workPrice:{'>': parseInt(minPrice), '<=': parseInt(maxPrice)},
                    }
                    if(ratingarray.length > 0){
                        filterObj[ 'grossRating' ] = ratingarray;
                    }
                    if(categoryarray.length > 0){
                        filterObj[ 'servingCategory' ] = categoryarray;
                    }
                    
      
           
                    
        //console.log(filterObj);
        
        User.find(filterObj, {sort: { feature_featured_listing:  0, grossRating: 0 }}).paginate({page: offset, limit: limit}).populateAll().exec(function(err,data) {
            
              if (err) {
                    res.json({status:404,message:'No record found',data:null});
              }else{
                    res.json({status:200,message:"Record found",data:data});
              }
        });
    }
};