angular.module('app').controller('AdvanceSearchController', function ($log,$scope, $rootScope, $stateParams,CurrentUser,PerformerSearch) {
    
    //$scope.hardcodeprofileid = '5653f9fd599a87921361a70c';
    $rootScope.searchBar = "";
    $scope.user = CurrentUser.user;
    $scope.userRole = $scope.user().role;

  $('.bxslider').bxSlider({
    minSlides: 3,
    maxSlides: 4,
    slideWidth: 265,
    slideMargin: 22
  });

//set parameters to rootscope in case of page refresh
  $rootScope.searchKeyword = ($stateParams.searchKeyword != undefined || $stateParams.searchKeyword == '') ? $stateParams.searchKeyword : '';
  $rootScope.searchCategory = ($stateParams.searchCategory != undefined || $stateParams.searchCategory == '') ? $stateParams.searchCategory : '';



//script for accordian
  $scope.oneAtATime = true;

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

  //Script for tabs
  $scope.tabs = [
    { title:'Dynamic Title 1', content:'Dynamic content 1' }
  ];

//slide location filter using jquery
  $scope.slideToggle = function() {
    angular.element(".location-whole").toggle("slide");
  };

  $scope.searchData = {};
  $scope.searchData.barKeyword = $rootScope.searchKeyword;
  $scope.searchData.barCategory = $rootScope.searchCategory;
  $scope.searchData.keyword = $rootScope.searchKeyword;
  
  $scope.searchData.Categories = {};
  $scope.searchData.Ratings = {};
  
  
  

  
  //price slider configuration
  $scope.slider_translate = {
    minValue: 1,
    maxValue: 1000,
    options: {
      ceil: 1000,
      floor: 1,
      translate: function(value) {
        return '$' + value;
      },
      onEnd: function() {
        $scope.searchData.minPrice = $scope.slider_translate.minValue;
        $scope.searchData.maxPrice = $scope.slider_translate.maxValue;
        $scope.loadPerformers('new');
        //console.log($scope.slider_translate.maxValue);
      }
    }
  };
  
  $scope.myPopover = {
    isOpen: false,
    templateUrl: 'myPopoverTemplate.html',
    open: function open() {
      $scope.myPopover.isOpen = true;
    },
    close: function close() {
      $scope.myPopover.isOpen = false;
    }
  };
  
  //console.log('checking bind',$scope.searchData);
   $scope.performersData = [];
   var offset = 1;
   var limit = 10;
   
   $scope.loadPerformers = function(initnew,parentcat) {
       
        var result = '';
        
        if(parentcat){
            //console.log(parentcat);
            $scope.checksubcats(parentcat,$scope.searchData.Categories[parentcat]);
        }
        
        if(initnew){
            $scope.performersData = [];
            offset = 1;
            limit = 10;
        }
        //$log.info($scope.searchData);
        //rating call logic
        var ratingarray = [];
        if($scope.searchData.Ratings){
            for (variable in $scope.searchData.Ratings) {
                if($scope.searchData.Ratings[variable]==true){
                    ratingarray.push(parseInt(variable));
                }
            }
        }
        if(ratingarray.length > 0){
             $scope.searchData.RatingsNew = [];
             $scope.searchData.RatingsNew = ratingarray;
        }else{
             $scope.searchData.RatingsNew = [null,0,1,2,3,4,5];
        }
        //end rating call logic
        
        
        //rating call logic
        var categoryarray = [];
        if($scope.searchData.Categories){
            for (variable in $scope.searchData.Categories) {
                if($scope.searchData.Categories[variable]==true){
                    categoryarray.push(variable);
                }
            }
        }
        if(categoryarray.length > 0){
             $scope.searchData.CategoryNew = [];
             $scope.searchData.CategoryNew = categoryarray;
        }else{
             $scope.searchData.CategoryNew = [];
        }
        //end rating call logic
       
            //console.log($scope.searchData.RatingsNew);
        //$scope.searchData.Ratings = ratingarray;
        $scope.callService (offset,limit,$scope.searchData);
        
        //console.log($scope.searchData);
        
   }
   
   $scope.callService = function (offset,limit,searchData){
       
       PerformerSearch.performerSearchList(offset, limit, searchData).success(function(result) {
            if(result.status==200){
                  
                        for (var i = 0; i < result.data.length; i++) {
                             $scope.performersData.push(result.data[i]);
                        }
                        offset++;    
                   
            }
        }).error(function(err) {
         //$rootScope.alerts.push(err);
        });
   }
   
   //console.log($rootScope.categoryData);
   $scope.checksubcats = function (parentid,selected){
       angular.forEach($rootScope.categoryData, function(value, key) {
        //console.log(value.subCategories);
                for (variable in value.subCategories) {
                   if(value.subCategories[variable].parentCat == parentid){
                       $scope.searchData.Categories[value.subCategories[variable].id] = selected;
                        //console.log($scope.searchData.Categories[value.subCategories[variable].id]);
                        /*if($scope.searchData.Categories[value.subCategories[variable].id]==true){
                            $scope.searchData.Categories[value.subCategories[variable].id] = false;
                        }else{
                            $scope.searchData.Categories[value.subCategories[variable].id] = selected;
                        }*/
                        //console.log($scope.searchData.Categories[value.subCategories[variable].id]);
                   }
                }
       });
   }
   
   if($scope.searchData.barCategory){
       //console.log($scope.searchData.barCategory);
      $scope.searchData.Categories[$scope.searchData.barCategory] = true;
      $scope.checksubcats($scope.searchData.barCategory, true);
   }
   
   
    $scope.loadPerformers();
   

   //jquery bx slider                       
  angular.element('.bxslider').bxSlider({
    minSlides: 3,
    maxSlides: 4,
    slideWidth: 265,
    slideMargin: 22
  });
});