angular.module('app')
  .controller('PerformerProfilesController', function($scope,$rootScope, $state, Auth, Profiles,$log,Flash) {
    
    //$scope.performerservingcategory = {};
    $scope.user = {};
   
    $scope.userRequ = {};
    $scope.userRequ.performerRequirement = {};
    
    $scope.userCat = {};
    $scope.userCat.servingCategory = {};
    
    
    //var performerRequirementArr = [];
    
    Profiles.getProfileData().then(function(result) {
      $scope.user = result.data;
      
      if(result.data.servingCategory){
         if(result.data.servingCategory.length > 0){
          
          for (var i=0; i < result.data.servingCategory.length; i++ ){
              $scope.userCat.servingCategory[i] = result.data.servingCategory[i];
          }
        
        }
     }
      
     if(result.data.performerRequirement){
         if(result.data.performerRequirement.length > 0){
          
          for (var i=0; i < result.data.performerRequirement.length; i++ ){
              $scope.userRequ.performerRequirement[i] = result.data.performerRequirement[i];
          }
        
        }
     }
     if(!$scope.user.chatAvail) $scope.user.chatAvail = "1";
     if(!$scope.user.pricingTerm) $scope.user.pricingTerm = "Negotiable";
      
    });
    
    
    
    $scope.edit = function() {
      $state.go('user.performerProfileEdit');
    },
    
    $scope.editProfileData = function() {
        
       $scope.user.performerRequirement = [];
       $scope.user.servingCategory = [];
    //$scope.servingCatData = {};
    
      //delete $scope.user.servingCategory;
      
      for (variable in $scope.userCat.servingCategory) {
                if($scope.userCat.servingCategory[variable]){
                    $scope.user.servingCategory.push($scope.userCat.servingCategory[variable]);
                }
      }
      //console.log($scope.user.servingCategory);
      //return true;
      
      for (variable in $scope.userRequ.performerRequirement) {
                if($scope.userRequ.performerRequirement[variable]){
                    $scope.user.performerRequirement.push($scope.userRequ.performerRequirement[variable]);
                }
      }
      
      
      //console.log($scope.user.performerRequirement);
      //return true;

     // setTimeout(function(){
          Profiles.editProfileData($scope.user).success(function(result) {
            //console.log($scope.performerservingcategory);
            /*if($scope.performerservingcategory){
                $scope.servingCatData = $scope.performerservingcategory;
                $scope.servingCatData.performer = $scope.user.id;
                Profiles.updateServingCats($scope.servingCatData).success(function(result) {

                })
            }*/
            var message = 'Information updated successfully.';
            Flash.create('success', message, 'custom-class');
          //$rootScope.alerts.push({type: 'success', 'msg': 'Profile information updated successfully.'});
          $state.go('user.performerProfileEdit');
        }).error(function(err) {
          //$rootScope.alerts.push(err);
        });  
          
     // },1000);  
      
      
    }
  });