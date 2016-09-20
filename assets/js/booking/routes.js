angular.module('app')
   .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      
      .state('hire', {
        url: '/hire',
        templateUrl: '/templates/booking/hire.html',
        controller: 'BookingHireController'
      });

    
    $urlRouterProvider.otherwise('/');
});
