angular.module('app')
   .config(function($stateProvider, $urlRouterProvider, AccessLevels) {

    $stateProvider
      .state('anon', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: AccessLevels.anon
        }
      })
      .state('anon.home', {
        url: '/',
        templateUrl: '/templates/Admin/auth/login.html',
        controller: 'LoginController'
      })
      .state('anon.forgotPassword', {
        url: '/forgotPassword',
        templateUrl: '/templates/Admin/auth/forgotPassword.html',
        controller: 'ForgotPasswordController'
      })
      .state('anon.resetPassword', {
        url: '/resetPassword/:token',
        templateUrl: '/templates/auth/resetPassword.html',
        controller: 'ResetPasswordController'
      })
      .state('anon.login', {
        url: '/login',
        templateUrl: '/templates/Admin/auth/login.html',
        controller: 'LoginController'
      });

    $stateProvider
      .state('user', {
        abstract: true,
        template: '<ui-view/>',
        data: {
          access: AccessLevels.user
        }
      })
      .state('user.dashboard', {
        url: '/dashboard',
        templateUrl: '/templates/Admin/user/dashboard.html',
        controller: 'DashboardController'
      })
      .state('user.users', {
        url: '/users',
        templateUrl: '/templates/Admin/user/listing.html',
        controller: 'UsersController'
      })

      .state('user.editUsers', {
        url: '/editUsers/:id',
        templateUrl: '/templates/Admin/user/editusers.html',
        controller: 'EditUsersController'
      })
/*
      .state('user.subscription',{
        url:'/subsPlan',
        templateUrl: '/templates/Admin/subscriptions/subslisting.html',
        controller:'SubsCtrl'
      })
      .state('user.usersubscriptions',{
        url:'/usersubscriptions',
        templateUrl: '/templates/Admin/subscriptions/usersubsList.html',
        controller:'UserSubscriptionCtrl'
      })
      .state('user.editSubscribers',{
        url:'/editsubscribers/:id',
        templateUrl: '/templates/Admin/subscriptions/editsubscriber.html',
        controller:'UserSubscriptionCtrl'
      })
      .state('user.editSubscription',{
        url:'/editsubsPlan/:id',
        templateUrl: '/templates/Admin/subscriptions/editsublist.html',
        controller:'SubsCtrl'
      })*/
      .state('user.Performers',{
        url:'/performers',
        templateUrl: '/templates/Admin/performer/complist.html',
        controller:'PerformerController'
      })
      /*
      .state('user.editPerformers',{
        url:'/editperformers/:id',
        templateUrl: '/templates/Admin/performer/editperformer.html',
        controller:'PerformerController'
      })*/
      .state('user.jobs',{
        url:'/jobs',
        templateUrl: '/templates/Admin/jobs/joblist.html',
        controller:'JobController'
      })/*
      .state('user.editJobs',{
        url:'/editjobs/:id',
        templateUrl: '/templates/Admin/jobs/editjob.html',
        controller:'JobController'
      })*/
      .state('user.jobDetail',{
        url:'/jobDetails/:id',
        templateUrl: '/templates/Admin/jobs/jobDetails.html',
        controller:'JobDetailController'
      })
      .state('user.bookings',{
        url:'/bookings',
        templateUrl: '/templates/Admin/bookings/bookinglist.html',
        controller:'BookingController'
      })
      .state('user.editbookings',{
        url:'/editBookings/:id',
        templateUrl: '/templates/Admin/bookings/editbooking.html',
        controller:'EditBookingController'
      })
      .state('user.addCategories',{
        url:'/addCategories',
        templateUrl: '/templates/Admin/categories/addCategories.html',
        controller:'AddCategoryController'
      })
      .state('user.Categories',{
        url:'/categories',
        templateUrl: '/templates/Admin/categories/CategoriesList.html',
        controller:'CategoryController'
      })
      .state('user.editCategories',{
        url:'/editCategories/:id',
        templateUrl: '/templates/Admin/categories/editCategorie.html',
        controller:'EditCategoryController'
      })
      .state('user.transactions',{
        url:'/transactions',
        templateUrl: '/templates/Admin/transactions/transactionlist.html',
        controller:"TransactionCtrl"
      })
      .state('user.editTransactions',{
        url:'/editTransactions/:id',
        templateUrl: '/templates/Admin/transactions/editTransactions.html',
        controller:"EditTransactionController"
      })
      .state('user.transactionDetails',{
        url:'/transactionDetails/:id',
        templateUrl: '/templates/Admin/transactions/transactionDetail.html',
        controller:"TransactionDetailController"
      })

      // .state('user.featured',{
      //   url:'/featured',
      //   templateUrl: '/templates/Admin/user/common.html'
      // })
      .state('user.disputed',{
        url:'/disputed',
        templateUrl: '/templates/Admin/bookings/disputeList.html',
        controller:"DisputeJobController"
      })
      .state('user.disputedDetail',{
        url:'/disputedDetails/:id',
        templateUrl: '/templates/Admin/bookings/disputedDetail.html',
        controller:"DisputedDetailController"
      })
      .state('user.homeBanner',{
        url:'/homeBanner',
        templateUrl: '/templates/Admin/Images/bannerpage.html',
        controller:"BannerImgController"
      });
    $urlRouterProvider.otherwise('/');
});
