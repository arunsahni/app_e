angular.module('app')
.controller("CategoryController",function($scope,$stateParams,$state, Categories){
    Categories.getDetails().then(function(result){
      $scope.categoryData = result.data;
    })

    $scope.remove = function(id){
      $scope.id = id;
      Categories.remove($scope.id).then(function(result){
      $scope.deletedCategory = result.data;
      });

      $state.transitionTo($state.current, $stateParams, {
      reload: true,
      inherit: false,
      notify: true
    });
  };

  $scope.ChangeStatus = function(id,status){
    Categories.changeStatus(id,status).then(function(result){
      $scope.userDetails = result.data;
    });
    Categories.getDetails().then(function(result) {
       $scope.categoryData = result.data;
     });
  };
  $scope.edit = function(id){
    $state.go('user.editCategories',{'id':id});
  }
})
/*** Controller for editing of
 *** categories and subcategories
 ***/

.controller("EditCategoryController",function($state,$stateParams,$scope,Categories){
    $scope.id = $state.params.id;
    Categories.getparentCat().then(function(result){
      $scope.categoryData = result.data;
    });
    Categories.getOne($scope.id).then(function(result){
      $scope.category = result.data;
    });
    $scope.update = function(id){
    Categories.update($scope.category).then(function(result){
        $scope.category = result.data;
      });
      $state.go('user.Categories');
    };
})
  /*** Controller to add Parent
   *** categories or to add sub
   *** categories for a particular
   *** parent.
   ***/
  .controller("AddCategoryController",function($scope,$stateParams,$state,Categories){
    Categories.getparentCat().then(function(result){
      $scope.categoryData= result.data;
      });

    $scope.create = function(){
      Categories.create($scope.category).then(function(result){
        $scope.category = result.data;
        $state.go('user.Categories');
      });
    }
  })
